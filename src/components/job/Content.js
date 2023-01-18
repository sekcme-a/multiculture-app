import { useEffect, useState } from "react"
import styles from "styles/components/job/content.module.css"
import { useRouter } from "next/router"
import dynamic from "next/dynamic"
import Image from "next/image"

import useAuth from "src/hooks/auth/auth"
import useUserData from "src/context/useUserData"
import { translate } from "src/hooks/translate"

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
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';


const Content = ({data, teamName, id, type, mode}) => {
    const router = useRouter()
  return (
    <div className={styles.main_container}>
      <div className={styles.header_container}>
        <ArrowBackRoundedIcon className={styles.header} onClick={()=>router.back()}/>
        <h1>구인구직 세부정보</h1>
      </div>
      
      <div className={styles.info_container}>
        <h1>{data.title}</h1>
        <h2>{`${data.author} | ${data.date}`}</h2>
      </div>
      <div className={styles.content_container}>
        {data.content.map((item, index)=>{
            return(
                <div key={index}>
                    <h1>{item.title}</h1>
                    {item.data.map((data,index)=>{
                        return(
                            <div key={index}>
                                <h2>{data.title}</h2>
                                <p>{data.text}</p>
                            </div>
                        )
                    })}
                </div>
            )
        })}
        </div>
    </div>
    
  )
}

export default Content