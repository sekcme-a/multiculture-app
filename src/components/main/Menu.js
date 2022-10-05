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


const Menu = (props) => {
  const [text, setText] = useState("")
  const [menuItems, setMenuItems] = useState([])
  const { user, logout } = useAuth()
  const {groups} = useUserData()
  const router = useRouter()
  const onCloseMenuClick = () => {
    props.setIsHide(false)
    props.handleIsMenuOpen(false)
  }

  useEffect(() => {
    const iconStyle={color: "#814ad8"}
    let programData = [{ icon: <PublicOutlinedIcon style={iconStyle}/>, text: "전체" },]
    let surveyData = [{ icon: <PublicOutlinedIcon style={iconStyle}/>, text: "전체" },]
    let noticeData = [{ icon: <PublicOutlinedIcon style={iconStyle}/>, text: "전체" }]
    console.log(groups)
    groups.forEach((group) => {
      programData.push({
        icon: <Diversity2OutlinedIcon style={iconStyle} />, text: group.name
      })
      surveyData.push({
        icon: <AodOutlinedIcon style={iconStyle}/>, text: group.name
      })
      noticeData.push({
        icon: <CampaignOutlinedIcon style={iconStyle}/>, text: group.name
      })
        
    })
    setMenuItems(
      [
        {
          title: "프로그램",
          data: programData
        },
        {
          title: "설문조사",
          data: surveyData
        },
        {
          title: "공지사항",
          data: noticeData
        },
        {
          title: '문의',
          data: [
            { icon: <SupportAgentOutlinedIcon style={iconStyle} />, text: "센터 문의" },
            { icon: <DeviceUnknownOutlinedIcon style={iconStyle} />, text: "어플 문의" },
          ]
        },
        {
          title: '어플 안내',
          data: [
            { icon: <NewspaperOutlinedIcon style={iconStyle} />, text: "다문화 소식" },
            { icon: <SupportAgentOutlinedIcon style={iconStyle} />, text: "FAQ" },
            { icon: <DocumentScannerOutlinedIcon style={iconStyle} />, text: "서비스이용약관" },
            { icon: <ContactPageOutlinedIcon style={iconStyle} />, text: "개인정보처리방침" },
          ]
        },
      ]
    )
  },[groups])

  useEffect(() => {
    setText(props.text)
  }, [props.text])
  
  const onLoginClick = () => {
    router.push("/login")
  }



  const onProfileClick = () => {
    router.push("/myPage")
  }
  
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
                    <h1>{text.hello} {user.displayName} {text.hello==="안녕하세요," && "님"}</h1>
                    <p>{user.email ? user.email : text.Please_register_your_email}</p>
                  </div>
                  <ArrowForwardIosRoundedIcon />
                </div>
                :
                <div className={styles.login_container}>
                  <p>{text.Please_log_in_for_more_information_and_participation_in_the_program}</p>
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