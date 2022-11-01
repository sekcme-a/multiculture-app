import { useEffect, useState } from "react"
// import styles from "styles/components/myPage/myPageProfile.module.css"
import { useRouter } from "next/router"

import useAuth from "src/hooks/auth/auth"
import useUserData from "src/context/useUserData"
import { translate } from "src/hooks/translate"
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import { firebaseHooks } from "firebase/hooks"


const HomeHeader = ({ selectedItem, handleChange, text }) => {
  const { language, fetchText } = useUserData()
  const [lang, setLang] = useState("")
  useEffect(() => {
    setLang(language)
  },[language])
  if(lang==="ko" || lang==="zh" || lang==="ja")
  return (
    // <div style={{width:"100%", position: "fixed", top:0, left: 0, zIndex:"99999999", backgroundColor:"white"}}>
      <Tabs
        value={selectedItem}
        onChange={handleChange}
        variant="fullWidth"
        scrollButtons="auto"
        textColor='secondary'
        indicatorColor='secondary'
        centered
      >
        <Tab label={text.program} style={{fontSize:"15px"}} />
        <Tab label={text.survey} style={{fontSize:"15px"}}/>
        <Tab label={text.anouncement} style={{fontSize:"15px"}} />
        <Tab label={text.multicultural_news} style={{fontSize:"15px"}}/>
      </Tabs>
    // </div>
    )
  if(lang==="en")
  return (
    // <div style={{width:"100%", position: "fixed", top:0, left: 0, zIndex:"99999999", backgroundColor:"white"}}>
      <Tabs
        value={selectedItem}
        onChange={handleChange}
        variant="fullWidth"
        scrollButtons="auto"
        textColor='secondary'
        indicatorColor='secondary'
        centered
      >
        <Tab label={text.program} style={{ fontSize: "14px" }} />
        <Tab label={text.survey} style={{ fontSize: "14px" }} />
        <Tab label={text.anouncement} style={{ fontSize: "11px" }}  />
        <Tab label={text.multicultural_news} style={{ fontSize: "10px" }} />
      </Tabs>
    // </div>
    )
  if( lang==="th")
  return (
    // <div style={{width:"100%", position: "fixed", top:0, left: 0, zIndex:"99999999", backgroundColor:"white"}}>
      <Tabs
        value={selectedItem}
        onChange={handleChange}
        variant="fullWidth"
        scrollButtons="auto"
        textColor='secondary'
        indicatorColor='secondary'
        centered
      >
        <Tab label={text.program} style={{ fontSize: "14px" }} />
        <Tab label={text.survey} style={{ fontSize: "14px" }} />
        <Tab label={text.anouncement} style={{ fontSize: "14px" }}  />
        <Tab label={text.multicultural_news} style={{ fontSize: "10px" }} />
      </Tabs>
    // </div>
    )
  if (lang === "vi")
  return (
    // <div style={{width:"100%", position: "fixed", top:0, left: 0, zIndex:"99999999", backgroundColor:"white"}}>
      <Tabs
        value={selectedItem}
        onChange={handleChange}
        variant="fullWidth"
        scrollButtons="auto"
        textColor='secondary'
        indicatorColor='secondary'
        centered
      >
        <Tab label={text.program} style={{ fontSize: "12px" }} />
        <Tab label={text.survey} style={{ fontSize: "12px" }} />
        <Tab label={text.anouncement} style={{ fontSize: "14px" }}  />
        <Tab label={text.multicultural_news} style={{ fontSize: "10px" }} />
      </Tabs>
    // </div>
    )
}

export default HomeHeader