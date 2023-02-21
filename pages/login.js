import React, { useState, useEffect } from "react"
import styles from "styles/login.module.css"
import { useRouter } from "next/router";

import { withPublic } from "src/hooks/auth/route";

import Image from "next/image"

import IdAndPassword from "src/components/login/IdAndPassword"
import SocialLogin from "src/components/login/SocialLogin"
import PageHeader from "src/components/public/PageHeader";

import { fetchText } from 'src/hooks/fetchText'
import useUserData from 'src/context/useUserData'
  

const Login = () => {
  const { language, setLanguage } = useUserData()
  const [text, setText] = useState()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      let fetchedText = ""
      if (language === "") {
        setLanguage("ko")
        fetchedText = await fetchText("login", "ko")
      }
      else
        fetchedText = await fetchText("login", language)
      console.log("asdf")
      setText(fetchedText)
      setIsLoading(false)
    }
    fetchData()
  },[])

  if (isLoading)
    return (
      <div></div>
    )

  return (
    <>
    <div className={styles.main_container} >
      <PageHeader text="돌아가기" />
      <div className={styles.logo_container}>
        <Image src="/logo.png" width={300} height={300} alt="한국다문화뉴스 로고" />
      </div>
      <IdAndPassword text={text} />
      {/* <SocialLogin text={text} /> */}
      {/* <div style={{height:"1000px"}} /> */}
      
    </div>
    <div style={{paddingBottom:"40px"}}> </div>
    </>
  )
}

export default withPublic(Login);