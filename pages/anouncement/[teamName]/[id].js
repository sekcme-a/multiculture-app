import { useEffect, useState } from "react"
import styles from "styles/showArticle.module.css"
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

const Anouncement = () => {
  const router = useRouter()
  const { teamName, id } = router.query;
  const { user } = useAuth()
  const { language, fetchText } = useUserData()
  const [data, setData] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [text, setText] = useState()
  const [type, setType] = useState()


  useEffect(() => {
    const fetchData = async () => {
      let result = await firebaseHooks.fetch_content_from_id("anouncements", teamName, id)
      console.log(result.content)
      setData(result)
      setIsLoading(false)
    }
    fetchData()
  }, [])


  if (isLoading)
    return (
      <div className={styles.loader}>
        <CircleLoader />
      </div>
    )
  
  const createMarkup = () => {
    return {__html: data.content}
  }
  return (
    <div>
      <ShowArticle createMarkup={createMarkup} data={data} teamName={teamName} id={id} type="anouncement" />
      <div style={{width:"100%", height:"100px"}} />
    </div>
  )
}

export default Anouncement