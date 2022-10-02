import { useEffect } from "react";
import { useRouter } from "next/router";
import styles from "styles/admin/hallway.module.css"

import useAuth from "src/hooks/auth/auth";

import AskTeam from "src/components/admin/hallway/AskTeam";


const Hallway = () => {
  const router = useRouter()
  const { user } = useAuth()
  useEffect(() => {
    if(user===null || user===undefined)
      router.push("/admin/login")
  }, [])
  if(user)
    return (
      <div className={styles.main_container}>
        <AskTeam />
      </div>  
    )
}

export default Hallway;