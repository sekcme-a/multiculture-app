import { useEffect, useState } from "react"
import styles from "styles/components/public/showSurvey.module.css"
import { useRouter } from "next/router"
import { motion } from "framer-motion"

import useAuth from "src/hooks/auth/auth"
import useUserData from "src/context/useUserData"
import { translate } from "src/hooks/translate"

import HeaderLeftClose from "src/components/public/HeaderLeftClose"
import BackdropLoader from "src/components/loader/BackdropLoader"

import CircularProgress from '@mui/material/CircularProgress';
import AddTaskIcon from '@mui/icons-material/AddTask';
import Backdrop from '@mui/material/Backdrop';
import Button from '@mui/material/Button';
import Form from "src/form/Form.js"
import { firebaseHooks } from "firebase/hooks"
import CircleLoader from "src/components/loader/CircleLoader"



const ShowSurvey = ({data, teamName, id, type}) => {
  const router = useRouter()
  const { user } = useAuth()
  const { language, fetchText } = useUserData()
  const [isLoading, setIsLoading] = useState(true)
  const [text, setText] = useState()
  const [formData, setFormData] = useState()
  const [inputData, setInputData] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [openBackdrop, setOpenBackdrop] = useState(false)
  const [backdropValue, setBackdropValue] = useState({
    openBackdrop: false,
    submitted: true,
    title: "알림",
    text: "",
    buttonText:"확인"
  })

  const handleInputData = (data) => {
    setInputData([...data])
  }

  useEffect(() => {
    const fetchData = async (lang) => {
      setIsLoading(true)
      let subtitle = ""
      const txt1 = await translate(data.title, "ko", lang)
      const txt2 = await fetchText("submit", lang)
      const txt3 = await fetchText("submitting", lang)
      let list = []
      setText({
        title: txt1,
        submit: txt2,
        submitting: txt3,
      })
      for (let i = 0; i < data.form.length; i++){
        if (data.form[i].title) {
          const txt = await translate(data.form[i].title, "ko", lang)
          list.push({...data.form[i], title: txt})
        }
      }
      setFormData(list)
      setIsLoading(false)
      if (list.length === 0) {
        router.push(`/thanks/${teamName}/${id}`)
        return
      }
    }
    if(data)
      fetchData(language)
  }, [language])
  
  const onApplyClick = async () => {
    setIsSubmitting(true)
    console.log(inputData)
    console.log(formData)
    for (const formItem of formData) {
      if (formItem.isRequired) {
        let hasValue=false
        for (const inputItem of inputData) {
          if(inputItem.id===formItem.id)
            hasValue=true
        }
        if (!hasValue) {
          setBackdropValue({
            openBackdrop: true,
            submitted: true,
            title: "알림",
            text: `${formItem.title}은(는) 필수항목입니다.`,
            buttonText:"확인"
          })
          setIsSubmitting(false)
          return
        }
      }
    }
    setOpenBackdrop(true)
    const result = await firebaseHooks.submit_form_input(user.uid, id, type, teamName, inputData)
    const res = await firebaseHooks.add_timeline(
      user.uid,
      "programs",
      new Date(),
      `"${data.title}" 프로그램 신청`,
      `사용자가 [프로그램: ${data.title}]을(를) 신청했습니다.`,
      id
    )
    setIsSubmitting(false)
    // router.push(`/thanks/${teamName}/${id}`)
  }
  
  const onBackdropClick = () => {
    //제출 완료 후 backdrop 클릭시 메인화면으로 이동
    if (!isSubmitting) {
      router.push("/")
    } else {
      setOpenBackdrop(false)
    }
  }

  if (text!==undefined && isLoading)
    return(
      <div className={styles.main_container}>
        <HeaderLeftClose title={text.title} />
        <div className={styles.content_container}>
          <CircleLoader />
        </div>
      </div>
    )  
  else if(text!==undefined)
  return(
    <div className={styles.main_container}>
      <HeaderLeftClose title={text.title} />
      <div className={styles.content_container}>
          <Form formDatas={formData} data={inputData} handleData={handleInputData} addMargin={true} />
      </div>
      <div className={styles.button_container}>
        <Button variant="contained" className={styles.button} disabled={isSubmitting} onClick={onApplyClick}>
          {isSubmitting ? text.submitting : text.submit}
        </Button>
      </div>
      <BackdropLoader openBackdrop={backdropValue.openBackdrop}
        setOpenBackdrop={(value) => setBackdropValue({ ...backdropValue, ["openBackdrop"]: value })}
        submitted={backdropValue.submitted}
        title={backdropValue.title}
        text={backdropValue.text}
        buttonText={backdropValue.buttonText}
      />


      <Backdrop
        sx={{ color: 'white', zIndex: (theme) => theme.zIndex.drawer + 1, display:"flex", justifyContent:"center" }}
        open={openBackdrop}
        onClick={onBackdropClick}
      >
        <div className={styles.backdrop_container}>
          {isSubmitting ?
            <>
              <CircularProgress style={{'color': 'white'}} />
              <p>잠시만 기다려주세요...</p>
            </>
            :
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 1 } }}>
                <AddTaskIcon style={{ fontSize: "80px" }} />
              </motion.div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 1.2, delay:0.5 } }}
              style={{ width: "100%", textAlign: "center" }}>
                <h1>제출 성공!</h1>
                <h2>작성해주셔서 감사합니다.</h2>
              </motion.div>
            </>
          }
        </div>
      </Backdrop>
    </div>
  )
}

export default ShowSurvey