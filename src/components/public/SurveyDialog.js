import { useState, useEffect } from "react"

import { firebaseHooks } from "firebase/hooks";
import { firestore as db } from "firebase/firebase";
import useAuth from "src/hooks/auth/auth";

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import AddTaskIcon from '@mui/icons-material/AddTask';
import styles from "styles/main/dialogSetting.module.css";

import { useRouter } from "next/router";

import { motion } from "framer-motion"

import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import PageHeader from "src/components/public/PageHeader"
import BackdropLoader from "src/components/loader/BackdropLoader";
import { AuthService } from "src/hooks/auth/AuthService";

const DialogSetting = ({isShow, handleShow, text, path}) => {
  const { user, updateUserProfile } = useAuth()

  const router = useRouter()
  const [values, setValues] = useState({
    name: user.displayName,
    realName: "",
    phoneNumber: "",
  })

  // const onBackdropClick = () => {
  //   setOpenBackdrop(false)
  // }
  useEffect(() => {
    const fetchData = async () => {
    }
    fetchData()
  }, [])




  
  const onClick = () => {
    handleShow(false)
    router.push(path)
  }

  return (
    <Backdrop
      sx={{ color: 'white', zIndex: (theme) => theme.zIndex.drawer + 1, display:"flex", justifyContent:"center" }}
      open={isShow}
      onClick={()=>handleShow(false)}
    >
      <div className={styles.backdrop_container} >
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 1.0 } }}
            style={{ width: "100%", textAlign: "center" }}>
            <div className={styles.alarm_container}>
              <h1>안 내</h1>
              <h2>다른 프로그램을 신청하기 전에<br />
                이전에 참여한 프로그램 설문조사를 진행해주세요.
            </h2>
            
              <h3 onClick={onClick} style={{marginTop:"20px"}}>{`설문조사 진행하기`}</h3>
            </div>
          </motion.div>
      </div>
    </Backdrop>
  )
}

export default DialogSetting