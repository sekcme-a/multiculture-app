import { useEffect, useState } from "react"
import { useRouter } from "next/router"

import { firestore as db } from "firebase/firebase"

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import FilledInput from '@mui/material/FilledInput';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';

import useAuth from 'src/hooks/auth/auth'



// Styled Grid component
const StyledGrid = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    order: -1,
    display: 'flex',
    justifyContent: 'center'
  }
}))

// Styled component for the image
const Img = styled('img')(({ theme }) => ({
  right: 13,
  bottom: 0,
  height: 185,
  position: 'absolute',
  [theme.breakpoints.down('sm')]: {
    height: 165,
    position: 'static'
  }
}))



const AskTeam = (props) => {
  const { user, userrole } = useAuth()
  const router = useRouter()
  const [name, setName] = useState("")
  const [team, setTeam] = useState("")
  const handleChange = (event) => {
    setTeam(event.target.value);
  };

  //quick style
  const CARD_WIDTH = 800
  const TITLE_WIDTH = 10
  const TITLE_MARGIN_BOTTOM = 2

  useEffect(() => {
    console.log(userrole)
    if(userrole!==undefined && userrole[0].includes("admin_"))
      setTeam(userrole[0].replace("admin_", ""))
    else if(userrole!==undefined && userrole[1] && userrole[1].includes("admin_"))
      setTeam(userrole[1].replace("admin_", ""))
    db.collection("users").doc(user.uid).get().then((doc) => {
      setName(doc.data().name)
    })
  },[userrole])


  const onJoinClick = async () => {
    if(team!=="")
      router.push(`/admin/${team}/home`)
  }

  const handleOnKeyPress = (e) => {
    if (e.key === "Enter") {
      onJoinClick()
    }
  } 
  return (
    <Card sx={{ position: 'relative', overflow: 'visible', mt: { xs: 0, sm: 7.5, md: 0 }, width:`${CARD_WIDTH}px` }}>
      <CardContent sx={{ p: theme => `${theme.spacing(8.25, 7.5, 1.25, 7.5)} !important` }}>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={TITLE_WIDTH}>
            <Typography variant='h5' sx={{ mb: TITLE_MARGIN_BOTTOM }}>
              들어갈 팀을 입력해주세요{' '}
              <Box component='span' sx={{ fontWeight: 'bold' }}>
                {name}님
              </Box>
              ! 🎉
            </Typography>
            <div style={{display: "flex", alignItems:"center"}}>
              <FormControl variant="standard" sx={{mb: 3}}>
                <InputLabel htmlFor="component-helper">TEAM</InputLabel>
                <Input
                  id="component-helper"
                  value={team}
                  onChange={handleChange}
                  onKeyDown={handleOnKeyPress}
                  aria-describedby="component-helper-text"
                />
                <FormHelperText id="component-helper-text">
                  TEAM명을 작성해주세요.
                </FormHelperText>
              </FormControl>
              <Button variant="text" sx={{ml: 1, mt: -3}} onClick={onJoinClick}>참가</Button>
            </div>
            <Typography variant='body2'>어드민 TEAM을 이용해 컨텐츠를 관리하세요.</Typography>
            <Typography variant='body2'>팀에 들어가려면 팀의 멤버가 해당 코드를 팀에 추가해야 합니다.</Typography>
            <Typography variant='body2'>Your Code : <b style={{color: "blue"}}>{user.uid}</b></Typography>
          </Grid>
          <StyledGrid item xs={12} sm={6}>
            <Img alt='Congratulations John' src="/illustration_john.png" />
          </StyledGrid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default AskTeam


