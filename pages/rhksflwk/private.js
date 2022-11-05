import React, { useEffect, useState } from "react"
import style from "styles/rhksflwk/container.module.css"
import useAuth from "src/hooks/auth/auth"
import { useRouter } from "next/router"
import { firestore as db } from "firebase/firebase";
import Button from '@mui/material/Button';
import dynamic from "next/dynamic";

const Editor = dynamic(import('components/public/Editor'), {
  ssr: false,
  loading: () => <p>로딩중 ...</p>,
})

const AppInfo = () => {
  const [textData, setTextData] = useState("")
  const onTextChange = (html) => { setTextData(html) }
  const [noAuth, setNoAuth] = useState(true)
  const { userrole } = useAuth()

  useEffect(() => {
    const fetchData = async () => {
      setNoAuth(false)
      try {
        const doc = await db.collection("setting").doc("private").get()
        if (doc.exists) {
          setTextData(doc.data().text)
        }
      } catch (e) {
        alert(`데이터 불러오기 실패 : ${e.message}`)
      }
    }
    if(userrole?.includes("admin_super"))
      fetchData()
    else {
      setNoAuth(true)
    }
  },[userrole])
  
  const onSubmitClick = () => {
    try {
      db.collection("setting").doc("private").set({ text: textData })
      alert('개인정보처리방침이 변경되었습니다.')
    } catch (e) {
      alert(`업로드 실패 : ${e.message}`)
    }
  }
  if(noAuth && textData==="")
    return(<></>)
  return (
    <div className={style.mainContainer}>
      <div className={`${style.container} ${style.quillContainer}`}>
        <Editor path={"setting/private"} handleChange={onTextChange} textData={textData} />
      </div>
      <div className={style.submitButton} onClick={onSubmitClick}>
        개인정보처리방침 변경
      </div>
      <div style={{width:"100%", height: "100px"}} />
    </div>
  )
}

export default AppInfo