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



const Admin = () => {
  const router = useRouter();
  const { slug, team_name } = router.query;
  const { user, userrole, setUserrole, setTeamName } = useAuth();
  const [title, setTitle] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isTeamName, setIsTeamName] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const doc = await db.collection("users").doc(user.uid).get()
      setUserrole(doc.data()?.roles)
      const doc2 = await db.collection("admin_group").doc(team_name).get()
      setIsTeamName(doc2.exists)
      setTeamName(team_name)
      setIsLoading(false)
    }

    if(user)
      fetchData()
  }, [user])

  const noAuthority = () => {
    return <NoAuthority uid={user.uid} teamName={team_name} isTeamName={isTeamName} />
  }


  if (isLoading)
    return (
      <LoaderGif mode="background"/>
    )
  
  if (!userrole?.includes(`admin_${team_name}`) && !userrole?.includes("super_admin"))
    return noAuthority()

  return (
    <div className={styles.main_container}>
      <Navbar teamName={team_name} />
      <Header location={slug} />
      <div className={styles.content_container}>
        {
          slug === "home" ? <Home /> :
            slug === "profile" ? <AccountSettings /> :
              slug === "manageTeam" ? <ManageTeam /> :
          <></>
        }
      </div>
    </div>
  )
}

export default withProtected(Admin)