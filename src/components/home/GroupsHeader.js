import { useEffect, useState } from "react"
// import styles from "styles/components/myPage/myPageProfile.module.css"
import { useRouter } from "next/router"

import useAuth from "src/hooks/auth/auth"
import useUserData from "src/context/useUserData"
import { translate } from "src/hooks/translate"
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import { firebaseHooks } from "firebase/hooks"


const GroupsHeader = ({ selectedItem, handleChange, groups }) => {
  const { language, fetchText } = useUserData()
  const [lang, setLang] = useState("")
  
  return (
      <Tabs
        value={selectedItem}
        onChange={handleChange}
        variant={groups.length < 5 ? "fullWidth" : "scrollable"}
        scrollButtons="auto"
        textColor='primary'
        indicatorColor='primary'
        centered
      >
        {groups.map((group, index) => {
          return (
            <Tab label={group.name} key={index} />
          )
        })}

      </Tabs>
    )
}

export default GroupsHeader