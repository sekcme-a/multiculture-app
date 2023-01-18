import { useEffect, useState } from "react"
import styles from "styles/components/myPage/myPageProfile.module.css"
import { useRouter } from "next/router"

import useAuth from "src/hooks/auth/auth"
import useUserData from "src/context/useUserData"
import { translate } from "src/hooks/translate"
import { fetchJob } from "api/job"
import Content from "src/components/job/Content"

const MyPageProfile = (props) => {
  const router = useRouter()
  const {id} = router.query
  const { user } = useAuth()
  const { language, fetchText } = useUserData()
  const [data, setData] = useState({})
  const [isLoading, setIsLoading]= useState(true)


  useEffect(() => {
    const fetchData = async () => {
        console.log(id)
        const data = await fetchJob.fetch_job_with_id(id)
        setData(data)
        setIsLoading(false)
    }
    fetchData()
  }, [])
  
  if(isLoading){
    return(
        <></>
    )
  }

  return (
    <>
        <Content data={data}/>
    </>
  )
}

export default MyPageProfile