import React, { useState, useEffect } from "react"
import styles from "styles/login.module.css"
import { useRouter } from "next/router";

import { withPublic } from "src/hooks/auth/route";

import Image from "next/image"
import logo from "public/logo.jpg"

import {
  GoogleLoginButton,
  FacebookLoginButton,
  AppleLoginButton
} from "react-social-login-buttons"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import IdAndPassword from "src/components/login/IdAndPassword"
import SocialLogin from "src/components/login/SocialLogin"

import { fetchText } from 'src/hooks/fetchText'
import useUserData from 'src/context/useUserData'
  

const Login = ({ auth }) => {
  const { language } = useUserData()
  const [text, setText] = useState()
  const [isLoading, setIsLoading] = useState(true)

  const router = useRouter()
  const [email, setEmail] = useState("")
  const onEmailChange = (e) => { setEmail(e.target.value) }
  const [password, setPassword] = useState("")
  const onPasswordChange = (e) => {setPassword(e.target.value)}
  const [values, setValues] = useState({
    password: '',
    showPassword: false,
    error: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      const fetchedText = await fetchText("login", language)
      setText(fetchedText)
      setIsLoading(false)
    }
    fetchData()
  },[])

  const onBackButtonClick = () => {
    router.back()
  }

  if (isLoading)
    return (
      <></>
    )

  return (
    <div className={styles.main_container} >
      <div className={styles.header_container}>
        <div className={styles.icon_container} onClick={onBackButtonClick}><ArrowBackIosIcon style={{fontSize: "15px"}}/></div>
          <p onClick={onBackButtonClick}>{text.back}</p>
      </div>
      <div className={styles.logo_container}>
        <Image src={logo} alt="한국다문화뉴스 로고" />
      </div>
      <IdAndPassword text={text} />
      <SocialLogin text={text} />
    </div>
  )
}

export default withPublic(Login);