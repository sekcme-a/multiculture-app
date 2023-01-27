import styles from "styles/components/public/thumbnail.module.css"
import useUserData from "src/context/useUserData"
import { useEffect, useState } from "react"
import { translate } from "src/hooks/translate"
import Image from "next/image"
import { useRouter } from "next/router"
import useAuth from "src/hooks/auth/auth"
import { firestore as db } from "firebase/firebase"

import SurveyDialog from "src/components/public/SurveyDialog"

import AccessAlarmOutlinedIcon from '@mui/icons-material/AccessAlarmOutlined';

const Thumbnail = ({ data, smallMargin, path }) => {
  const [text, setText] = useState({})
  const { language, fetchText } = useUserData()
  const [color, setColor] = useState("white")
  const [openDialog, setOpenDialog] = useState(false)
  const [date, setDate] = useState(new Date())
  const router = useRouter()
  const { user } = useAuth()
  const [surveyPath, setSurveyPath] = useState("")

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
    setInterval(()=>setDate( new Date()), 1000)
  }, [])
  
  const onClick = async () => {
    let go = true;
    // if (!openDialog) {
    //   if (path.includes("article")) {
    //     const history = localStorage.getItem("history_program")
    //     if (history !== null) {
    //       const list = history.split("_SEP_")
    //       for (const items of list) {
    //         const item = items.split("/:/")
    //         if (item[2] !== "undefined") {
    //           const time = new Date(parseInt(item[2]) * 1000)
    //           if (new Date(parseInt(item[2])) <= new Date()) {
    //             console.log("asdf")
    //             setOpenDialog(true)
    //             console.log(item[0], item[1])
    //             const doc = await db.collection("contents").doc(item[0]).collection("programs").doc(item[1]).get()
    //               setSurveyPath(`/programSurveys/${data.teamName}/${doc.data().surveyId}`)
    //               console.log(doc.data().surveyId)
    //               go = false;
    //           }
    //         }
    //       }
    //     }
    //   }
    // }
    if (go) {
      // if(data.publishedDate.toDate() <= date)
        router.push(path)
    }
    // if (user)
    //   router.push(path)
    // else
    //   router.push("/login")
  }

  //몇 초후 신청가능, 몇분후 신청가능, 몇시간, 몇일 단위 계산
  const getTimeLeft = () => {
    const timeLeft = Math.round((data.publishedDate.toDate().getTime()-date.getTime())/1000)
    if(timeLeft<=60)
      return `${timeLeft}초 후 신청가능`
    else if(timeLeft<=3600)
      return `${Math.round(timeLeft/60)}분 후 신청가능`
    else if(timeLeft <= 3600*12)
      return`${Math.floor(timeLeft/3600)}시간 ${Math.round((timeLeft-Math.floor(timeLeft/3600)*3600)/60)}분 후 신청가능`
    else
    return`
      ${Math.floor(timeLeft/(3600*24))}일 후 신청가능`
  }

  return (
    <>
    <div className={smallMargin ? `${styles.main_container} ${styles.small_margin}` : styles.main_container} onClick={onClick}>
      {/* <img src={data.thumbnailBackground} />
      {console.log(data)} */}
          <div className={styles.thumbnail_container}>
            {data.publishedDate.toDate() > date ? 
              <div className={styles.waiting_container}>
                <div style={{display:"flex", justifyContent:"center", flexWrap:"wrap"}}>
                <AccessAlarmOutlinedIcon style={{fontSize:"40px", color:"white"}}/>
                {/* <p>{`${Math.round((data.publishedDate.toDate().getTime()-date.getTime())/1000/60)}분 후 신청가능`}</p> */}
                <p>{getTimeLeft()}</p>
                </div>
              </div>
              :
              <div className={styles.thumbnail_image_container}>
                <Image src={data.thumbnailBackground} alt="배경" layout="fill" objectFit="cover" objectPosition="center" />
                {data.mainThumbnailImg==="" &&
                  <div className={color === "white" ? `${styles.thumbnail_overlay} ${styles.white}` : `${styles.thumbnail_overlay} ${styles.black}`} >
                    <h2>{data.groupName}</h2>
                    <h3>{data.title}</h3>
                    <h4>{data.date}</h4>
                  </div>
                }
              </div>
            }
          </div>
      <div className={styles.content_container}>
        <h3>{data.keyword ? `[${data.keyword}] ${text.title}` : text.title}</h3>
        <h4>{text.subtitle}</h4>
        <p>{text.participation_deadline} : {language === "ko" ? 
          data.deadline?.toDate().toLocaleString('ko-KR').replace(/\s/g, '')
          : 
          data.deadline?.toDate().toLocaleString('en-US').replace(/\s/g, '')}
        </p>
      </div>
      <div>
        {/* <SurveyDialog isShow={openDialog} handleShow={(bool)=>setOpenDialog(bool)} path={surveyPath} /> */}
      </div>
    </div>
    {/* <SurveyDialog isShow={openDialog} handleShow={setOpenDialog} /> */}
    </>
  )
}

export default Thumbnail