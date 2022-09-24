import React, { useEffect, useState } from "react"

import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css";
import "swiper/css/pagination";
import SwiperCore, { Pagination, Navigation, Autoplay} from "swiper";

import Link from "next/link";
import Image from "next/image";
import Skeleton from '@mui/material/Skeleton';

import styles from "styles/main/mainSwiper.module.css"

import img1 from "public/multicultural-news.png"
import famtaverse from "public/famtaverse.jpg"
import program from "public/program.png"

const MainSwiper = () => {
  const [isLoading, setIsLoading] = useState(true)
  SwiperCore.use([Autoplay])
  if (!isLoading)
    return (
      <></>
    )
  
  return (
    <div className={styles.main_container}>
      <Swiper
        grabCursor={true}
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        className={styles.swiper}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
      >
        <SwiperSlide className={styles.swiper_slide}>
          <Link href={`/post`} >
            <div className={styles.swiper_container}>
              <Image src={img1} alt="메인 배경 이미지" layout="fill" objectFit="cover" objectPosition="center"/>
            </div>
          </Link>
        </SwiperSlide>
        <SwiperSlide className={styles.swiper_slide}>
          <Link href={`/post`} >
            <div className={styles.swiper_container}>
              <Image src={famtaverse} alt="메인 배경 이미지" layout="fill" objectFit="cover" objectPosition="center"/>
            </div>
          </Link>
        </SwiperSlide>
        <SwiperSlide className={styles.swiper_slide}>
          <Link href={`/post`} >
            <div className={styles.swiper_container}>
              <Image src={program} alt="메인 배경 이미지" layout="fill" objectFit="cover" objectPosition="center"/>
            </div>
          </Link>
        </SwiperSlide>
      </Swiper>
    </div>
  )
}

export default MainSwiper