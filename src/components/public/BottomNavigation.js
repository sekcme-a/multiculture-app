import {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import styles from "styles/components/public/footer.module.css"
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { useRouter } from 'next/router';
import useUserData from 'src/context/useUserData';
import useAuth from 'src/hooks/auth/auth';

const BottomNavigationComponent = () => {
  const { groups, setGroups, language, fetchText } = useUserData()
  const [value, setValue] = useState(0)
  const [text, setText] = useState()
  const router = useRouter()
  const { user } = useAuth()

  useEffect(() => {
    const fetchData = async (lang) => {
      const txt1 = await fetchText("message", lang)
      const txt2 = await fetchText("my_page", lang)
      const txt3 = await fetchText("menu", lang)
      const txt4 = await fetchText("back", lang)
      setText({
        message: txt1,
        my_page: txt2,
        menu: txt3,
        back: txt4,
      })
    }
    fetchData(language)
  },[language])

  const onBackClick = () => {
    router.back()
  }
  const onAlarmClick = () => {router.push("/alarm")}

  const onMyPageClick = () => {
    if (user)
      router.push("/myPage")
    else
      router.push("/login")
  }
  
  const onMenuClick = () => { router.push('/menu') }
  
  const onHomeClick = () => { router.push("/") }
  
  useEffect(() => {
    if(router.pathname==="/alarm")
      setValue(0)
    else if (router.pathname==="/myPage")
      setValue(1)
    else if (router.pathname==="/menu")
      setValue(4)
    else
      setValue(-1)
  },[router.pathname])

  if(text!==undefined)
  return (
    <div className={styles.main_container}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        style={{height: "65px"}}
      >
        <BottomNavigationAction onClick={onAlarmClick} label={text.message} icon={<EmailOutlinedIcon className={styles.icon} />}  />
        <BottomNavigationAction onClick={onMyPageClick} label={text.my_page} icon={<AccountCircleOutlinedIcon  className={styles.icon}/>} />
        <BottomNavigationAction label=" "  />
        <div className={styles.home_container} onClick={onHomeClick}>
          <BottomNavigationAction icon={<HomeOutlinedIcon className={styles.home_icon}/>} className={styles.home} />
        </div>
        <BottomNavigationAction onClick={onMenuClick} label={text.menu} icon={<MenuOutlinedIcon className={styles.icon} />} />
        <BottomNavigationAction label={text.back} onClick={onBackClick} icon={<KeyboardBackspaceOutlinedIcon className={styles.icon}/>} />
      </BottomNavigation>
    </div>
  );
}

export default BottomNavigationComponent