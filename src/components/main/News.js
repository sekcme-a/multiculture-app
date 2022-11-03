import { useEffect, useState } from "react"
import { useRouter } from "next/router"

import useUserData from 'src/context/useUserData'
import { translate } from 'src/hooks/translate'

import styles from "styles/main/anouncement.module.css"

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

import MiniThumbnail from "src/components/public/MiniThumbnail"
import CircleLoader from "src/components/loader/CircleLoader"
import NewsSwiper from "src/components/main/NewsSwiper"



const Program = (props) => {
  const { groups,  language, fetchText } = useUserData()
  const [isLoading, setIsLoading] = useState(true)
  const [text, setText] = useState()
  const router = useRouter()
  const [selectedItem, setSelectedItem] = useState(0)



  useEffect(() => {
    const fetchData = async (lang) => {
      const txt1 = await fetchText("multicultural_news", lang)
      const txt2 = await fetchText("check_out_the_main_articles_of_Korea_Multicultural_News", lang)
      const txt3 = await fetchText("more", lang)
      setText({
        multicultural_news: txt1,
        check_out_the_main_articles_of_Korea_Multicultural_News: txt2,
        more: txt3,
      })
    }
    fetchData(language)
  },[language])


  const onMoreClick = () => {
    router.push(`/home/multiculturalNews/${groups[selectedItem].id}`)
  }

  if(text)
  return (
    <div className={styles.main_container}>
      <div className={styles.title}><h3>{text?.multicultural_news}</h3><p onClick={onMoreClick}>{`${text.more} >`}</p></div>
      <h4 className={styles.subtitle}>{text?.check_out_the_main_articles_of_Korea_Multicultural_News}</h4>
      <NewsSwiper />
    </div>
  )
}

export default Program