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



const Program = (props) => {
  const { groups, language, fetchText } = useUserData()
  const [isLoading, setIsLoading] = useState(true)
  const [text, setText] = useState()
  const [programList, setProgramList] = useState([])
  const [isProgramLoading, setIsProgramLoading] = useState(true)
  const router = useRouter()
  const [selectedItem, setSelectedItem] = useState(0)

  // const intl = useIntl()




  const handleChange = (event, newValue) => {
    setSelectedItem(newValue); 
    fetchProgramData(groups[newValue].id)
  };

  const fetchProgramData = async (teamName) => {
    try {
      setIsProgramLoading(true)
      setProgramList([])
      const data = await firebaseHooks.fetch_contents_list(teamName, "surveys", 9)
      setProgramList([...data])
      setIsProgramLoading(false)
    } catch (e) {
      console.log(e)
    }
  }


  useEffect(() => {
    const fetchData = async () => {

      if(groups.length!==0)
        fetchProgramData(groups[0].id)
      setIsLoading(false)
    }
    fetchData()
  }, [groups])

  useEffect(() => {
    const fetchData = async (lang) => {
      const txt1 = await fetchText("survey", lang)
      const txt2 = await fetchText("all", lang)
      const txt3 = await fetchText("more", lang)
      setText({
        survey: txt1,
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
    router.push(`/article/${teamName}/${id}`)
  }

  const onMoreClick = () => {
    router.push(`/home/survey/${groups[selectedItem].id}`)
  }

  if(text)
  return (
    <div className={styles.main_container}>
      <div className={styles.title}><h3>{text?.survey}</h3><p onClick={onMoreClick}>{`${text.more} >`}</p></div>
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
      <div className={styles.swiper_container}>
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
              <p>아직 등록된 설문조사가 없습니다.</p>
            </div>
          }

          {programList.length !== 0 && 
            <SwiperSlide className={styles.swiper_slide}>
              {programList[0] && <div><Thumbnail data={programList[0]} path={`/article/${programList[0].teamName}/${programList[0].id}`} /></div>}
              {programList[1] && <div><Thumbnail data={programList[1]} path={`/article/${programList[1].teamName}/${programList[1].id}`} /></div>}
              {programList[2] && <div><Thumbnail data={programList[2]} path={`/article/${programList[2].teamName}/${programList[2].id}`} /></div>}
            </SwiperSlide>
          }
          {programList.length !== 0 && programList.length>3 &&
            <SwiperSlide className={styles.swiper_slide}>
              {programList[3] && <div><Thumbnail data={programList[3]} path={`/article/${programList[3].teamName}/${programList[3].id}`} /></div>}
              {programList[4] && <div><Thumbnail data={programList[4]} path={`/article/${programList[4].teamName}/${programList[4].id}`} /></div>}
              {programList[5] && <div><Thumbnail data={programList[5]} path={`/article/${programList[5].teamName}/${programList[5].id}`} /></div>}
            </SwiperSlide>
          }
          {programList.length !== 0 && programList.length>6 &&
            <SwiperSlide className={styles.swiper_slide}>
              {programList[6] && <div><Thumbnail data={programList[6]} path={`/article/${programList[6].teamName}/${programList[6].id}`} /></div>}
              {programList[7] && <div><Thumbnail data={programList[7]} path={`/article/${programList[7].teamName}/${programList[7].id}`} /></div>}
              {programList[8] && <div><Thumbnail data={programList[8]} path={`/article/${programList[8].teamName}/${programList[8].id}`} /></div>}
            </SwiperSlide>
          }

        </Swiper>
      </div>
    </div>
  )
}

export default Program