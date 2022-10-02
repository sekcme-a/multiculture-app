import { AuthService } from "src/hooks/auth/AuthService";
import { createContext, useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { firestore as db } from "firebase/firebase";

const authContext = createContext();

export default function useAuth() {
  return useContext(authContext)
}

export function AuthProvider(props) {
  const [user, setUser] = useState(null);
	const [userrole, setUserrole] = useState();
	const [teamName, setTeamName] = useState("suwon")
	const [error, setError] = useState("");
	const [token, setToken] = useState("")
  const router = useRouter()
	const pathname = router.pathname;


	const loginWithGoogle = async () => {
		const { error, userData } = await AuthService.loginWithGoogle();
		setUser(userData ?? null)
		setError(error ?? "")
  }

	const loginWithFacebook = async () => {
    const { error, user } = await AuthService.loginWithFacebook();
		setUser(user ?? null)
		setError(error ?? "")
		// if (user !== null) {
		// 	db.collection("users").doc(user.uid).update({token: token})
		// }
  }
	const loginWithApple = async () => {
    const { error, user } = await AuthService.loginWithApple();
		setUser(user ?? null)
		setError(error ?? "")
		// if (user !== null) {
		// 	db.collection("users").doc(user.uid).update({token: token})
		// }
  }

  const logout = async () => {
    await AuthService.logout();
		setUser(null);
		setUserrole(null)
  }
	const createUserWithEmailAndPassword = async (email, password) => {
		if (email && password) {
			const { error, user } = await AuthService.createUserWithEmailAndPassword(
				email,
				password
			);
			// router.push(`/verify?email=${email}`);
			if (error==="The email address is badly formatted.") {
				setError({ [pathname.replace("/","").replace("admin/","")]: "유효하지 않은 이메일 입니다." });
				return;
			}
			if (error === "Password should be at least 6 characters") {
				setError({ [pathname.replace("/","").replace("admin/","")]: "비밀번호는 최소 6자리 이상이여야합니다." });
				return;
			}
			if (error === "The email address is already in use by another account.") {
				setError({ [pathname.replace("/","").replace("admin/","")]: "이미 등록된 이메일 주소입니다." });
				return;
			}
			if (error) {
				setError({ [pathname.replace("/","").replace("admin/","")]: error });
				return;
			}
			await db.collection("email").doc(email).set({"verified": false})
			setUser(user ?? null);
		} else {
			setError({ [pathname.replace("/","")]: "Email and password can not be empty" });
		}
	};

	const signInUserWithEmailAndPassword = async (email, password) => {
		if (email && password) {
			const { error, user } = await AuthService.signInUserWithEmailAndPassword(
				email,
				password
			);
			if (error==="The email address is badly formatted.") {
				setError({ [pathname.replace("/","").replace("admin/","")]: "유효하지 않은 이메일 입니다." });
				return;
			} else if (error === "There is no user record corresponding to this identifier. The user may have been deleted.") {
				setError({ [pathname.replace("/","").replace("admin/","")]: "이메일이나 비밀번호가 틀렸습니다." });
				return;
			} else if (error === "The password is invalid or the user does not have a password.") {
				setError({ [pathname.replace("/","").replace("admin/","")]: "이메일이나 비밀번호가 틀렸습니다." });
				return;
			} else if (error === "Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.") {
				setError({ [pathname.replace("/","").replace("admin/","")]: "로그인 시도가 여러 번 실패하여 이 계정에 대한 액세스가 일시적으로 해제되었습니다. 암호를 재설정하여 즉시 복원하거나 나중에 다시 시도할 수 있습니다." });
				return;
			}
				else if (error) {
				console.log(error)
				return;
			}
			setUser(user ?? null);
			router.push("/");
		} else if(password) {
			setError({ [pathname.replace("/","").replace("admin/","")]: "이메일을 입력해주세요." });
		} else if(email) {
			setError({ [pathname.replace("/","").replace("admin/","")]: "비밀번호를 입력해주세요." });
		}
	};


	const resetPassword = async (email) => {
		if (email) {
			const error = await AuthService.resetPassword(email);
			if (error) {
				console.log(error)
				setError({ [pathname]: error });
				return error;
			} else {
				return "success"
			}
		} else {
			console.log(error)
			return error
			setError({ [pathname]: "Email can not be empty" });
		}
	};

	const deleteAccount = async () => {
		const error = await AuthService.deleteAccount();
		setError({ [pathname]: error });
	};

	const updatePassword = async (currentPassword, newPassword, confirmNewPassword) => {
		return new Promise((resolve, reject) => {
			if (newPassword !== confirmNewPassword) {
				reject("재확인 비밀번호가 틀렸습니다.")
			} else {
				AuthService.updatePassword(newPassword).then(() => {
					resolve(true)
				}).catch((error) => {
					if (error.message === "This operation is sensitive and requires recent authentication. Log in again before retrying this request.")
						reject(`이 작업은 최근 인증이 필요합니다. 이 요청을 다시 시도하기 전에 재 로그인하십시오.`)
					reject(`error: ${error.message}`)
					console.log(error.message)
				})
			}
		})
	};

	const reauthenticateUser = async (email, currentPassword) => {
		return new Promise((resolve, reject) => {
			AuthService.reauthenticateUser(email, currentPassword).then((result) => {
				if(result==="auth/too-many-requests")
					resolve("비밀번호를 너무 많이 틀렸습니다. 나중에 다시 시도하세요.")
				if(result==="auth/wrong-password")
					resolve("현재 비밀번호가 틀렸습니다.")
				else
					resolve("success")
			})
		})
	}

	const value = {
		user,
		userrole,
		error,
		token,
		teamName,
		setTeamName,
		setToken,
		setError,
    loginWithGoogle,
		loginWithFacebook,
		loginWithApple,
		logout,
		setUser,
		setUserrole,
		createUserWithEmailAndPassword,
		signInUserWithEmailAndPassword,
		resetPassword,
		deleteAccount,
		updatePassword,
		reauthenticateUser
	};


  return <authContext.Provider value={value} {...props} />

}