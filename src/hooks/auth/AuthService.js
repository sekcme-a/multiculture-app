import { auth, facebookAuthProvider, firestore, googleAuthProvider, appleAuthProvider, firestore as db } from "firebase/firebase"

export const AuthService = {
  loginWithGoogle: async () => {
    const provider = googleAuthProvider
    try {
			const userCred = await auth.signInWithRedirect(provider);
				return {
					userData: userCred.user,
      	};
    } catch (e) {
      return {
        error: e.message,
      }
    }
  },
  loginWithFacebook: async () => {
    const provider = facebookAuthProvider;
    try {
      const userCred = await auth.signInWithRedirect(provider);
      return {
        user: userCred.user
      };
    } catch (e) {
      return {
        error: e.message,
      }
    }
  },
  loginWithApple: async () => {
    const provider = appleAuthProvider;
    try {
      const userCred = await auth.signInWithRedirect(provider);
      return {
        user: userCred.user
      };
    } catch (e) {
      return {
        error: e.message,
      }
    }
  },
  logout: async () => {
    await auth.signOut();
  },

  
  createUserWithEmailAndPassword: async (email, password) => {
		try {
			const userCred = await auth.createUserWithEmailAndPassword(email, password);
			// await userCred.user.sendEmailVerification();
			return {
				user: userCred.user,
			};
		} catch (e) {
			return {
				error: e.message,
			};
		}
	},

	signInUserWithEmailAndPassword: async (email, password) => {
		try {
			const userCred = await auth.signInWithEmailAndPassword(email, password);
			return {
				user: userCred.user,
			};
		} catch (e) {
			console.log(e.message)
			return {
				error: e.message,
			};
		}
	},
	resetPassword: async (email) => {
		try {
			await auth.sendPasswordResetEmail(email);
		} catch (e) {
			return e.message;
		}
	},


	deleteAccount: async () => {
		try {
			await auth.currentUser.delete();
		} catch (e) {
			return e.message;
		}
	},
	updatePassword: async (newPassword) => {
		// try {
		// 	await auth.currentUser.updatePassword(newPassword);
		// 	return "Update successfully";
		// } catch (e) {
		// 	console.log(e.message)
		// 	return e.message;
		// }
		try {
			await auth.currentUser.updatePassword(newPassword);
		} catch (e) {
			return e.message
		}
	},
	reauthenticateUser: async (email, password) => {
		try {
			const credential = await auth.signInWithEmailAndPassword(email, password);
			await auth.currentUser.reauthenticateWithCredential(credential);
			return "success"
		} catch (e) {
			console.log(e)
			return e.code
		}
	},

	updateUserProfile: async (object) => {
		try {
			await auth.currentUser.updateProfile(object)
		} catch (e) {
			console.log(e)
			return e.code
		}
	}
}

