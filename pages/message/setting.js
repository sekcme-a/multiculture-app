import { useEffect, useState } from "react"
import styles from "styles/message/setting.module.css"
import { useRouter } from "next/router"
import Image from "next/image"

import useAuth from "src/hooks/auth/auth"
import useUserData from "src/context/useUserData"
import { translate } from "src/hooks/translate"

import { firebaseHooks } from "firebase/hooks"
import { firestore as db } from "firebase/firebase"

import PageHeader from "src/components/public/PageHeader"
import MultipleSelectCheck from "src/components/public/mui/MultipleSelectCheck"
import BackdropLoader from "src/components/loader/BackdropLoader"

import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';

const MyPageProfile = () => {
  const router = useRouter()
  const { user } = useAuth()
  const { language, fetchText } = useUserData()
  const [groups, setGroups] = useState([])
  const [selectedGroups, setSelectedGroups] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [openBackdrop, setOpenBackdrop] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [checked, setChecked] = useState({
    isAlarmOn: true,
    marriage: true,
    spouse: true,
    children: true,
    family: true,
    schedule: true,
  })
  const onCheckedChange = (item, e) => {
    setChecked({ ...checked, [item]: e.target.checked })
    if (item==="isAlarmOn" && e.target.checked) {
      setChecked({
        isAlarmOn: true,
        marriage: true,
        spouse: true,
        children: true,
        family: true,
        schedule: true,
      })
    } else if(item==="isAlarmOn") {
      setChecked({
        isAlarmOn: false,
        marriage: false,
        spouse: false,
        children: false,
        family: false,
        schedule: false,
      })
    }
  }


  useEffect(() => {
    const fetchData = async () => {
      const doc = await db.collection("users").doc(user.uid).get()
      if (doc.exists) {
        setChecked({
          isAlarmOn: doc.data().isAlarmOn,
          marriage: doc.data().alarmSetting?.marriage,
          spouse: doc.data().alarmSetting?.spouse,
          children: doc.data().alarmSetting?.children,
          family: doc.data().alarmSetting?.family,
          schedule: doc.data().alarmSetting?.schedule,
        })
        setSelectedGroups(doc.data().alarmSetting?.center)
      }
      const groupList = await firebaseHooks.fetch_team_list()
      setGroups(groupList)
      setIsLoading(false)
    }
    if(user)
      fetchData()
    else
      router.push("/login")
  }, [])

  const onSubmitClick = () => {
    setSubmitted(false)
    setOpenBackdrop(true)
    db.collection("users").doc(user.uid).update({
      isAlarmOn: checked.isAlarmOn,
      alarmSetting: {
        marriage: checked.marriage,
        spouse: checked.spouse,
        children: checked.children,
        family: checked.family,
        schedule: checked.schedule,
        center: selectedGroups
      }
    }).then(
      setSubmitted(true)
    )
  }

  if (isLoading) return <></>

  return (
    <div className={styles.main_container}>
      <PageHeader text="메세지 설정" />
      <div className={styles.profile_container}>
        <div className={styles.logo_container}>
          <Image src="/logo_simple.png" width={50} height={50} alt="다한다 로고" />
        </div>
        <div className={styles.text_container}>
          <h1>더한다 도우미</h1>
          <p>이용자 맞춤 컨텐츠를 소개하고, 일정을 관리해드립니다.</p>
        </div>
      </div>

      <div className={styles.content_container}>
        <h2>메세지 알림 설정</h2>
        <div className={styles.item_container}>
          <p>{checked.isAlarmOn ? "메세지 받기" : "메세지 받지 않기"}</p>
          <Switch onChange={(e) => { onCheckedChange("isAlarmOn", e) }} checked={checked.isAlarmOn} />
        </div>
      </div>

      {checked.isAlarmOn &&
        <>
          <div className={styles.content_container}>
            <h2>받을 메세지 설정</h2>
            <div className={styles.item_container}>
              <p>결혼이민자</p>
              <Switch onChange={(e) => { onCheckedChange("marriage", e) }} checked={checked.marriage} />
            </div>
            <div className={styles.item_container}>
              <p>배우자</p>
              <Switch onChange={(e) => { onCheckedChange("spouse", e) }} checked={checked.spouse} />
            </div>
            <div className={styles.item_container}>
              <p>자녀</p>
              <Switch onChange={(e) => { onCheckedChange("children", e) }} checked={checked.children} />
            </div>
            <div className={styles.item_container}>
              <p>가족</p>
              <Switch onChange={(e) => { onCheckedChange("family", e) }} checked={checked.family} />
            </div>
          </div>

          <div className={styles.content_container}>
            <h2>알림 받을 센터</h2>
            <div style={{height:"22px"}} />
            <div style={{width:"95%"}}>
              
              <MultipleSelectCheck title="센터 선택" items={groups} setSelectedItems={setSelectedGroups} selectedItems={selectedGroups} />
            </div>
            <div style={{height:"18px"}} />
          </div>  
        

          <div className={styles.content_container}>
            <h2>일정 알림 설정</h2>
            <div className={styles.item_container}>
              <p>프로그램 일정 메세지</p>
              
              <Switch onChange={(e) => { onCheckedChange("schedule", e) }} checked={checked.schedule} />
            </div>
          </div>  
        </>
      }
      <div style={{width:"100%", display:"flex", justifyContent:"center"}}>
        <Button onClick={onSubmitClick} style={{fontSize:"17px", width:"90%", marginTop:"20px"}} variant="outlined">저 장</Button>
      </div>

      <BackdropLoader title="알림" buttonText="확인" openBackdrop={openBackdrop} setOpenBackdrop={setOpenBackdrop} submitted={submitted} text="변경되었습니다."/>
    </div>
  )
}

export default MyPageProfile