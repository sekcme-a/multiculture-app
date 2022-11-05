import { useEffect, useState } from "react"
import styles from "styles/components/myPage/myPageProfile.module.css"
import { useRouter } from "next/router"

import useAuth from "src/hooks/auth/auth"
import useUserData from "src/context/useUserData"
import { translate } from "src/hooks/translate"

import { firebaseHooks } from "firebase/hooks"

const Message = () => {
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

    </div>
  )
}

export default Message