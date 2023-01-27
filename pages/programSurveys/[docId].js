import ShowSurvey from "src/components/public/ShowSurvey"
import { useEffect, useState } from "react"
import styles from "styles/showArticle.module.css"
import { useRouter } from "next/router"

import useAuth from "src/hooks/auth/auth"
import useUserData from "src/context/useUserData"

import { firestore as db } from "firebase/firebase"


import { firebaseHooks } from "firebase/hooks"

import CircleLoader from "src/components/loader/CircleLoader"


const ProgramSurvey = () => {
  const router = useRouter()
  const { docId } = router.query;
  const [data, setData] = useState()
  const [isLoading, setIsLoading] = useState(true)


  useEffect(() => {
    const fetchData = async () => {
      const result = await db.collection("programSurvey").doc(docId).get()
      setData(result.data())
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
      <ShowSurvey data={data} teamName="" id={docId} type="programSurvey" />
    </>
  )
}
export default ProgramSurvey