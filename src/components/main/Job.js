import { useEffect, useState } from "react"
import { useRouter } from "next/router"

import useUserData from 'src/context/useUserData'
import { translate } from 'src/hooks/translate'

import styles from "styles/main/job.module.css"

import { firestore as db } from "firebase/firebase"

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Skeleton from '@mui/material/Skeleton';

import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css";
import "swiper/css/pagination";
import SwiperCore, { Pagination, Navigation, Autoplay } from "swiper";
import { useIntl } from "react-intl";
import { fetchJob } from "api/job"

import Thumbnail from "src/components/job/Thumbnail"
import CircleLoader from "src/components/loader/CircleLoader"



const Program = (props) => {
  const { groups, language, fetchText } = useUserData()
  const [isLoading, setIsLoading] = useState(true)
  const [text, setText] = useState()
  const [jobList, setJobList] = useState([])
  const [isJobLoading, setIsJobLoading] = useState(true)
  const router = useRouter()
  const [selectedItem, setSelectedItem] = useState(0)

  // const intl = useIntl()




  const handleChange = (event, newValue) => {
    setSelectedItem(newValue); 
    fetchProgramData(groups[newValue].id)
  };

  const fetchProgramData = async (teamName) => {
    try {
      setIsJobLoading(true)
      setJobList([])
      const data = await fetchJob.fetch_job(teamName)
      setJobList([...data])
      setIsJobLoading(false)
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
    router.push(`/job/${teamName}/${id}`)
  }

  const onMoreClick = () => {
    router.push(`/home/job/${groups[selectedItem].id}`)
  }

  if(text)
  return (
    <div className={styles.main_container}>
      <div className={styles.title}><h3>구인구직</h3></div>
      {/* <div className={styles.title}><h3>구인구직</h3><p onClick={onMoreClick}>{`${text.more} >`}</p></div> */}
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
          {isJobLoading &&
            <div style={{ width: "100%", height: "250px", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <CircleLoader />
            </div>
          }

          {!isJobLoading && jobList.length === 0 && 
            <div style={{ width: "100%", height: "250px", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <p>아직 등록된 구인구직이 없습니다.</p>
            </div>
          }

          {jobList.length !== 0 && 
            <SwiperSlide className={styles.swiper_slide}>
              {jobList[0] && <div><Thumbnail data={jobList[0]} path={`/job/${jobList[0].path}`} /></div>}
              {jobList[1] && <div><Thumbnail data={jobList[1]} path={`/job/${jobList[1].path}`} /></div>}
              {jobList[2] && <div><Thumbnail data={jobList[2]} path={`/job/${jobList[2].path}`} /></div>}
            </SwiperSlide>
            
          }
          {jobList.length !== 0 && jobList.length>3 &&
            <SwiperSlide className={styles.swiper_slide}>
              {jobList[3] && <div><Thumbnail data={jobList[3]} path={`/job/${jobList[3].path}`} /></div>}
              {jobList[4] && <div><Thumbnail data={jobList[4]} path={`/job/${jobList[4].path}`} /></div>}
              {jobList[5] && <div><Thumbnail data={jobList[5]} path={`/job/${jobList[5].path}`} /></div>}
            </SwiperSlide>
          }
          {jobList.length !== 0 && jobList.length>6 &&
            <SwiperSlide className={styles.swiper_slide}>
              {jobList[6] && <div><Thumbnail data={jobList[6]} path={`/job/${jobList[6].path}`} /></div>}
              {jobList[7] && <div><Thumbnail data={jobList[7]} path={`/job/${jobList[7].path}`} /></div>}
              {jobList[8] && <div><Thumbnail data={jobList[8]} path={`/job/${jobList[8].path}`} /></div>}
            </SwiperSlide>
          }

        </Swiper>
      </div>
    </div>
  )
}

export default Program