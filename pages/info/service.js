import React, {useEffect, useState} from "react"
import { useRouter } from "next/router"
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import styles from "styles/info/faq.module.css"
import { firestore as db } from "firebase/firebase";
import dynamic from "next/dynamic";

import PageHeader from "src/components/public/PageHeader"


const Service = () => {
  const [text, setText] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const onTitleClick = () => { router.back() }

  useEffect(() => {
    const fetchData = async () => {
      const data = await db.collection("setting").doc("service").get()
      if (data.exists) {
        setText(data.data().text)
      }
      setIsLoading(false)
    }
    fetchData()
  }, [])

  const createMarkup = () => {
    return {__html: text}
  }

  if (isLoading) {
    return(<></>)
  }

  return (
    <div className={styles.main_container}>
      <PageHeader text="서비스이용약관" />
        <div className="quill_custom_editor" style={{marginTop:"35px"}}>
          <div dangerouslySetInnerHTML={createMarkup()} />
        </div>
    </div>
  )
}

export default Service