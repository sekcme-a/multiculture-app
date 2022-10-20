import { useEffect, useState } from "react"
import styles from "styles/components/admin/content/alarmSettings.module.css"
import { useRouter } from "next/router"

import useAuth from "src/hooks/auth/auth"
import useUserData from "src/context/useUserData"
import PageHeader from "src/components/admin/public/PageHeader"
import AddSetting from "src/components/admin/content/userProfileSettings/AddSetting"
import AddDialog from "src/components/admin/content/userProfileSettings/AddDialog"

import Dialog from '@mui/material/Dialog';

import { firebaseHooks } from "firebase/hooks"

import Button from '@mui/material/Button'

const AlarmSettings = () => {
  const router = useRouter()
  const { user } = useAuth()
  const { language } = useUserData()
  const [openDialog, setOpenDialog] = useState(false)


  useEffect(() => {
    const fetchData = async () => {
      
    }
    fetchData()
  }, [])

  const onSubmitClick = () => {

  }
  return (
    <>
      <div style={{display: "flex", flexWrap:"wrap",width:"100%", alignItems:"center", justifyContent:"space-between"}}>
        <div style={{width:"50%"}}>
          <PageHeader title="알람타입 설정" subtitle="어떤 사용자들에게 알람을 보낼지 알람타입을 설정해보세요." mt="10px" height="30px" />
          <PageHeader subtitle="사용자들도 알람 설정을 통해 원하는 분류의 알람을 받을 수 있습니다." mt="-10px" height="30px" />
        </div>
        <div>
          <Button variant="contained" style={{backgroundColor: "purple", fontWeight: "bold"}} onClick={onSubmitClick}>적 용</Button>
        </div>
        <AddSetting onAddClick={()=>setOpenDialog(true)} />
        <Dialog open={openDialog} onClose={()=>setOpenDialog(false)} maxWidth={"lg"} >
          
        </Dialog>
      </div>
    </>
  )
}

export default AlarmSettings