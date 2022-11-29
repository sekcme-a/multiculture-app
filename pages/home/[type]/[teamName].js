import { useEffect, useState } from "react"
// import styles from "styles/components/myPage/myPageProfile.module.css"
import { useRouter } from "next/router"

import useAuth from "src/hooks/auth/auth"
import useUserData from "src/context/useUserData"
import { translate } from "src/hooks/translate"
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import { firebaseHooks } from "firebase/hooks"
import { firestore as db } from "firebase/firebase"

import HomeHeader from "src/components/home/HomeHeader"
import GroupsHeader from "src/components/home/GroupsHeader"

import NewsHeader from "src/components/news/NewsHeader"


import Thumbnail from "src/components/public/Thumbnail"
import MiniThumbnail from "src/components/public/MiniThumbnail"

const MyPageProfile = () => {
  const router = useRouter()
  const { type, teamName } = router.query
  const { user } = useAuth()
  const { language, setLanguage, fetchText, groups, setGroups } = useUserData()
  const [text, setText] = useState([])
  const [selectedItem, setSelectedItem] = useState(0)
  const [selectedGroup, setSelectedGroup] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [programList, setProgramList] = useState([])

  const handleChange = (event, newValue) => {
    setSelectedItem(newValue); 
    const city = localStorage.getItem("city")
    // router.push(`/home`)
    if(newValue===0)
      router.push(`/home/program/${city}`)
    else if(newValue===1)
      router.push(`/home/survey/${city}`)
    else if(newValue===2)
      router.push(`/home/anouncement/${city}`)
    else if(newValue===3)
      router.push(`/home/multiculturalNews/main`)
  };
  const handleGroupChange = (event, newValue) => {
    console.log(newValue)
    setSelectedGroup(newValue)
    router.push(`/home/${type}/${event.target.id}`)
  }

  useEffect(() => {
    if(type==="program")
      setSelectedItem(0)
    else if(type==="survey")
      setSelectedItem(1)
    else if (type==="anouncement")
      setSelectedItem(2)
    else
      setSelectedItem(3)

    const fetchData = async () => {
      const result = await firebaseHooks.fetch_team_list()
      if (groups.length===0) {
        setGroups(result)
      }
      if (typeof window !== 'undefined' && language==="") {
        const locale = localStorage.getItem('language') || 'ko';
        setLanguage(locale)
        console.log(locale)
      }

      try {
        setIsLoading(true)
        if (result.length !== 0) {
          console.log(teamName)
          fetchProgramData(teamName)
          for (let i = 0; i < result.length; i++){
            if(result[i].id===teamName)
              setSelectedGroup(i)
          }
          
        } else
          setIsLoading(false)
      } catch (e) {
        console.log(e)
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


  const fetchProgramData = async (teamName) => {
    try {
      setProgramList([])
      const data = await firebaseHooks.fetch_contents_list(teamName, `${type}s`, 9)
      setProgramList([...data])
      setIsLoading(false)
      console.log(data)
    } catch (e) {
      console.log(e)
    }
  }


  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        if (groups.length !== 0) {
          console.log(teamName)
          fetchProgramData(teamName)
          for (let i = 0; i < groups.length; i++){
            if(groups[i].id===teamName)
              setSelectedGroup(i)
          }
          
        } else
          setIsLoading(false)
      } catch (e) {
        console.log(e)
      }
    }
    fetchData()
  }, [type, teamName])
  
  const onClick = (id, teamName) => {
    if (user) {
      if (type === "anouncement")
        router.push(`/${type}/${teamName}/${id}`)
      else
        router.push(`/article/${teamName}/${id}`)
    } else
      router.push('/login')
  }

  // if(isLoading || text===undefined)
  //   return (<>
  //   </>)

  if(type!=="multiculturalNews")
  return (
    <>
      <div style={{width:"100%", position: "fixed", top:0, left: 0, zIndex:"99999999", backgroundColor:"white"}}>
        <HomeHeader selectedItem={selectedItem} handleChange={handleChange} text={text} />
        <GroupsHeader selectedItem={selectedGroup} handleChange={handleGroupChange} groups={groups} />
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", marginTop:"105px", width:"100%" }}>
        {!isLoading && text !==undefined && programList.length === 0 &&
          <div style={{width:"100%", height: "350px", display: "flex", justifyContent:"center", alignItems:"center"}}>
            {text.no_contents_yet}
          </div>
        }
        {
          !isLoading && text !==undefined && programList.map((item, index) => {
            return(
              <div key={index} style={{width:"100%"}}>
                {type === "anouncement" ?
                  <MiniThumbnail data={item} />
                  :
                  <Thumbnail data={item} smallMargin={true} path={`/article/${item.teamName}/${item.id}`}/>
                }
              </div>
            )
          })
        }
        <div style={{width:"100%", height:"85px"}} />
      </div>
    </>
  )

}

export default MyPageProfile