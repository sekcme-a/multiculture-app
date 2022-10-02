import { useEffect, useState } from "react"
import Image from "next/image"
import styles from "styles/admin/login.module.css"
import { useRouter } from "next/router"

import IdAndPassword from "src/components/login/IdAndPassword"
import SocialLogin from "src/components/login/SocialLogin"

import { fetchText } from "src/hooks/fetchText"
import useAuth from "src/hooks/auth/auth"
import { withPublicAdmin } from "src/hooks/auth/route"

import logo_img from "public/logo_2zsoft_no_text.png"
import background_img from "public/admin_login_background.png"
import tree_img from "public/admin_login_tree.png"


const Login = () => {
  const [text, setText] = useState("")
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      const fetchedText = await fetchText("login", "ko")
      setText(fetchedText)
    }
    if (user)
      router.push("/admin/hallway")
    else
      fetchData()
  }, [])
  
  return (
    <div className={styles.main_container}>
      <div className={styles.left_container}>
        <div className={styles.header_container}>
          <Image width="70" height="45"src={logo_img} alt="이지소프트 로고" />
          <h1>2Z SOFT</h1>
        </div>
        <div className={styles.background_container}>
          <div className={styles.tree_container}>
            <Image width="300" height="220"src={tree_img} alt="나무"/>
          </div>
          <Image width="780" height="620" alt="관리자페이지 배경화면" src={background_img} />
        </div>
      </div>
      <div className={styles.right_container}>
        <h2>Welcome To Admin Team!</h2>
        <h3>로그인을 통해 관리자페이지로 이동하세요.</h3>
        <IdAndPassword text={text} admin={true} />
        <SocialLogin text={text} />
      </div>
    </div>
  )
}

export default withPublicAdmin(Login)