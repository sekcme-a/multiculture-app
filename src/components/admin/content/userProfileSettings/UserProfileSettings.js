import { useState, useEffect } from "react";
import styles from "styles/components/admin/content/userProfileSettings.module.css"

import { firebaseHooks } from "firebase/hooks";

import PageHeader from "../../public/PageHeader";
import CustomForm from "src/components/public/CustomForm.js"
import AlertComponent from "src/components/public/Alert";
import LoaderGif from "src/components/loader/LoaderGif";
  

import Button from '@mui/material/Button'


const UserProfileSettings = () => {
  const [mainFormData, setMainFormData] = useState([])
  const [subFormData, setSubFormData] = useState([])
  const [controlAlert, setControlAlert] = useState({
    isShow: false,
    mode: "success",
    text: ""
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resultMain = await firebaseHooks.get_data_from_collection("profileSettings", "main")
        const resultSub = await firebaseHooks.get_data_from_collection("profileSettings", "sub")
        if(resultMain)
          setMainFormData(resultMain.data)
        if (resultSub)
          setSubFormData(resultSub.data)
        console.log(resultMain.data)
        setIsLoading(false)
      } catch (e) {
        console.log(e)
      }
      
    }
    fetchData()
  },[])

  const onSubmitClick = async() => {
    const result = await firebaseHooks.set_object_to_firestore_collection({data: mainFormData}, "profileSettings", "main")
    const result2 = await firebaseHooks.set_object_to_firestore_collection({data: subFormData}, "profileSettings", "sub")
    console.log(result2)
    if (result === "success") {
      setControlAlert({...controlAlert, isShow: true, mode: "success", text:"성공적으로 적용되었습니다."})
      setTimeout(() => {
        setControlAlert({...controlAlert, isShow: false})
      },2000)
    }
    else {
      setControlAlert({ ...controlAlert, isShow: true, mode: "error", text: `적용 실패 : ${result}` })
      console.log(result)
      setTimeout(() => {
        setControlAlert({...controlAlert, isShow: false})
      },2000)
    }
  }

  if(isLoading) return <LoaderGif />
  return (
    <div className={styles.main_container}>
      <div style={{display: "flex", flexWrap:"wrap",width:"100%", alignItems:"center", justifyContent:"space-between"}}>
        <div style={{width:"50%"}}>
          <PageHeader title="메인정보" subtitle="사용자가 입력가능한 프로필 정보를 설정하세요. 프로필에 바로 위치하게 됩니다." mt="10px" height="30px" />
          <PageHeader subtitle="마우스를 아이템에 누르고 있으면 위치를 이동시킬 수 있습니다." mt="-10px" height="30px" />
        </div>
        <div>
          <Button variant="contained" style={{backgroundColor: "purple", fontWeight: "bold"}} onClick={onSubmitClick}>적 용</Button>
        </div>
      </div>
      <CustomForm formData={mainFormData} setFormData={setMainFormData} />

      <PageHeader title="부가정보" subtitle="사용자가 입력가능한 프로필 부가정보를 설정하세요. 프로필의 추가정보란에 위치하게 됩니다." mt="30px" height="30px" />
      <CustomForm formData={subFormData} setFormData={setSubFormData} />
       <AlertComponent control={controlAlert} />
    </div>
  )
}
export default UserProfileSettings