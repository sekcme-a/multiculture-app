import styles from "styles/components/public/thumbnail.module.css"
import useUserData from "src/context/useUserData"
import { useEffect, useState } from "react"
import { translate } from "src/hooks/translate"

const Thumbnail = ({ data, smallMargin }) => {
  const [text, setText] = useState({})
  const { language, fetchText } = useUserData()

  useEffect(() => {
    const fetchData = async (lang) => {
      const txt1 = await fetchText("participation_deadline", lang)
      const txt2 = await translate(data.title, "ko", lang)
      const txt3 = await translate(data.subtitle, "ko", lang)
      setText({
        participation_deadline: txt1,
        title: txt2,
        subtitle: txt3,
      })
    }
    fetchData(language)
  }, [language])
  
  return (
    <div className={smallMargin ? `${styles.main_container} ${styles.small_margin}` : styles.main_container}>
      <img src={data.thumbnailImg} />
      <div className={styles.content_container}>
        <h3>{text.title}</h3>
        <h4>{text.subtitle}</h4>
        <p>{text.participation_deadline} : {language === "ko" ? 
          data.deadline?.toDate().toLocaleString('ko-KR').replace(/\s/g, '')
          : 
          data.deadline?.toDate().toLocaleString('en-US').replace(/\s/g, '')}
        </p>
      </div>
    </div>
  )
}

export default Thumbnail