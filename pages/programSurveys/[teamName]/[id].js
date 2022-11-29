import ShowSurvey from "src/components/public/ShowSurvey"
import { useEffect, useState } from "react"
import styles from "styles/showArticle.module.css"
import { useRouter } from "next/router"

import useAuth from "src/hooks/auth/auth"
import useUserData from "src/context/useUserData"


import { firebaseHooks } from "firebase/hooks"

import CircleLoader from "src/components/loader/CircleLoader"


const Survey = () => {
  const router = useRouter()
  const { teamName, id } = router.query;
  const [data, setData] = useState()
  const [isLoading, setIsLoading] = useState(true)


  useEffect(() => {
    const fetchData = async () => {
      const result = await firebaseHooks.fetch_content_from_id("programSurveys", teamName, id)
      setData(result)
      setIsLoading(false)
    }
    fetchData()
  }, [])


  if (isLoading)
    return (
      <div className={styles.loader}>
        <CircleLoader />
      </div>
    )
  
  return (
    <>
      <ShowSurvey data={data} teamName={teamName} id={id} type="programSurveys" />
    </>
  )
}
export default Survey