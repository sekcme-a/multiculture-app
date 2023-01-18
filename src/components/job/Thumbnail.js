import { useEffect, useState } from "react"
import styles from "styles/components/job/thumbnail.module.css"
import { useRouter } from "next/router"

import useAuth from "src/hooks/auth/auth"
import useUserData from "src/context/useUserData"
import { translate } from "src/hooks/translate"
import { firebaseHooks } from "firebase/hooks"

const Thumbnail = ({data,path}) => {
    const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      console.log(data)
    }
    fetchData()
  }, [])
  return (
    <div className={styles.main_container} onClick={()=>{router.push(path)}}>
        <h1>{data.title}</h1>
        <div className={styles.sub_container}>
            <h2>{data.author}</h2>
            <p>{data.date}</p>
        </div>
    </div>
  )
}

export default Thumbnail