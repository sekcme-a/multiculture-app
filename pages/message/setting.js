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
      <PageHeader text="????????? ??????" />
      <div className={styles.profile_container}>
        <div className={styles.logo_container}>
          <Image src="/logo_simple.png" width={50} height={50} alt="????????? ??????" />
        </div>
        <div className={styles.text_container}>
          <h1>????????? ?????????</h1>
          <p>????????? ?????? ???????????? ????????????, ????????? ?????????????????????.</p>
        </div>
      </div>

      <div className={styles.content_container}>
        <h2>????????? ?????? ??????</h2>
        <div className={styles.item_container}>
          <p>{checked.isAlarmOn ? "????????? ??????" : "????????? ?????? ??????"}</p>
          <Switch onChange={(e) => { onCheckedChange("isAlarmOn", e) }} checked={checked.isAlarmOn} />
        </div>
      </div>

      {checked.isAlarmOn &&
        <>
          <div className={styles.content_container}>
            <h2>?????? ????????? ??????</h2>
            <div className={styles.item_container}>
              <p>???????????????</p>
              <Switch onChange={(e) => { onCheckedChange("marriage", e) }} checked={checked.marriage} />
            </div>
            <div className={styles.item_container}>
              <p>?????????</p>
              <Switch onChange={(e) => { onCheckedChange("spouse", e) }} checked={checked.spouse} />
            </div>
            <div className={styles.item_container}>
              <p>??????</p>
              <Switch onChange={(e) => { onCheckedChange("children", e) }} checked={checked.children} />
            </div>
            <div className={styles.item_container}>
              <p>??????</p>
              <Switch onChange={(e) => { onCheckedChange("family", e) }} checked={checked.family} />
            </div>
          </div>

          <div className={styles.content_container}>
            <h2>?????? ?????? ??????</h2>
            <div style={{height:"22px"}} />
            <div style={{width:"95%"}}>
              
              <MultipleSelectCheck title="?????? ??????" items={groups} setSelectedItems={setSelectedGroups} selectedItems={selectedGroups} />
            </div>
            <div style={{height:"18px"}} />
          </div>  
        

          <div className={styles.content_container}>
            <h2>?????? ?????? ??????</h2>
            <div className={styles.item_container}>
              <p>???????????? ?????? ?????????</p>
              
              <Switch onChange={(e) => { onCheckedChange("schedule", e) }} checked={checked.schedule} />
            </div>
          </div>  
        </>
      }
      <div style={{width:"100%", display:"flex", justifyContent:"center"}}>
        <Button onClick={onSubmitClick} style={{fontSize:"17px", width:"90%", marginTop:"20px"}} variant="outlined">??? ???</Button>
      </div>

      <BackdropLoader title="??????" buttonText="??????" openBackdrop={openBackdrop} setOpenBackdrop={setOpenBackdrop} submitted={submitted} text="?????????????????????."/>
    </div>
  )
}

export default MyPageProfile