import { useEffect, useState } from "react"
import styles from "styles/components/admin/content/program.module.css"
import { useRouter } from "next/router"

import LoaderGif from "src/components/loader/LoaderGif";

import useAuth from "src/hooks/auth/auth"
import useUserData from "src/context/useUserData"

import { firebaseHooks } from "firebase/hooks"
import { firestore as db } from "firebase/firebase";

import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const Survey = ({teamName}) => {
  const router = useRouter()
  const { user } = useAuth()
  const { language } = useUserData()
  const [programList, setProgramList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [triggerFetch, setTriggerFetch] = useState(true)


  useEffect(() => {
    const fetchData = async () => {
      const result = await firebaseHooks.fetch_contents_list(teamName, "surveys", 100, true)
      setProgramList([...result])
      setIsLoading(false)
    }
    fetchData()
  }, [triggerFetch])

  const onNewProgramClick = async () => {
    const id = await firebaseHooks.get_random_id_from_collection("contents")
    router.push(`/admin/content/surveys/${id}`)
  }

  const onProgramClick = (id) => {
    router.push(`/admin/content/surveys/${id}`)
  }

  const onDeleteClick = (id, hasSurvey, surveyId) => {
    try {
      db.collection("contents").doc(teamName).collection("surveys").doc(id).delete()
      alert("성공적으로 삭제되었습니다.")
      setTriggerFetch(!triggerFetch)
    } catch (e) {
      alert(e)
      console.log(e)
    }

  }

  if (isLoading) return <LoaderGif />
  
  return (
    <div className={styles.main_container}>
      <Grid container spacing={2}>
        
        <Grid item xs={3}>
          <Card>
            <CardContent sx={{ pt: 10, display: 'flex', alignItems: 'center', flexDirection: 'column', height: "265px", cursor: "pointer" }}
              onClick={onNewProgramClick}>
              <Typography variant='h3' sx={{ mt: 2 , color: "blue"}} textTransform="capitalize">
                +
              </Typography>
              <Typography variant='h6' sx={{ mt: 2 , color: "blue"}} textTransform="capitalize">
                새 설문조사
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        {programList.map((program, index) => {
          const savedDate = program.savedDate.toDate().toLocaleString('ko-kr').replace(/\s/g, '');
          const publishedDate = program.publishedDate?.toDate().toLocaleString('ko-kr').replace(/\s/g, '');
          return(
            <Grid item xs={3} key={index}>
              <Card style={{minHeight:"370px", display: "flex", alignItems:"center"}}>
                <CardContent sx={{ padding:"14px 10px 0px 10px", display: 'flex', alignItems: 'center', position:"relative", flexDirection: 'column', cursor: "pointer" }}
                  onClick={() => onProgramClick(program.id)}>
                  {program.published ? <div className={styles.published}>게재중</div> : <div className={styles.unpublished}>미게재</div>}
                  <div className={styles.delete} onClick={()=>onDeleteClick(program.id, program.hasSurvey, program.surveyId)}><DeleteOutlineOutlinedIcon /></div>
                  <img width={200} height={200} src={program.thumbnailImg} />
                  <Typography variant='h6' sx={{ mt: 1 , color: "#222",textAlign:"center", wordBreak:"keep-all", fontSize:"18px",fontWeight:"bold", lineHeight:"18px"}} textTransform="capitalize">
                    {program.title}
                  </Typography>
                  <Typography sx={{ mt: 1 , color: "#444", textAlign:"center", fontSize:"13px", lineHeight:"16px", wordBreak:"keep-all"}}>
                    {program.subtitle}
                  </Typography>
                  <Typography sx={{ mt: "5px" , color: "#444", fontSize:"11px", textAlign:"center"}} textTransform="capitalize">
                    마지막 수정: {savedDate}
                  </Typography>
                  {program.published && <p style={{fontSize:"11px"}}>게재일: {publishedDate}</p>}
                </CardContent>
              </Card>
            </Grid>
          )
        })}
      </Grid>
    </div>
  )
}

export default Survey