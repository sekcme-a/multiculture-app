import styles from "styles/components/public/miniThumbnail.module.css"
import useUserData from "src/context/useUserData"
import { useEffect, useState } from "react"
import { translate } from "src/hooks/translate"
import CampaignIcon from '@mui/icons-material/Campaign';

const Thumbnail = ({ data }) => {
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
    <div className={styles.main_container}>
      <div className={styles.icon_container}><CampaignIcon style={{ fontSize: "32px" }} /></div>
      <div className={styles.content_container}>
        <h3>{`${text.title}`}</h3>
        <h4>{text.subtitle}</h4>
        <p>{language === "ko" ? 
          data.publishedDate.toDate().toLocaleString('ko-KR').replace(/\s/g, '')
          : 
          data.publishedDate.toDate().toLocaleString('en-US').replace(/\s/g, '')}
        </p>
      </div>
    </div>
  )
}

export default Thumbnail