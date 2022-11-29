import { useEffect, useState } from "react"
import styles from "styles/showArticle.module.css"
import { useRouter } from "next/router"
import dynamic from "next/dynamic"
import Image from "next/image"

import useAuth from "src/hooks/auth/auth"
import useUserData from "src/context/useUserData"
import { translate } from "src/hooks/translate"
import { firestore as db } from "firebase/firebase"

import { firebaseHooks } from "firebase/hooks"

import ShowArticle from "src/components/public/ShowArticle"
import HeaderRightClose from "src/components/public/HeaderRIghtClose"
import CircleLoader from "src/components/loader/CircleLoader"
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import Button from '@mui/material/Button'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Timeline from '@mui/lab/Timeline';
import TimelineItem,{ timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import EventBusyOutlinedIcon from '@mui/icons-material/EventBusyOutlined';

import Article from "src/components/public/Article"

const Contents = () => {
  const router = useRouter()
  const { teamName, id } = router.query;
  const { user } = useAuth()
  const { language, fetchText } = useUserData()
  const [data, setData] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [text, setText] = useState()
  const [type, setType] = useState()
  const [color, setColor] = useState("white")
  const [selectedItem, setSelectedItem] = useState(0)
  const handleChange = (event, newValue) => {
    setSelectedItem(newValue);
    console.log(newValue)
    // fetchProgramData(groups[newValue].id)
  };

  const contentData = [
    { title: "공모주제", text: `<p class="ql-align-center"><strong style="font-size: 14px; color: rgb(0, 102, 204);">다문화가정 프로그램이 연기되었습니다.</strong></p><p class="ql-align-center"><br></p><p class="ql-align-center"><span style="font-size: 14px;">이러이러한 이유로, </span></p><p class="ql-align-center"><span style="font-size: 14px;">다문화가정 프로그램이 1달간 연기되었습니다.</span></p>` },
    { title: "공모주제", text: `<p class="ql-align-center"><strong style="font-size: 14px; color: rgb(0, 102, 204);">다문화가정 프로그램이 연기되었습니다.</strong></p><p class="ql-align-center"><br></p><p class="ql-align-center"><span style="font-size: 14px;">이러이러한 이유로, </span></p><p class="ql-align-center"><span style="font-size: 14px;">다문화가정 프로그램이 1달간 연기되었습니다.</span></p>` }
  ]


  const infoData = [
    { title: "접수기간", text: "2022년 6월 15일(수) ~ 7월 12일(화), 4주간" },
    { title: "결과발표", text: "2022년 8월 초 예정, 한국건강가정진흥원 홈페이지 및 기관SNS(인스타그램)을 통해 발표." },
    { title: "주최", text: "한국건강가정진흥원" },
    { type: "button", url: "https://www.naver.com" }
  ]

  const scheduleData = [
    { date: "2022.06.15", title: "응모/접수 시작일", text: "응모를 시작하는 일자입니다." },
    { date: "2022.07.12", title: "응모/접수 마감일" },
  ]


  useEffect(() => {
    const fetchData = async () => {
      let result = await firebaseHooks.fetch_content_from_id("programs", teamName, id)
      if (result === undefined) {
        result = await firebaseHooks.fetch_content_from_id("surveys", teamName, id)
        setType("surveys")
      } else
        setType("programs")
      const groupData = await db.collection("admin_group").doc(teamName).get()
      setData({
        title: result.title,
        date: result.date,
        subtitle: result.subtitle,
        infoData: result.information,
        contentData: result.content,
        scheduleData: result.schedule,
        groupName: groupData.data().name,
        thumbnailBackground: result.thumbnailBackground,
        surveyId: result.surveyId,
        hasSurvey: result.hasSurvey,
        deadline: result.deadline
      })

      if (sessionStorage.getItem("schedule") === "true") {
        setSelectedItem(1)
        sessionStorage.setItem("schedule", false)
      } else setSelectedItem(0)
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
  
  const createMarkup = (text) => {
    return { __html: text }
  }
  return (
    <Article data={data} teamName={teamName} id={id} type={type} />
  )
}

export default Contents