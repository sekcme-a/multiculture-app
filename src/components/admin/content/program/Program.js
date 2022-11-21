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
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { styled, alpha } from '@mui/material/styles';

const options = [
  '삭제',
  '메인 프로그램으로 설정'
];

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.01) 0px 0px 0px 1px, rgba(0, 0, 0, 0.02) 0px 7px 10px -3px, rgba(0, 0, 0, 0.02) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));


const Program = ({teamName}) => {
  const router = useRouter()
  const { user } = useAuth()
  const { language } = useUserData()
  const [programList, setProgramList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [triggerFetch, setTriggerFetch] = useState(true)

    const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onMenuClick = (e,id, hasSurvey, surveyId) => {
    handleClose()
    console.log(e.target.outerText)
    if (e.target.outerText === "삭제") {
      console.log(id, hasSurvey, surveyId)
      // onDeleteClick(id, hasSurvey, surveyId)
    }
  }


  useEffect(() => {
    const fetchData = async () => {
      const result = await firebaseHooks.fetch_contents_list(teamName, "programs", 40, true)
      setProgramList([...result])
      setIsLoading(false)
    }
    fetchData()
  }, [triggerFetch])

  const onNewProgramClick = async () => {
    const id = await firebaseHooks.get_random_id_from_collection("contents")
    router.push(`/admin/content/programs/${id}`)
  }

  const onProgramClick = (id) => {
    router.push(`/admin/content/programs/${id}`)
  }

  const onDeleteClick = (id, hasSurvey, surveyId) => {
    try {
      db.collection("contents").doc(teamName).collection("programs").doc(id).delete()
      if(hasSurvey===true)
        db.collection("contents").doc(teamName).collection("programSurveys").doc(surveyId).delete()
      alert("성공적으로 삭제되었습니다.")
      setTriggerFetch(!triggerFetch)
    } catch (e) {
      alert(e)
      console.log(e)
    }

  }

  const onResultClick = (id) => {
    router.push(`/admin/result/programs/${id}`)
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
                새 프로그램
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
                <CardContent sx={{ padding:"14px 10px 0px 10px", display: 'flex', alignItems: 'center', width:"100%", justifyContent:"center", position:"relative", flexDirection: 'column', cursor: "pointer" }}
                  >
                  {program.published ? <div className={styles.published}>게재중</div> : <div className={styles.unpublished}>미게재</div>}


                  
                  <div className={styles.delete} onClick={() => onDeleteClick(program.id, program.hasSurvey, program.surveyId)}>
                    <DeleteOutlineOutlinedIcon />
                  </div>
                  <img width={200} height={200} src={program.thumbnailImg} onClick={() => onProgramClick(program.id)} />
                  <Typography onClick={() => onProgramClick(program.id)}
                    variant='h6' sx={{ mt: 1, color: "#222", textAlign: "center", wordBreak: "keep-all", fontSize: "18px", fontWeight: "bold", lineHeight: "18px" }} textTransform="capitalize">
                    {program.title}
                  </Typography>
                  <Typography onClick={() => onProgramClick(program.id)}
                    sx={{ mt: 1, color: "#444", textAlign: "center", fontSize: "13px", lineHeight: "16px", wordBreak: "keep-all" }}>
                    {program.subtitle}
                  </Typography>
                  <Typography onClick={() => onProgramClick(program.id)}
                    sx={{ mt: "5px", color: "#444", fontSize: "11px", textAlign: "center" }} textTransform="capitalize">
                    마지막 수정: {savedDate}
                  </Typography>
                  {program.published && <p style={{fontSize:"11px"}}>게재일: {publishedDate}</p>}
                  {program.published && <Button variant="text" onClick={()=>onResultClick(program.id)} >결과보기</Button>}
                </CardContent>
              </Card>
            </Grid>
          )
        })}

        
      </Grid>
    </div>
  )
}

export default Program