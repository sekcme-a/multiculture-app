import { useEffect, useState } from "react"
import styles from "styles/components/myPage/myPageProfile.module.css"
import { useRouter } from "next/router"

import useAuth from "src/hooks/auth/auth"
import useUserData from "src/context/useUserData"

import { firebaseHooks } from "firebase/hooks"

import Avatar from '@mui/material/Avatar'

const MyPageProfile = () => {
  const router = useRouter()
  const { user } = useAuth()
  const { language } = useUserData()


  useEffect(() => {
    const fetchData = async () => {
    }
    fetchData()
  }, [])
  return (
    <div className={styles.main_container}>
      <Avatar alt={user.displayName} src={user.photoURL} />
      <h2>Welcome</h2>
      <h3>{user.displayName}님</h3>
    </div>
  )
}

export default MyPageProfile