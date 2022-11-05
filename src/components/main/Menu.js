import { useState, useEffect } from "react"
import styles from "styles/main/menu.module.css"
import { useRouter } from "next/router";

import { AnimatePresence, motion } from "framer-motion"

import useAuth from "src/hooks/auth/auth";
import useUserData from "src/context/useUserData";

import MailOutlineIcon from '@mui/icons-material/MailOutline';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Button from '@mui/material/Button';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';

import MenuItemsContainer from "src/components/main/MenuItemsContainer"

import Diversity2OutlinedIcon from '@mui/icons-material/Diversity2Outlined';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import AodOutlinedIcon from '@mui/icons-material/AodOutlined';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import NotListedLocationOutlinedIcon from '@mui/icons-material/NotListedLocationOutlined';
import DeviceUnknownOutlinedIcon from '@mui/icons-material/DeviceUnknownOutlined';
import NewspaperOutlinedIcon from '@mui/icons-material/NewspaperOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import ContactPageOutlinedIcon from '@mui/icons-material/ContactPageOutlined';
import DocumentScannerOutlinedIcon from '@mui/icons-material/DocumentScannerOutlined';
import { firebaseHooks } from "firebase/hooks";


const Menu = (props) => {
  const [text, setText] = useState("")
  const [menuItems, setMenuItems] = useState([])
  const { user, logout } = useAuth()
  const { language, fetchText } = useUserData()
  const {groups, setGroups} = useUserData()
  const router = useRouter()
  const onCloseMenuClick = () => {
    props.setIsHide(false)
    props.handleIsMenuOpen(false)
  }

  useEffect(() => {
    const fetchData = async (lang) => {
      const txt1 = await fetchText("hello", lang)
      const txt2 = await fetchText("please_register_your_email", lang)
      const txt3 = await fetchText("please_log_in_for_more_information_and_participation_in_the_program", lang)
      const txt4 = await fetchText("contact", lang)
      const txt5 = await fetchText("contact_center", lang)
      const txt6 = await fetchText("contact_app", lang)
      const txt7 = await fetchText("program", lang)
      const txt8 = await fetchText("survey", lang)
      const txt9 = await fetchText("anouncement", lang)
      const txt10 = await fetchText("app_information", lang)
      const txt11 = await fetchText("multicultural_news", lang)
      const txt = {
        hello: txt1,
        please_register_your_email: txt2,
        please_log_in_for_more_information_and_participation_in_the_program: txt3,
        contact: txt4,
        contact_center: txt5,
        contact_app: txt6,
        program: txt7,
        survey: txt8,
        anouncement: txt9,
        app_information: txt10,
        multicultural_news: txt11
      }
      setText({...txt})

      const iconStyle={color: "#814ad8"}
      let programData = []
      let surveyData = []
      let noticeData = []
      // let programData = [{ icon: <PublicOutlinedIcon style={iconStyle}/>, text: "전체" },]
      // let surveyData = [{ icon: <PublicOutlinedIcon style={iconStyle}/>, text: "전체" },]
      // let noticeData = [{ icon: <PublicOutlinedIcon style={iconStyle}/>, text: "전체" }]
      let groupsList = groups
      if (groupsList.length === 0) {
        const result = await firebaseHooks.fetch_team_list()
        setGroups(result)
        groupsList = result
      }
      groupsList.forEach((group) => {
        programData.push({
          icon: <Diversity2OutlinedIcon style={iconStyle} />, text: group.name, path: `/home/program/${group.id}`
        })
        surveyData.push({
          icon: <AodOutlinedIcon style={iconStyle}/>, text: group.name, path:`/home/survey/${group.id}`
        })
        noticeData.push({
          icon: <CampaignOutlinedIcon style={iconStyle}/>, text: group.name, path:`/home/anouncement/${group.id}`
        })
          
      })
      setMenuItems(
        [
          {
            title: txt.program,
            data: programData,
            
          },
          {
            title: txt.survey,
            data: surveyData,
            
          },
          {
            title: txt.anouncement,
            data: noticeData,
            
          },
          {
            title: txt.contact,
            data: [
              { icon: <SupportAgentOutlinedIcon style={iconStyle} />, text: txt.contact_center, path:"contact/center" },
              { icon: <DeviceUnknownOutlinedIcon style={iconStyle} />, text: txt.contact_app, path:"contact/app"},
            ]
          },
          {
            title: txt.app_information,
            data: [
              { icon: <NewspaperOutlinedIcon style={iconStyle} />, text: txt.multicultural_news, path:"/home/multiculturalNews/main" },
              { icon: <SupportAgentOutlinedIcon style={iconStyle} />, text: "도움말", path:"/info/faq" },
              { icon: <DocumentScannerOutlinedIcon style={iconStyle} />, text: "서비스이용약관", path:"/info/service" },
              { icon: <ContactPageOutlinedIcon style={iconStyle} />, text: "개인정보처리방침", path:"/info/private"},
            ]
          },
        ]
      )
    }
    fetchData(language)
  },[groups,language])

  
  const onLoginClick = () => {
    router.push("/login")
  }



  const onProfileClick = () => {
    router.push("/myPage")
  }

  if(text)
  return (
    <AnimatePresence>
      {props.isMenuOpen &&
        <motion.div
          key="modal"
          className={props.isMenuOpen ? styles.main_container : `${styles.main_container} ${styles.hide}`}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, transition: { duration: .5, }, x: 0 }}
          exit={{ opacity: 0, x: 40, transition: { duration: .5, } }}
        >

          <div className={styles.header_container}>
            <div className={styles.button_container}>
              <div>
                <CloseRoundedIcon onClick={onCloseMenuClick} style={{ fontSize: "27px", color: "#EEEEEE" }} />
              </div>
              <div>
                <MailOutlineIcon style={{ fontSize: "27px", marginRight: "10px" , color: "#EEEEEE"}}/>
                <SettingsOutlinedIcon style={{ fontSize: "27px" , color: "#EEEEEE"}}/>
              </div>
            </div>
              {user ?
                <div className={styles.profile_container} onClick={onProfileClick}>
                  <div className={styles.profile}>
                    <h1>{text.hello} {user.displayName} {language==="ko" && "님"}</h1>
                    <p>{user.email ? user.email : text.please_register_your_email}</p>
                  </div>
                  <ArrowForwardIosRoundedIcon />
                </div>
                :
                <div className={styles.login_container}>
                  <p>더 많은 정보와 프로그램 참여를 위해 로그인 해 주세요.</p>
                  {/* <p>{text.please_log_in_for_more_information_and_participation_in_the_program}</p> */}
                  <Button variant="outlined" style={{width:"90%", color:"white", border: "1px solid white"}} onClick={onLoginClick}>로그인</Button>
                </div>
              }
          </div>
          <MenuItemsContainer items={menuItems}  />
          
        </motion.div>
      }
    </AnimatePresence>
  )
}

export default Menu