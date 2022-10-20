import { useEffect, useState } from "react"
import styles from "styles/showArticle.module.css"
import { useRouter } from "next/router"

import useAuth from "src/hooks/auth/auth"
import useUserData from "src/context/useUserData"
import { translate } from "src/hooks/translate"

import { firebaseHooks } from "firebase/hooks"
import HeaderRightClose from "src/components/public/HeaderRIghtClose"

import Button from '@mui/material/Button';


const ShowArticle = ({createMarkup, data, teamName, id, type}) => {
  const router = useRouter()
  const { user } = useAuth()
  const { language, fetchText } = useUserData()
  const [isLoading, setIsLoading] = useState(true)
  const [text, setText] = useState()



  useEffect(() => {
    const fetchData = async (lang) => {
      let subtitle = ""
      const txt1 = await translate(data.title, "ko", lang)
      const txt2 = await fetchText("participation_deadline", lang)
      const txt3 = await fetchText("apply", lang)
      const txt4 = await fetchText("anouncement", lang)
      const txt5 = await fetchText("go_back_to_home", lang)
      if(data.subtitle)
        subtitle = await translate(data.subtitle, "ko", lang)
      setText({
        title: txt1,
        subtitle: subtitle,
        participation_deadline: txt2,
        apply: txt3,
        anouncement: txt4,
        go_back_to_home : txt5,
      })
    }
    if(data)
      fetchData(language)
  }, [language, isLoading])

  const onApplyClick = () => {
    router.push(`/${type}/${teamName}/${id}`)
  }

  const onHomeClick = () => {
    router.push('/')
  }

  if(text)
  return (
    <div className={styles.main_container}>
      <HeaderRightClose title={type==="anouncement" ? text.anouncement : text.title} />
      <div className={styles.content_container}>
        <h1>{text.title}</h1>
        <h2>{text.subtitle}</h2>
        {type !== "anouncement" &&
          <p>{text.participation_deadline} : {language === "ko" ?
            data.deadline?.toDate().toLocaleString('ko-KR').replace(/\s/g, '')
            :
            data.deadline?.toDate().toLocaleString('en-US').replace(/\s/g, '')}
          </p>
        }
        {/* {data.content && <div className="quill_custom_editor"><Editor textData={data.content} custom={true} /></div>} */}
        {/* {data.content && <QuillNoSSRWrapper value={data.content || ""} readOnly={true} theme="snow" />} */}
        <div className="quill_custom_editor" style={{marginTop:"35px"}}>
          <div dangerouslySetInnerHTML={createMarkup()} />
        </div>
        <div className={styles.button_container}>
          {type !== "anouncement" ?
            <Button variant="contained" className={styles.button} onClick={onApplyClick}>{text.apply}</Button>
            :
            <Button variant="contained" className={styles.button} onClick={onHomeClick}>{text.go_back_to_home}</Button>
          }
        </div>
      </div>
    </div>
  )
}

export default ShowArticle