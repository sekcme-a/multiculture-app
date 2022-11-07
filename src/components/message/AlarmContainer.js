import { useEffect, useState } from "react"
import styles from "styles/message/alarmContainer.module.css"
import { useRouter } from "next/router"
import Image from "next/image"

import useAuth from "src/hooks/auth/auth"
import useUserData from "src/context/useUserData"
import { translate } from "src/hooks/translate"

import { firebaseHooks } from "firebase/hooks"

import Button from '@mui/material/Button';

const AlarmContainer = ({image, name, date, text, button, onClick}) => {
  const router = useRouter()
  const { user } = useAuth()
  const { language, fetchText } = useUserData()


  useEffect(() => {
    const fetchData = async () => {
      
    }
    fetchData()
  }, [])
  return (
    <div className={styles.main_container}>
      <div className={styles.header}>
        <div className={styles.logo_container}>
          <Image src={image} width={38} height={38} alt="로고" />
        </div>
        <div className={styles.text_container}>
          <h1>{name}<p>{date}</p></h1>
          <h2>{text}</h2>
        </div>
      </div>
      {button && button.map((item, index) => {
        return (
          <Button key={index} style={{width:"100%", marginTop:"10px"}} variant="outlined" onClick={onClick[index]}>{item}</Button>
        )
      })}
    </div>
  )
}

export default AlarmContainer