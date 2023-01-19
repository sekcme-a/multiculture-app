// ** React Imports
import { useState, useEffect } from 'react'
import { firestore as db } from 'firebase/firebase'
// ** MUI Imports
import Box from '@mui/material/Box'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import MuiTab from '@mui/material/Tab'
import Card from '@mui/material/Card'
import Timeline from "src/components/admin/content/userProfile/Timeline"

import Button from '@mui/material/Button';

import AddAlertIcon from '@mui/icons-material/AddAlert';
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';

// ** Icons Imports
import AccountOutline from 'mdi-material-ui/AccountOutline'
import TimelineIcon from '@mui/icons-material/Timeline';
// ** Demo Components Imports
import UserViewOverview from 'src/components/admin/content/userProfile/UserViewOverview'
import AlarmSettings from '../alarmSettings/AlarmSettings'

import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import Comments from 'src/components/admin/content/userProfile/Comments'

// ** Styled Tab component
const Tab = styled(MuiTab)(({ theme }) => ({
  minHeight: 48,
  flexDirection: 'row',
  '& svg': {
    marginBottom: '0 !important',
    marginRight: theme.spacing(3)
  }
}))

const UserViewRight = (props) => {
  // ** State
  const [value, setValue] = useState('overview')
  const [timeline, setTimeline] = useState([])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const [alarmValues, setAlarmValues] = useState({
    marriage: false,
    spouse: false,
    children: false,
    family: false,
    all: false,
  })
  const onAlarmValuesChange = (prop) => (event) => {
    if (prop === "all")
      if(event.target.checked)
        setAlarmValues({marriage: true,spouse: true,children: true,family: true,all: true,})
      else
        setAlarmValues({marriage: false,spouse: false,children: false,family: false,all: false,})
    else
      setAlarmValues({...alarmValues, [prop]: event.target.checked})
  }

  const onSubmitClick = () => {
    db.collection("users").doc(props.uid).update({centerAlarm: alarmValues})
    alert("적용되었습니다.")
  }

  useEffect(() => {
    let list = []
    db.collection("users").doc(props.uid).collection("timeline").orderBy("createdAt", "desc").get().then((query) => {
      query.docs.map((doc) => {
        list.push({...doc.data()})
      })
      setTimeline(list)
    })
    db.collection("users").doc(props.uid).get().then((doc) => {
      if (doc.data().centerAlarm) 
        setAlarmValues(doc.data().centerAlarm)
      
    })
  },[])

  return (
    <TabContext value={value} >
      <TabList
        variant='scrollable'
        scrollButtons='auto'
        onChange={handleChange}
        aria-label='forced scroll tabs example'
      >
        <Tab value='overview' label='Overview' icon={<AccountOutline />} />
        <Tab value='timeline' label='Timeline' icon={<TimelineIcon />} />
        <Tab value='alarmSetting' label='AlarmSetting' icon={<AddAlertIcon />} />
        <Tab value='comments' label="Comments" icon={<SummarizeOutlinedIcon />} />
        {/* <Tab value='security' label='Security' icon={<LockOutline />} />
        <Tab value='billing-plan' label='Billing & Plan' icon={<BookmarkOutline />} />
        <Tab value='notification' label='Notification' icon={<BellOutline />} />
        <Tab value='connection' label='Connection' icon={<LinkVariant />} /> */}
      </TabList>
      <Box sx={{ mt: 2 }} >
        <TabPanel sx={{ p: 0 }} value='overview' >
          <Card>
            <UserViewOverview profile_settings={props.profile_settings} additional_data={props.additional_data} />
          </Card>
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='timeline'>
          <Card sx={{padding: "10px 20px"}}>
            <Timeline
              timeline={timeline} uid={props.uid} />
          </Card>
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='alarmSetting'>
          <Card sx={{padding: "10px 20px"}}>
                  <div style={{marginTop: "15px"}}>
              <p>해당 사용자의 분류를 선택해주세요. {`(분류에 따라 알림이 전송됩니다.)`} <Button style={{fontSize: "16px"}} onClick={onSubmitClick}>적용</Button></p>
              <p style={{fontSize:"14px"}}>{`(해당 사용자의 알림이 꺼져있다면 알림이 보내지지 않습니다.)`} </p>
              
               <div style={{marginTop: "20px"}}/>
                    <FormControlLabel control={<Switch checked={alarmValues.marriage} onChange={onAlarmValuesChange("marriage")} />} label="결혼이민자" />
                    <FormControlLabel control={<Switch checked={alarmValues.spouse} onChange={onAlarmValuesChange("spouse")} />} label="배우자" />
                    <FormControlLabel control={<Switch checked={alarmValues.children} onChange={onAlarmValuesChange("children")} />} label="자녀" />
                    <FormControlLabel control={<Switch checked={alarmValues.family} onChange={onAlarmValuesChange("family")} />} label="가족" />
                    <FormControlLabel control={<Switch checked={alarmValues.all} onChange={onAlarmValuesChange("all")} />} label="전체" />
                  </div>
          </Card>
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='comments'>
          <Comments uid={props.uid}/>
        </TabPanel>
        {/* <TabPanel sx={{ p: 0 }} value='billing-plan'>
          <UserViewBilling />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='notification'>
          <UserViewNotification />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='connection'>
          <UserViewConnection />
        </TabPanel> */}
      </Box>
    </TabContext>
  )
}

export default UserViewRight
