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
import TextField from '@mui/material/TextField'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { styled, alpha } from '@mui/material/styles';
import Backdrop from '@mui/material/Backdrop';
import { Trumpet } from "mdi-material-ui";
import Dialog from '@mui/material/Dialog'
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import { CircularProgress } from "@mui/material";


const options = [
  '삭제',
  '메인 프로그램으로 설정'
];

const ITEM_HEIGHT = 48;

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
  const [isFileLoading, setIsFileLoading] = useState(true)
  const [triggerFetch, setTriggerFetch] = useState(true)
  const [location, setLocation] = useState("/")
  const [folders, setFolders] = useState([])
  const [backdropMode, setBackdropMode] = useState("hide")

  //dialog control
  const [input, setInput] = useState("")
  const [dialogData, setDialogData] = useState({})

  //anchor control
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorEl2, setAnchorEl2] = useState(null)
  const [selectedFolder, setSelectedFolder] = useState({})
  const [selectedProgram, setSelectedProgram] = useState({})
  const open = Boolean(anchorEl);
  const open2 = Boolean(anchorEl2)
  const handleAnchorClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleAnchorClick2 = (event)=>{
    setAnchorEl2(event.currentTarget)
  }
  const handleAnchorClose = () => {
    setAnchorEl(null);
  };
  const handleAnchorClose2 = () => {
    setAnchorEl2(null)
  }

  //change location control
  const [selectedId, setSelectedId] = useState("")

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
      //저장된 location 데이터 가져오기
      // sessionStorage.setItem("prevFolderLocation","/")
      setIsFileLoading(true)
      setProgramList([])
      let prevLocation = sessionStorage.getItem("prevFolderLocation")
      if(prevLocation){
        setLocation(prevLocation)
      } else{
        prevLocation="/"
      }
      //폴더 데이터 불러오기
      const folderData = await db.collection("contents").doc(teamName).collection("programs").doc("folders").get()
      if(folderData.exists && folderData.data().data!==undefined){
        setFolders(folderData.data().data)
      }
      let list = []
      //현재 위치의 파일만 보이게
      const result = await db.collection("contents").doc(teamName).collection("programs").where("location","==",prevLocation).get().then((query)=>{
        query.forEach((doc)=>{
          list.push({teamName: teamName,id: doc.id, ...doc.data()})
        })
      })
      setProgramList(list)
      setIsLoading(false)
      setIsFileLoading(false)
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

  const onDeleteClick = () => {
    handleAnchorClose2()
    try {
      db.collection("contents").doc(teamName).collection("programs").doc(selectedProgram.id).delete()
      if(selectedProgram.hasSurvey===true)
        db.collection("contents").doc(teamName).collection("programSurveys").doc(selectedProgram.surveyId).delete()
      alert("성공적으로 삭제되었습니다.")
      setTriggerFetch(!triggerFetch)
    } catch (e) {
      alert(e)
      console.log(e)
    }

  }

  const onResultClick = () => {
    router.push(`/admin/result/programs/${selectedProgram.id}`)
  }

  const onNewFolderClick = () => {
    setBackdropMode("newFolder")
  }

  const onSubmitClick = () => {
    let hasError = false
    //현 위치에 같은 폴더명 혹은 폴더명에 / 가 포함되는지 확인
    if(input.includes("/")){
      alert("폴더명에 / 가 포함될 수 없습니다.")
      hasError = true
    }
    folders?.forEach((folder)=>{
      if(folder.location===location)
        if(folder.title===input){
          alert("이미 있는 폴더명입니다.")
          hasError = true
        }
    })
    //폴더 추가
    if(hasError===false){
      setBackdropMode("hide")
      db.collection("contents").doc(teamName).collection("programs").doc("folders").set({data:[
        ...folders,
        {location:`${location}`, title:input}
      ]})
      setFolders([...folders, {location:`${location}`, title:input}])
    }
  }

  const onDialogClose = () => {
    setBackdropMode("hide")
  }

  const onFolderClick = (title)=>{
    console.log(title)
    if(location==="/"){
      setLocation(`/${title}`)
      sessionStorage.setItem("prevFolderLocation", `/${title}`)
    }
    else{
      setLocation(`${location}/${title}`)
      sessionStorage.setItem("prevFolderLocation", `${location}/${title}`)
    }
    setTriggerFetch(!triggerFetch)
  }

  const onChangeLocationClick = ()=>{
    setSelectedId(selectedProgram.id)
    handleAnchorClose2()
  }

  const onChangeLocationButtonClick = () => {
    db.collection("contents").doc(teamName).collection("programs").doc(selectedId).update({location: location})
    setSelectedId("")
    setTriggerFetch(!triggerFetch)
  }
  const onCancelPositionClick = () => {
    setSelectedId("")
  }

  const onDeleteFolderClick = async()=>{
    handleAnchorClose()
    const result = confirm("해당 폴더를 삭제하시겠습니까?(하위 폴더와 파일 모두 삭제됩니다.)")
    if(!result)
      return
    //이 폴더와 하위폴더들 모두 삭제
    let tempFolders = []
    folders.map((folder, index)=>{
      let isDelete = false
      if(folder.location===selectedFolder.location && folder.title===selectedFolder.title){
        // tempFolders = tempFolders.splice(index, 1)
        isDelete = true
      } else{
        if(location==="/"){
          if(folder.location.includes(`/${selectedFolder.title}`)){
            // tempFolders = tempFolders.splice(index, 1)
            isDelete = true
          }
        }else{
          if(folder.location.includes(`${selectedFolder.location}/${selectedFolder.title}`))
            // tempFolders = tempFolders.splice(index, 1)
            isDelete = true
        }
      }
      if(!isDelete)
        tempFolders.push({location:folder.location, title:folder.title})
    })
    setFolders(tempFolders)
    await db.collection("contents").doc(teamName).collection("programs").doc("folders").set({data:tempFolders})
    setTriggerFetch(!triggerFetch)
  }

  if (isLoading) return <LoaderGif />
  
  return (
    <div className={styles.main_container}>
      {selectedId!=="" && 
        <div className={styles.change_location_container}>
          <Button onClick={onChangeLocationButtonClick}>여기로 이동</Button>
          <Button onClick={onCancelPositionClick}><p style={{color:"red"}}>취소</p></Button>
        </div>
      }
      <div className={styles.breadcrumb_container}>
        <Breadcrumbs aria-label="breadcrumb">
        {
          location==="/" ?
            <Link underline="hover" color="black">
              Home
            </Link>
          :
          location.split("/").map((item, index)=>{
            const locs = location.split("/")
            let currentLocation = ""
            if(index===0)
              currentLocation="/"
            else{
              for(let i = 1; i<=index; i++){
                currentLocation=`${currentLocation}/${locs[i]}`
              }
            }
            return(
              <Link key={index} underline="hover" color="black" onClick={()=>{
                console.log(currentLocation)
                setLocation(currentLocation)
                sessionStorage.setItem("prevFolderLocation", currentLocation)
                setTriggerFetch(!triggerFetch)
              }}>
                {item==="" ? "Home" : item}
              </Link>
            )
          })
        }
        </Breadcrumbs>
      </div>
      <Grid container spacing={2}>
        
        <Grid item xs={2}>
          <Card>
            <CardContent sx={{ pt: 10, display: 'flex', alignItems: 'center', flexDirection: 'column', height: "265px", cursor: "pointer" }}
              onClick={onNewFolderClick}>
              <Typography variant='h3' sx={{ mt: 2 , color: "blue"}} textTransform="capitalize">
                +
              </Typography>
              <Typography variant='h6' sx={{ mt: 2 , color: "blue"}} textTransform="capitalize">
                새 폴더
              </Typography>
            </CardContent>
          </Card>
        </Grid>

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
        {
          folders?.map((folder, index)=>{
            if(folder.location===location){
              return(
                <Grid item xs={3} key={index}>
                  <Card>
                    <CardContent sx={{ pt: 10, display: 'flex', position:"relative", alignItems: 'center', flexDirection: 'column', height: "265px", cursor: "pointer" }}
                    >

                        <div className={styles.folder_menu}>
                          <IconButton
                            aria-label="more"
                            id="long-button"
                            aria-controls={open ? 'long-menu' : undefined}
                            aria-expanded={open ? 'true' : undefined}
                            aria-haspopup="true"
                            onClick={handleAnchorClick}
                          >
                            <MoreVertIcon style={{color:"black", fontWeight:"bold", fontSize:"20px"}} onClick={()=>setSelectedFolder(folder)}/>
                          </IconButton>
                          <Menu
                            id="long-menu"
                            MenuListProps={{
                              'aria-labelledby': 'long-button',
                            }}
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleAnchorClose}
                            PaperProps={{
                              style: {
                                maxHeight: ITEM_HEIGHT * 4.5,
                                width: '20ch',
                              },
                            }}
                          >
                            <MenuItem onClick={onDeleteFolderClick}>
                              <p style={{color:"red"}}>삭제</p>
                            </MenuItem>
                          </Menu>
                        </div>
                      <div style={{width:"100%", height:"100%", display:"flex", justifyContent:"center", alignItems:"center", flexWrap:"wrap"}} onClick={()=>onFolderClick(folder.title)} >
                        <div>
                        <Typography variant='h3' sx={{mt: "-50px", width: "100%", color: "black", textAlign:"center"}} textTransform="capitalize">
                          <FolderOutlinedIcon fontSize="60px" />
                        </Typography>
                        <Typography variant='h6' sx={{ mt: 0, color: "black"}} textTransform="capitalize">
                          {folder.title}
                        </Typography>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Grid>
              )
            }
          })
        }

        {isFileLoading &&
          <Grid item xs={3} style={{display:"flex", justifyContent:"center",alignItems:"center"}}>
            <CircularProgress />
          </Grid>
        }

        {programList.map((program, index) => {
          const savedDate = program.savedDate.toDate().toLocaleString('ko-kr').replace(/\s/g, '');
          const publishedDate = program.publishedDate?.toDate().toLocaleString('ko-kr').replace(/\s/g, '');
          return(
            <Grid item xs={3} key={index}>
              <Card style={{minHeight:"370px", display: "flex",position:"relative",  alignItems:"center"}}>
                <CardContent sx={{ padding:"14px 10px 0px 10px", display: 'flex', alignItems: 'center', width:"100%", justifyContent:"center", flexDirection: 'column', cursor: "pointer" }}
                  >
                    {console.log(program.publishedDate.toDate()> new Date())}
                  {program.published ? program.publishedDate.toDate()>new Date() ? <div className={styles.waiting}>예약 게재</div>:<div className={styles.published}>게재중</div> : <div className={styles.unpublished}>미게재</div>}


                  
                  <div className={styles.delete} >
                  <div>
                    <IconButton
                      aria-label="more"
                      id="long-button"
                      aria-controls={open2 ? 'long-menu' : undefined}
                      aria-expanded={open2 ? 'true' : undefined}
                      aria-haspopup="true"
                      onClick={handleAnchorClick2}
                    >
                      <MoreVertIcon style={{color:"black", fontWeight:"bold", fontSize:"20px"}}
                        onClick={()=>setSelectedProgram(program)}
                      />
                    </IconButton>
                    <Menu
                      id="long-menu"
                      MenuListProps={{
                        'aria-labelledby': 'long-button',
                      }}
                      anchorEl={anchorEl2}
                      open={open2}
                      onClose={handleAnchorClose2}
                      PaperProps={{
                        style: {
                          maxHeight: ITEM_HEIGHT * 4.5,
                          width: '20ch',
                        },
                      }}
                    >
                      {program.published && 
                        <MenuItem onClick={()=>onResultClick()} >
                          <p>결과보기</p>
                        </MenuItem>
                      }
                      <MenuItem onClick={()=>onChangeLocationClick()}>
                        <p>위치 이동</p>
                      </MenuItem>
                      <MenuItem onClick={() => onDeleteClick()}>
                        <p style={{color:"red"}}>삭제</p>
                      </MenuItem>
                    </Menu>
                  </div>
                  </div>



                  <img width={250} height={180} src={program.thumbnailBackground} onClick={() => onProgramClick(program.id)} />
                  <Typography onClick={() => onProgramClick(program.id)}
                    variant='h6' sx={{ mt: 3, color: "#222", textAlign: "center", wordBreak: "keep-all", fontSize: "18px", fontWeight: "bold", lineHeight: "18px" }} textTransform="capitalize">
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
                  {/* {program.published && <Button variant="text" onClick={()=>onResultClick(program.id)} >결과보기</Button>} */}
                </CardContent>
              </Card>
            </Grid>
          )
        })}

        
      </Grid>

      {backdropMode==="newFolder" &&
      <Dialog open={true} onClose={onDialogClose} maxWidth="lg">
        <div className={styles.dialog_container}>
          <h1>폴더를 추가합니다.</h1>
          <TextField id="tf" label="폴더 명" variant="standard" className={styles.textField}
            value={input} onChange={(e)=>setInput(e.target.value)} 
          />
          <Button variant="text" onClick={onSubmitClick}>추가</Button>
        </div>
      </Dialog>
      }
    </div>
  )
}

export default Program