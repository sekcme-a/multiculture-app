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
    else if(props.location==="userList")
      setTitle("사용자 목록")
    else if (props.location === "userProfileSettings")
      setTitle("사용자 프로필 설정")
    else if (props.location === "alarmSettings")
      setTitle("알람 타입 설정")
    else if (props.location === "user")
      setTitle("사용자 프로필")
    else if (props.location === "program")
      setTitle("프로그램 관리")
    else if (props.location === "survey")
      setTitle("설문조사 관리")
    else if (props.location === "content")
      setTitle("컨텐츠 관리")
    else if (props.location === "anouncement")
      setTitle("공지사항 관리")
    else if (props.location === "result")
      setTitle("결과 보기")
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