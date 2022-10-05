import { useRouter } from "next/router";
import React from "react"
import useAuth from "src/hooks/auth/auth"
import { auth, firestore as db } from "firebase/firebase";
import { AuthService } from "./AuthService";
//로그인이 되어있다면 세팅으로 이동
export function withPublic(Component) {
  return function WithPublic(props){
    const auth = useAuth();
    const router = useRouter();
    const pathname = router.pathname;
    // const haveData = await db.collection("users").doc(auth.user.uid).get()
    const haveData = 0;
    if (auth.user!==null) {
      db.collection("users").doc(auth.user.uid).get().then((doc) => {
        if (!doc.exists && auth.user) {
          auth.setUserrole(["user"])
            let photoURL = "/default_avatar.png"
            let displayName = `User${auth.user.uid.substr(1,5)}`
          if (auth.user.photoURL)
            photoURL = auth.user.photoURL
          if(auth.user.displayName)
            displayName = auth.user.displayName
          else {
            AuthService.updateUserProfile({displayName: displayName})
          }
          db.collection("users").doc(auth.user.uid).set({
            roles: ["user"], name: displayName, photo: photoURL, language: "ko",
            phoneNumber: auth.user.phoneNumber, email: auth.user.email, emailVerified: auth.user.emailVerified,
            importance: 5, bookmark: [], like: [], isSoundOn:true, isBreakingNewsOn: true, providerId : auth.user.providerData[0].providerId
          })
          router.push("/")
          return <div></div>
        } else if (auth.user) {
          db.collection("users").doc(auth.user.uid).get().then((doc) => {
            auth.setUserrole(doc.data().roles)
            router.push("/")
          })
          return <div></div>
        }
      })
    }
    return <Component auth={auth} pathname={pathname} {...props} />
  }
}


//어드민로그인시 hallway로 이동
export function withPublicAdmin(Component) {
  return function WithPublicAdmin(props){
    const auth = useAuth();
    const router = useRouter();
    const pathname = router.pathname;
    // const haveData = await db.collection("users").doc(auth.user.uid).get()
    const haveData = 0;
    if (auth.user!==null) {
      db.collection("users").doc(auth.user.uid).get().then((doc) => {
        if (!doc.exists && auth.user) {
          auth.setUserrole(["user"])
            let photoURL = "/default_avatar.png"
            let displayName = `User${auth.user.uid.substr(1,5)}`
          if (auth.user.photoURL)
            photoURL = auth.user.photoURL
          if (auth.user.displayName) {
            displayName = auth.user.displayName
          }
          db.collection("users").doc(auth.user.uid).set({
            roles: ["user"], name: displayName, photo: photoURL, language: "ko",
            phoneNumber: auth.user.phoneNumber, email: auth.user.email, emailVerified: auth.user.emailVerified,
            importance: 5, bookmark: [], like: [], isSoundOn:true, isBreakingNewsOn: true, providerId : auth.user.providerData[0].providerId
          })
          router.push("/admin/hallway")
          return <div></div>
        } else if (auth.user) {
          db.collection("users").doc(auth.user.uid).get().then((doc) => {
            auth.setUserrole(doc.data().roles)
            router.push("/admin/hallway")
          })
          return <div></div>
        }
      })
    }
    return <Component auth={auth} pathname={pathname} {...props} />
  }
}


//로그인이 안되있다면 로그인으로 이동.
export function withProtected(Component) {
  return function WithProtected(props){
    const auth = useAuth();
    const router = useRouter();
    const pathname = router.pathname;

    if (!auth.user) {
      if(router.pathname.includes("/admin"))
        router.push("/admin/login")
      else
        router.push("/login")
      return <div></div>
    }
    return <Component auth={auth} pathname={pathname} {...props} />
  }
}