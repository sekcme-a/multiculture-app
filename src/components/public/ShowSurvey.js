import { useEffect, useState } from "react"
import styles from "styles/components/public/showSurvey.module.css"
import { useRouter } from "next/router"

import useAuth from "src/hooks/auth/auth"
import useUserData from "src/context/useUserData"
import { translate } from "src/hooks/translate"

import HeaderLeftClose from "src/components/public/HeaderLeftClose"
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

  const handleInputData = (data) => {
    setInputData([...data])
  }

  useEffect(() => {
    const fetchData = async (lang) => {
      setIsLoading(true)
      let subtitle = ""
      console.log(formData)
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
    }
    if(data)
      fetchData(language)
  }, [language])

  useEffect(() => {
    console.log(inputData)
  }, [inputData])
  
  const onApplyClick = async () => {
    setIsSubmitting(true)
    const result = await firebaseHooks.submit_form_input(user.uid, id, type, teamName, inputData)
    setIsSubmitting(false)
    router.push(`/thanks/${teamName}/${id}`)
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
    </div>
  )
}

export default ShowSurvey