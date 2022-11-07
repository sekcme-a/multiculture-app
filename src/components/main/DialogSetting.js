import { useState, useEffect } from "react"

import { firebaseHooks } from "firebase/hooks";
import { firestore as db } from "firebase/firebase";
import useAuth from "src/hooks/auth/auth";

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import AddTaskIcon from '@mui/icons-material/AddTask';
import styles from "styles/main/dialogSetting.module.css";

import { motion } from "framer-motion"

import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import PageHeader from "src/components/public/PageHeader"
import BackdropLoader from "src/components/loader/BackdropLoader";
import { AuthService } from "src/hooks/auth/AuthService";

const DialogSetting = ({isShow, handleShow, text}) => {
  const [isSubmitting, setIsSubmitting] = useState(true)
  const [teamList, setTeamList] = useState([])
  const [city, setCity] = useState("");
  const [step, setStep] = useState(1)
  const { user, updateUserProfile } = useAuth()
  const [openPrivate, setOpenPrivate] = useState(false)
  const [privateText, setPrivateText] = useState("")
  const [openBackdrop, setOpenBackdrop] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [values, setValues] = useState({
    name: user.displayName,
    realName: "",
    phoneNumber: "",
  })
  const onValuesChange = (prop) => (event) => {
    if (error.id === prop) {
      setError({ id: "", text: "" })
    }
    setValues({ ...values, [prop]: event.target.value });
  };
  const [error, setError] = useState({
    id: "",
    errorText:"",
  })

  // const onBackdropClick = () => {
  //   setOpenBackdrop(false)
  // }
  useEffect(() => {
    const fetchData = async () => {
      const result_team_list = await firebaseHooks.fetch_team_list()
      setTeamList(result_team_list)
    }
    fetchData()
  }, [])


  
  const onNextClick = () => {
    if (step === 1) {
      if (city !== "") {
        setStep(step + 1)
        db.collection("users").doc(user.uid).update({ city: city })
        localStorage.setItem("city", city)
      } else {
        setError({
          id: "city", text: "지역을 선택해주세요."
        })
      }
    } else {
      setStep(step + 1)
      setSubmitted(false)
      setOpenBackdrop(true)
      if (values.name === "" || values.name === " ") {
        setError({
          id: "name", text: "닉네임은 빈칸일 수 없습니다."
        })
      } else if (values.realName === "" || values.realName === " ") {
        setError({
          id: "realName", text: "실명은 빈칸일 수 없습니다."
        })
      } else {
        updateUserProfile({displayName: values.name})
        db.collection("users").doc(user.uid).update({
          name: values.name,
          realName: values.realName,
          phoneNumber: values.phoneNumber,
        }).then(
          setSubmitted(true)
        )
      }
    }
  }
  const onNextTimeClick = () => {
    setStep(step + 1)
    setSubmitted(true)
    setOpenBackdrop(true)
  }

  const onPrivateClick = async () => {
      const data = await db.collection("setting").doc("private").get()
      if (data.exists) {
        setPrivateText(data.data().text)
        setOpenPrivate(true)
      }
  }
  const createMarkup = () => {
    return {__html: privateText}
  }

  const handleBackdrop = (bool) => {
    if (!bool) {
      setOpenBackdrop(false)
      handleShow(false)
    }
  }

  return (
    <Backdrop
      sx={{ color: 'white', zIndex: (theme) => theme.zIndex.drawer + 1, display:"flex", justifyContent:"center" }}
      open={isShow}
    >
      <div className={styles.backdrop_container}>
        {step === 1 &&
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 1.0 } }}
            style={{ width: "100%", textAlign: "center" }}>
            <div className={styles.alarm_container}>
              <h1>안녕하세요</h1>
              <h2>{`더한다를 설치해주셔서 감사합니다 :)`}<br />
                살고있는 지역이나 관심있는 지역을 선택해주세요!
              </h2>
              <div className={styles.team_select}>
                <TextField
                  id="standard-select-currency"
                  select
                  label="지역 선택"
                  value={city}
                  onChange={(e) => { setCity(e.target.value); setError({id:"", text:""}) }}
                  helperText={error.id === "city" ? error.text : "해당 지역의 컨텐츠가 제일 먼저 표시됩니다."}
                  variant="standard"
                  style={{ width: "100%" }}
                  error={error.id==="city"}

                >
                  {teamList.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <h3 onClick={onNextClick}>{`다음으로 >`}</h3>
            </div>
          </motion.div>
        }
        {step === 2 && !openPrivate && 
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 1.0 } }}
            style={{ width: "100%", textAlign: "center" }}>
            <div className={styles.alarm_container}>
              <h1>기본 정보 설정</h1>
              <h2>더 나은 컨텐츠 제공을 위해서<br />기본 정보를 입력해주세요!
              </h2>
              <div className={styles.single_checkbox_container} >
                <TextField multiline id='textarea-outlined' placeholder={error.text} label="닉네임" variant="standard" error={error.id==="name"}
                  style={{ width: "100%", marginTop: "12px" }} value={values.name} onChange={onValuesChange("name")} />
              </div> 
              <div className={styles.single_checkbox_container}>
                <TextField multiline id='textarea-outlined' label="실명" variant="standard" placeholder={error.id === "realName" ? error.text : "실명을 작성해주세요."} error={error.id==="realName"}
                  style={{ width: "100%", marginTop: "12px" }} value={values.realName} onChange={onValuesChange("realName")} />
              </div> 
              <div className={styles.single_checkbox_container}>
                <TextField multiline id='textarea-outlined' label="전화번호" variant="standard" placeholder="010-xxxx-xxxx"
                  style={{ width: "100%", marginTop: "12px" }} value={values.phoneNumber} onChange={onValuesChange("phoneNumber")} />
              </div> 

              <p>해당 정보는 안전하게 보관됩니다.</p>
              <p className={styles.private} onClick={onPrivateClick}>개인정보처리방침</p>
              <h5 onClick={onNextTimeClick}>다음에 입력</h5>
              <h4 onClick={onNextClick}>{`확인`}</h4>
            </div>
          </motion.div>
        }
        {openPrivate &&
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 1.0 } }} className={styles.private_container}>
            <CloseRoundedIcon className={styles.close_icon} onClick={()=>setOpenPrivate(false)} />
            <h1>개인정보처리방침</h1>
              <div className="quill_custom_editor" style={{marginTop:"35px"}}>
                <div dangerouslySetInnerHTML={createMarkup()} />
              </div>
          </motion.div>
        }
        {step === 3 &&
          <BackdropLoader openBackdrop={openBackdrop} setOpenBackdrop={handleBackdrop} submitted={submitted}
            title="감사합니다" text="작성해주셔서 감사합니다." buttonText="확인"
          />
        }
      </div>
    </Backdrop>
  )
}

export default DialogSetting