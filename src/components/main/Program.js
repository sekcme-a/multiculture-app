import { useEffect, useState } from "react"
import { useRouter } from "next/router"

import useUserData from 'src/context/useUserData'
import { translate } from 'src/hooks/translate'

import styles from "styles/main/program.module.css"

import { firestore as db } from "firebase/firebase"

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Skeleton from '@mui/material/Skeleton';

import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css";
import "swiper/css/pagination";
import SwiperCore, { Pagination, Navigation, Autoplay } from "swiper";
import { useIntl } from "react-intl";
import { firebaseHooks } from "firebase/hooks"

import Thumbnail from "src/components/public/Thumbnail"
import CircleLoader from "src/components/loader/CircleLoader"

import useAuth from "src/hooks/auth/auth"


const Program = (props) => {
  const { groups, language, fetchText } = useUserData()
  const [isLoading, setIsLoading] = useState(true)
  const [text, setText] = useState()
  const [programList, setProgramList] = useState([])
  const [isProgramLoading, setIsProgramLoading] = useState(true)
  const router = useRouter()
  const [selectedItem, setSelectedItem] = useState(0)
  const { user } = useAuth()

  // const intl = useIntl()




  const handleChange = (event, newValue) => {
    setSelectedItem(newValue); 
    fetchProgramData(groups[newValue].id)
  };

  const fetchProgramData = async (teamName) => {
    try {
      setIsProgramLoading(true)
      setProgramList([])
      const data = await firebaseHooks.fetch_contents_list(teamName, "programs", 9)
      setProgramList([...data])
      setIsProgramLoading(false)
    } catch (e) {
      console.log(e)
    }
  }


  useEffect(() => {
      if(groups.length!==0)
        fetchProgramData(groups[0].id)
      setIsLoading(false)
  }, [groups])

  useEffect(() => {
    const fetchData = async (lang) => {
      const txt1 = await fetchText("program", lang)
      const txt2 = await fetchText("all", lang)
      const txt3 = await fetchText("more", lang)
      setText({
        program: txt1,
        all: txt2,
        more: txt3,
      })
    }
    fetchData(language)
  },[language])

  if(isLoading)
    return (<>
    </>)
  
  const onClick = (id, teamName) => {
    if(user)
      router.push(`/article/${teamName}/${id}`)
    else
      router.push('/login')
  }

  const onMoreClick = () => {
    router.push(`/home/program/${groups[selectedItem].id}`)
  }

  if(text && !isLoading)
  return (
    <div className={styles.main_container}>
      <div className={styles.title}><h3>{text?.program}</h3><p onClick={onMoreClick}>{`${text.more} >`}</p></div>
      <Tabs
        value={selectedItem}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        textColor='secondary'
        indicatorColor='secondary'
        style={{borderBottom:"2px solid rgb(248,248,248)"}}
      >
        {/* <Tab label={text?.all} style={{ margin: "0 10px" }} /> */}
        
        {
          groups.map((item, index) => {
            return (
              <Tab key={index} label={item.name} style={{ margin: "0 10px", fontSize:"17px" }} />
            )
          })
        }

      </Tabs>
      <div className={styles.swiper_container} >
        <Swiper
          grabCursor={true}
          modules={[Pagination]}
          className={styles.swiper}
        >
          {isProgramLoading &&
            <div style={{ width: "100%", height: "250px", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <CircleLoader />
            </div>
          }

          {!isProgramLoading && programList.length === 0 && 
            <div style={{ width: "100%", height: "250px", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <p>아직 등록된 프로그램이 없습니다.</p>
            </div>
          }

          {programList.length !== 0 && 
            <SwiperSlide className={styles.swiper_slide}>
              {programList[0] && <div onClick={()=>onClick(programList[0].id, programList[0].teamName)}><Thumbnail data={programList[0]} /></div>}
              {programList[1] && <div onClick={()=>onClick(programList[1].id, programList[1].teamName)}><Thumbnail data={programList[1]} /></div>}
              {programList[2] && <div onClick={()=>onClick(programList[2].id, programList[2].teamName)}><Thumbnail data={programList[2]} /></div>}
            </SwiperSlide>
          }
          {programList.length !== 0 && programList.length>3 &&
            <SwiperSlide className={styles.swiper_slide}>
              {programList[3] && <div onClick={()=>onClick(programList[3].id, programList[3].teamName)}><Thumbnail data={programList[3]} /></div>}
              {programList[4] && <div onClick={()=>onClick(programList[4].id, programList[4].teamName)}><Thumbnail data={programList[4]} /></div>}
              {programList[5] && <div onClick={()=>onClick(programList[5].id, programList[5].teamName)}><Thumbnail data={programList[5]} /></div>}
            </SwiperSlide>
          }
          {programList.length !== 0 && programList.length>6 &&
            <SwiperSlide className={styles.swiper_slide}>
              {programList[6] && <div onClick={()=>onClick(programList[6].id, programList[6].teamName)}><Thumbnail data={programList[6]} /></div>}
              {programList[7] && <div onClick={()=>onClick(programList[7].id, programList[7].teamName)}><Thumbnail data={programList[7]} /></div>}
              {programList[8] && <div onClick={()=>onClick(programList[8].id, programList[8].teamName)}><Thumbnail data={programList[8]} /></div>}
            </SwiperSlide>
          }

        </Swiper>
      </div>
    </div>
  )
}

export default Program