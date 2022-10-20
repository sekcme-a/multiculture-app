import { useEffect, useState } from "react"
import { useRouter } from "next/router";
import styles from "styles/admin/admin.module.css"
import Image from "next/image";

import { withProtected } from "src/hooks/auth/route"
import useAuth from "src/hooks/auth/auth";

import { firestore as db } from "firebase/firebase";

import NoAuthority from "src/components/admin/NoAuthority"

import LoaderGif from "src/components/loader/LoaderGif";
import Navbar from "src/components/admin/Navbar"
import Header from "src/components/admin/Header"
import Home from "src/components/admin/Home"
import AccountSettings from "src/components/admin/content/accountSettings/AccountSettings";
import ManageTeam from "src/components/admin/content/teamManagement/ManageTeam"
import UserList from "src/components/admin/content/userList/UserList";
import UserProfileSettings from "src/components/admin/content/userProfileSettings/UserProfileSettings";
import { firebaseHooks } from "firebase/hooks";
import UserViewLeft from "src/components/admin/content/userProfile/UserViewLeft";
import UserViewRight from "src/components/admin/content/userProfile/UserViewRight";
import Stepper from "src/components/public/Stepper"
import Grid from '@mui/material/Grid'


const User = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { user, userrole, setUserrole, setTeamName,teamName } = useAuth();
  const [datas, setDatas] = useState({
    user_data: "",
    user_additional_data: "",
    profile_settings: ""
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {

      setIsLoading(false)
    }

    if(user && slug)
      fetchData()
  }, [])

  // const noAuthority = () => {
  //   return <NoAuthority uid={user.uid} teamName={team_name} isTeamName={isTeamName} />
  // }


  if (isLoading)
    return (
      <LoaderGif mode="background"/>
    )
  
  // if (!userrole?.includes(`admin_${team_name}`) && !userrole?.includes("super_admin"))
  //   return noAuthority()

  return (
    <div className={styles.main_container}>
      <Navbar teamName={teamName} />
      <Header location="content" />
      <div className={styles.content_container}>
        <Stepper id={slug} teamName={teamName} type="programs"/>
      </div>
    </div>
  )
}

export default withProtected(User)