import { useEffect, useState } from "react"

import { fetchText } from 'src/hooks/fetchText'
import useUserData from 'src/context/useUserData'

import styles from "styles/main/program.module.css"

import { firestore as db } from "firebase/firebase"

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css";
import "swiper/css/pagination";
import SwiperCore, { Pagination, Navigation, Autoplay} from "swiper";


const Program = () => {
  const { language } = useUserData()
  const [text, setText] = useState()
  const [itemList, setItemList] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const [selectedItem, setSelectedItem] = useState(0)


  const handleChange = (event, newValue) => {
    setSelectedItem(newValue);
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedText = await fetchText("index", language)
        setText(fetchedText)
        
        let fetchedData = []
        db.collection("admin_group").get().then((snap) => {
          snap.forEach((doc) => {
            if (doc.data().name)
              fetchedData.push({name: doc.data().name, id: doc.id})
          })
          setItemList([...fetchedData])
        })
        setIsLoading(false)
      } catch (e) {
        console.log(e)
      }
    }
    fetchData()
  }, [])


  if(isLoading)
    return (<>
    </>)

  return (
    <div className={styles.main_container}>
      <h2 className={styles.title}>{text ? text.program : ""}</h2>
      <Tabs
        value={selectedItem}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        textColor='secondary'
        indicatorColor='secondary'
      >
        <Tab label={text.all} style={{ margin: "0 10px" }} />
        
        {
          itemList.map((item, index) => {
            return (
              <Tab key={index} label={item.name} style={{ margin: "0 10px" }} />
            )
          })
        }
        {/* <Tab label="Item Two" />
        <Tab label="Item Three" />
        <Tab label="Item Four" />
        <Tab label="Item Five" />
        <Tab label="Item Six" />
        <Tab label="Item Seven" /> */}
      </Tabs>
      <div className={styles.swiper_container}>
        <Swiper
          grabCursor={true}
          modules={[Pagination]}
          className={styles.swiper}
        >
          <SwiperSlide className={styles.swiper_slide}>
            <div style={{backgroundColor:"red", width:"100%", height:"300px"}} />
          </SwiperSlide>
          <SwiperSlide className={styles.swiper_slide}>
            <div style={{backgroundColor:"blue", width:"100%", height:"300px"}} />
          </SwiperSlide>
          <SwiperSlide className={styles.swiper_slide}>
            <div style={{backgroundColor:"black", width:"100%", height:"300px"}} />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  )
}

export default Program