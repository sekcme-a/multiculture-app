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
        variant={groups.length < 4 ? "fullWidth" : "scrollable"}
        // variant="scrollable"
        scrollButtons="auto"
        textColor='secondary'
        indicatorColor='secondary'
        style={{backgroundColor:"rgb(248,248,248)"}}
          centered={groups.length<4}
      >
      {groups.map((group, index) => {
          return (
            <Tab label={group.name} id={group.id} key={group.id} style={{ fontSize: "15px", letterSpacing:"1px" }} />
          )
        })}

      </Tabs>
    )
}

export default GroupsHeader