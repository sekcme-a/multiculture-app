
import HomeHeader from "src/components/home/HomeHeader"

import NewsHeader from "src/components/news/NewsHeader"


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


const Home = () => {
  const router = useRouter()
  const { slug } = router.query
  const { user } = useAuth()
  const { language, setLanguage, fetchText, groups, setGroups } = useUserData()
  const [text, setText] = useState([])
  const [selectedItem, setSelectedItem] = useState(0)
  const [selectedGroup, setSelectedGroup] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [programList, setProgramList] = useState([])

  const handleChange = (event, newValue) => {
    setSelectedItem(newValue); 
    // router.push(`/home`)
    if(newValue===0)
      router.push("/home/program")
    else if(newValue===1)
      router.push("/home/survey")
    else if(newValue===2)
      router.push("/home/anouncement")
    else if(newValue===3)
      router.push("/home/multiculturalNews/main")
  };
  const handleGroupChange = (event, newValue)=>{
    setSelectedGroup(newValue)
  }

  useEffect(() => {
    if(slug==="program")
      setSelectedItem(0)
    else if(slug==="survey")
      setSelectedItem(1)
    else if (slug==="anouncement")
      setSelectedItem(2)
    else if (slug==="multiculturalNews")
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


  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        console.log(groups[selectedGroup]?.id)
        setIsLoading(false)
      } catch (e) {
        console.log(e)
      }
    }
    fetchData()
  }, [selectedGroup, slug])
  
  const onClick = (id, teamName) => {
    if(slug==="anouncement")
      router.push(`/${slug}/${teamName}/${id}`)
    else
    router.push(`/article/${teamName}/${id}`)
  }

  if(isLoading || text===undefined)
    return (<>
    </>)
  

  return (
    <>
      <HomeHeader selectedItem={3} handleChange={handleChange} text={text} />
      {/* <NewsHeader /> */}
      <MainNews />
      <h2 style={{ fontWeight: "bold", margin: "40px 0 -13px 25px", fontSize: "20px" }}>실시간 뉴스</h2>
      <PostList id="home" addMargin={false} />
    </>
  )
}

export default Home;