
import HomeHeader from "src/components/home/HomeHeader"


import { useEffect, useState } from "react"
// import styles from "styles/components/myPage/myPageProfile.module.css"
import { useRouter } from "next/router"

import useAuth from "src/hooks/auth/auth"
import useUserData from "src/context/useUserData"
import { translate } from "src/hooks/translate"
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import { firebaseHooks } from "firebase/hooks"
import MainNews from "src/components/news/MainNews"
import PostList from "src/components/news/PostList"
import GroupsHeader from "src/components/home/GroupsHeader"
import NewsHeader from "src/components/home/NewsHeader"


const Home = () => {
  const router = useRouter()
  const { id } = router.query
  const { user } = useAuth()
  const { language, setLanguage, fetchText, groups, setGroups } = useUserData()
  const [text, setText] = useState([])
  const [selectedItem, setSelectedItem] = useState(0)
  const [selectedGroup, setSelectedGroup] = useState(0)
  const [selectedNews, setSelectedNews] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [programList, setProgramList] = useState([])
  const [newsMenu, setNewsMenu] = useState([])
  const [address, setAddress] = useState()

  const menu = [
    {id: 0, name:"메인"},
    {id: 1, name:"지역별"},
    {id: 2, name:"언어별"},
    {id: 3, name:"사회"},
    {id: 4, name:"문화"},
    {id: 5, name:"기획"},
  ]

  const handleChange = (event, newValue) => {
    setSelectedItem(newValue); 
    // router.push(`/home`)
    const city = localStorage.getItem("city")
    if(newValue===0)
      router.push(`/home/program/${city}`)
    else if(newValue===1)
      router.push(`/home/survey/${city}`)
    else if(newValue===2)
      router.push(`/home/anouncement/${city}`)
    else if(newValue===3)
      router.push("/home/multiculturalNews/main")
  };

  useEffect(() => {
    setSelectedItem(3)

    const fetchData = async () => {
      if (groups.length===0) {
        const result = await firebaseHooks.fetch_team_list()
        setGroups(result)
      }
      if (typeof window !== 'undefined' && language==="") {
        const locale = localStorage.getItem('language') || 'ko';
        setLanguage(locale)
        console.log(locale)
      }
    }
    fetchData()
  },[])

  useEffect(() => {
    const fetchData = async (lang) => {
      const txt1 = await fetchText("program", lang)
      const txt2 = await fetchText("survey", lang)
      const txt3 = await fetchText("anouncement", lang)
      const txt4 = await fetchText("multicultural_news", lang)
      const txt5 = await fetchText("all", lang)
      const txt6 = await fetchText("more", lang)
      const txt7 = await fetchText("no_contents_yet", lang)
      setText({
        program: txt1,
        survey: txt2,
        anouncement: txt3,
        multicultural_news: txt4,
        all: txt5,
        more: txt6,
        no_contents_yet: txt7
      })
    }
    fetchData(language)
  }, [language])


  // useEffect(() => {
  //   if (selectedGroup === 0) {
  //     setNewsMenu([])
  //     setAddress("https://www.kmcn.kr/news/article_list_all.html")
  //   }
  //   else if (selectedGroup === 1) {
  //     setNewsMenu([
  //       { id: 25, name: "경기도" },
  //       { id: 26, name: "충청도" },
  //       { id: 27, name: "강원도" },
  //       { id: 28, name: "경상도" },
  //       { id: 30, name: "제주도" },
  //       { id: 87, name: "특별/광역시" },
  //     ])
  //     setSelectedNews(0)
  //     setAddress("https://www.kmcn.kr/news/section_list_all.html?sec_no=25")
  //   }
  //   else if (selectedGroup === 2) {
  //     setNewsMenu([
  //       { id: 35, name: "한국어" },
  //       { id: 36, name: "영어" },
  //       { id: 37, name: "중국어" },
  //       { id: 38, name: "일본어" },
  //       { id: 39, name: "베트남어" },
  //       { id: 40, name: "태국어" },
  //       { id: 41, name: "타갈로그어" },
  //     ])
  //     setSelectedNews(0)
  //     setAddress("https://www.kmcn.kr/news/section_list_all.html?sec_no=35")
  //   }
  // }, [selectedGroup])

  useEffect(() => {
    if (id === "main") {
      setAddress("https://www.kmcn.kr/news/article_list_all.html")
      setNewsMenu([])
      return
    }
    else {
      const ID = parseInt(id)
      if ((ID > 24 && ID < 31) || ID === 87) {
        setSelectedGroup(1)
        setNewsMenu([
          { id: 25, name: "경기도" },
          { id: 26, name: "충청도" },
          { id: 27, name: "강원도" },
          { id: 28, name: "경상도" },
          { id: 30, name: "제주도" },
          { id: 87, name: "특별/광역시" },
        ])
      }
      else if (ID > 34 && ID < 42) {
        setSelectedGroup(2)
        setNewsMenu([
        { id: 35, name: "한국어" },
        { id: 36, name: "영어" },
        { id: 37, name: "중국어" },
        { id: 38, name: "일본어" },
        { id: 39, name: "베트남어" },
        { id: 40, name: "태국어" },
        { id: 41, name: "타갈로그어" },
        ])
      }
      else if (ID > 41 && ID < 45) {
        setSelectedGroup(3)
        setNewsMenu([
        { id: 42, name: "경제" },
        { id: 43, name: "정치" },
        { id: 44, name: "교육" },
        ])
      }
      else if (ID=== 45 || ID===47 || ID===84) {
        setSelectedGroup(4)
        setNewsMenu([
        { id: 45, name: "생활" },
        { id: 47, name: "연예" },
        { id: 84, name: "스포츠" },
        ])
      }
      else if (ID>47 && ID<52) {
        setSelectedGroup(5)
        setNewsMenu([
        { id: 48, name: "칼럼" },
        { id: 50, name: "인터뷰" },
        { id: 49, name: "오피니언" },
        { id: 51, name: "우리지역명소" },
        ])
      }
        
        
      if (ID === 25) setSelectedNews(0)
      else if (ID === 26) setSelectedNews(1)
      else if (ID === 27) setSelectedNews(2)
      else if (ID === 28) setSelectedNews(3)
      else if (ID === 30) setSelectedNews(4)
      else if (ID === 87) setSelectedNews(5)
      else if (ID === 35) setSelectedNews(0)
      else if (ID === 36) setSelectedNews(1)
      else if (ID === 37) setSelectedNews(2)
      else if (ID === 38) setSelectedNews(3)
      else if (ID === 39) setSelectedNews(4)
      else if (ID === 40) setSelectedNews(5)
      else if (ID === 41) setSelectedNews(6)
      else if (ID === 42) setSelectedNews(0)
      else if (ID === 43) setSelectedNews(1)
      else if (ID === 44) setSelectedNews(2)
      else if (ID === 45) setSelectedNews(0)
      else if (ID === 47) setSelectedNews(1)
      else if (ID === 84) setSelectedNews(2)
      else if (ID === 48) setSelectedNews(0)
      else if (ID === 50) setSelectedNews(1)
      else if (ID === 49) setSelectedNews(2)
      else if (ID === 51) setSelectedNews(3)
    }
    setAddress(`https://www.kmcn.kr/news/section_list_all.html?sec_no=${id}`)
  },[id])


  const handleGroupChange = (event, newValue) => {
    console.log(newValue)
    setSelectedGroup(newValue)
    if(newValue===0)
      router.push(`/home/multiculturalNews/main`)
    else if(newValue===1)
      router.push(`/home/multiculturalNews/25`)
    else if(newValue===2)
      router.push(`/home/multiculturalNews/35`)
    else if(newValue===3)
      router.push(`/home/multiculturalNews/42`)
    else if(newValue===4)
      router.push(`/home/multiculturalNews/45`)
    else if(newValue===5)
      router.push(`/home/multiculturalNews/48`)
  }

  const handleNewsChange = (event, newValue) => {
    console.log(newValue)
    setSelectedNews(newValue)
    router.push(`/home/multiculturalNews/${event.target.id}`)
      // setAddress(`https://www.kmcn.kr/news/section_list_all.html?sec_no=${event.target.id}`)
  }

  // if(isLoading || text===undefined)
  //   return (<>
  //   </>)
  

  return (
    <>
      <div style={{width:"100%", position: "fixed", top:0, left: 0, zIndex:"99999999", backgroundColor:"white"}}>
        <HomeHeader selectedItem={3} handleChange={handleChange} text={text} />
        <GroupsHeader selectedItem={selectedGroup} handleChange={handleGroupChange} groups={menu} />
        {newsMenu.length !== 0 && <NewsHeader selectedItem={selectedNews} handleChange={handleNewsChange} groups={newsMenu} />}
      </div>
      {/* <NewsHeader /> */}
      {newsMenu.length === 0 && <MainNews />}
      {newsMenu.length === 0 && <h2 style={{ fontWeight: "bold", margin: "40px 0 -13px 25px", fontSize: "20px" }}>실시간 뉴스</h2>}
      {newsMenu.length !== 0 && <div style={{ height: "110px", width: "100%" }} />}
      {address && <PostList id={address} addMargin={false} />}
    </>
  )
}

export default Home;