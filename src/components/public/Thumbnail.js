import styles from "styles/components/public/thumbnail.module.css"
import useUserData from "src/context/useUserData"
import { useEffect, useState } from "react"
import { translate } from "src/hooks/translate"
import Image from "next/image"

const Thumbnail = ({ data, smallMargin }) => {
  const [text, setText] = useState({})
  const { language, fetchText } = useUserData()
  const [color, setColor] = useState("white")

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
  
  useEffect(() => {
    if (data.thumbnailBackground === "/thumbnail/003.png" ||
      data.thumbnailBackground === "/thumbnail/004.png" ||
      data.thumbnailBackground === "/thumbnail/006.png" ||
      data.thumbnailBackground === "/thumbnail/008.png" ||
      data.thumbnailBackground === "/thumbnail/009.png" ||
      data.thumbnailBackground === "/thumbnail/010.png" ||
      data.thumbnailBackground === "/thumbnail/011.png"||
      data.thumbnailBackground === "/thumbnail/012.png"
    ) {
      setColor("black")
    }
  },[])

  return (
    <div className={smallMargin ? `${styles.main_container} ${styles.small_margin}` : styles.main_container}>
      {/* <img src={data.thumbnailBackground} />
      {console.log(data)} */}
          <div className={styles.thumbnail_container}>
            <div className={styles.thumbnail_image_container}>
              <Image src={data.thumbnailBackground} alt="배경" layout="fill" objectFit="cover" objectPosition="center" />
              <div className={color === "white" ? `${styles.thumbnail_overlay} ${styles.white}` : `${styles.thumbnail_overlay} ${styles.black}`} >
                <h2>{data.groupName}</h2>
                <h3>{data.title}</h3>
                <h4>{data.date}</h4>
              </div>
            </div>
          </div>
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