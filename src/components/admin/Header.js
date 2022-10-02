import { useEffect, useState } from "react"
import styles from "styles/admin/header.module.css"

import useAuth from "src/hooks/auth/auth";
import { firestore as db } from "firebase/firebase";

import AvatarWithMenu from "src/components/admin/header/AvatarWithMenu"


const Header = (props) => {
  const [title, setTitle] = useState("")
  const [photo, setPhoto] = useState("")

  const { user } = useAuth()
  useEffect(() => {
    if (props.location === "home")
      setTitle("메인페이지")
    else if(props.location === "profile")
      setTitle("프로필 설정")
    else if (props.location === "manageTeam")
      setTitle("팀 관리")
    db.collection("users").doc(user.uid).get().then((doc) => {
      setPhoto(doc.data().photo)
    })
  }, [props])
  
  return (
    <>
      <div className={styles.main_container}>
        <h1>{title}</h1>
      </div>
      <div className={styles.avatar}>
        <AvatarWithMenu photo={photo} />
      </div>
    </>
  )
}
export default Header