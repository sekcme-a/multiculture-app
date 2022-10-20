import { useEffect, useState } from "react"
import styles from "styles/components/public/showSurvey.module.css"
import { useRouter } from "next/router"
import dynamic from "next/dynamic"

import useAuth from "src/hooks/auth/auth"
import useUserData from "src/context/useUserData"
import { translate } from "src/hooks/translate"

import { firebaseHooks } from "firebase/hooks"

import ShowArticle from "src/components/public/ShowArticle"
import HeaderRightClose from "src/components/public/HeaderRIghtClose"
import CircleLoader from "src/components/loader/CircleLoader"

import Editor from "src/components/public/Editor"
import HeaderLeftClose from "src/components/public/HeaderLeftClose"
import Button from '@mui/material/Button';

const Contents = () => {
  const router = useRouter()
  const { teamName, id } = router.query;
  const { user } = useAuth()
  const { language, fetchText } = useUserData()
  const [data, setData] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [text, setText] = useState()


  useEffect(() => {
    

    const fetchData = async (lang) => {
      const txt1 = await fetchText("go_back_to_home", lang)
      const txt2 = await fetchText("submit_complete", lang)
      setText({
        go_back_to_home: txt1,
        submit_complete: txt2,
      })
    }
    fetchData(language)
  }, [language])


  if (isLoading)
    return (
      <div className={styles.loader}>
        <CircleLoader />
      </div>
    )
  
  // const createMarkup = () => {
  //   return {__html: data.content}
  // }
  const onGoHomeClick = () => {
    router.push("/")
  }
  if(text)
  return (
    <div>
      {/* <ShowThanks createMarkup={createMarkup} data={data} teamName={teamName} id={id} type="programs" /> */}
      <HeaderLeftClose title={text.submit_complete} />
      <h1 style={{width:"100%", textAlign:"center", marginTop:"100px"}}>참여해주셔서 감사합니다.</h1>
      <div className={styles.button_container}>
        <Button variant="contained" className={styles.button} onClick={onGoHomeClick}>
          {text.go_back_to_home}
        </Button>
      </div>
    </div>
  )
}

export default Contents