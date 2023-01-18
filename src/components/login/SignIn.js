import react, { useState, useEffect } from "react"
import Link from "next/link";
import { withPublic } from "src/hooks/auth/route";
import styles from "styles/login/signIn.module.css"
import { useRouter } from "next/router"
import useAuth from "src/hooks/auth/auth";
import logo from "public/logo.png"
import Image from "next/image"
import { firestore as db } from "firebase/firebase";
import dynamic from "next/dynamic";
// const QuillNoSSRWrapper = dynamic(import('react-quill'), {
//   ssr: false,
//   loading: () => <p>로딩중 ...</p>,
// })
// import ReactHtmlParser from "react-html-parser";

import { styled, useTheme } from '@mui/material/styles'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography'

import ChevronLeft from 'mdi-material-ui/ChevronLeft'

const SignIn = () => {
  const { user, loginWithGoogle, loginWithFacebook, error, loginWithApple, createUserWithEmailAndPassword, setError } = useAuth();
  const router = useRouter()

  const [isDataInfo, setIsDataInfo] = useState(false)
  const [text, setText] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  
  const [values, setValues] = useState({
    email: '',
    password: '',
    showPassword: false,
    comfirmPassword: '',
    showConfirmPassword: false,
    userName: "",
    verification: "",
    checked: false,
    error: ""
  });
  const LinkStyled = styled('a')(({ theme }) => ({
  display: 'flex',
  fontSize: '0.875rem',
  alignItems: 'center',
  textDecoration: 'none',
  justifyContent: 'center',
  color: theme.palette.primary.main
  }))

  const onCheckboxChange = (e) => {
    setValues({...values, "checked":e.target.checked})
  }

  useEffect(() => {
    setError("")
    const fetchData = async () => {
      const data = await db.collection("setting").doc("private").get()
      if (data.exists) {
        setText(data.data().text)
      }
      setIsLoading(false)
    }
    fetchData()
  }, [])
  
  const onValuesChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

    const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

    const handleClickShowConfirmPassword = () => {
    setValues({
      ...values,
      showConfirmPassword: !values.showConfirmPassword,
    });
  };

  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };

  const onBackToSignInClick = () => {
    setIsDataInfo(false)
  }

  const onSignInClick = () => {
    console.log(values)
    if (values.email===undefined || values.email==="") {
      setError({ "signin": "이메일 주소를 입력해주세요." })
      return;
    }
    if (values.password === undefined || values.password === "") {
      setError({"signin":"비밀번호를 입력해주세요."})
      return;
    }
    if (values.password !== values.confirmPassword) {
      setError({"signin":"재확인 비밀번호가 다릅니다."})
      return;
    }
    if (!values.checked) {
      setError({"signin":"개인정보처리방침 동의는 필수입니다."})
      return;
    }
    console.log(user)
    console.log(values.password)
    createUserWithEmailAndPassword(values.email, values.password)
  }

  useEffect(() => {
    console.log(error)
  },[error])

  if(isDataInfo && !isLoading)
    return (
    <div className={styles.main_container}>
      <div className={styles.title_container} onClick={onBackToSignInClick}>
        <ArrowBackIosNewIcon style={{fontSize: "15px"}} />
        <p>개인정보 처리방침</p>
      </div>
      <div className={styles.content_container}>
        <div>{ReactHtmlParser(text)}</div>
      </div>
    </div>
  )

  return (
    <>
        <div className={styles.logo_container}>
          <Image src={logo} alt={"한국다문화뉴스 로고"} layout="fill" objectFit="cover" objectPosition="center"/>
        </div>
      <TextField
        fullWidth
        id="outlined-helperText"
        label="이메일"
        value={values.email}
        helperText={error.signin ==="이메일 주소를 입력해주세요." || error.signin ==="이미 등록된 이메일 주소입니다." ? error.signin : "비밀번호 찾기 시 해당 이메일로 메세지가 전송됩니다."}
        error={error.signin ==="이메일 주소를 입력해주세요." || error.signin==="이미 등록된 이메일 주소입니다."}
        size="small"
        margin="normal"
        onChange={onValuesChange("email")}
        style={{ width: "70%", marginTop: "18px" }}
      />
      
      <FormControl sx={{m:1, width: '70%'}} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password" >비밀번호</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={values.showPassword ? 'text' : 'password'}
          value={values.password}
          style={{paddingTop:0, paddingBottom:0}}
          onChange={onValuesChange('password')}
          error={error.signin==="비밀번호를 입력해주세요." || error.signin==="비밀번호는 최소 6자리 이상이여야합니다."}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {values.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
        {(error.signin === "비밀번호를 입력해주세요." ||
          error.signin === "비밀번호는 최소 6자리 이상이여야합니다.")
          && <FormHelperText id="component-error-text" error={true} >{error.signin}</FormHelperText>}
      </FormControl>

      <FormControl sx={{m:1, width: '70%'}} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password" style={{backgroundColor:"white", paddingRight:"2px"}} >비밀번호 재확인</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={values.showConfirmPassword ? 'text' : 'password'}
          value={values.confirmPassword}
          style={{paddingTop:0, paddingBottom:0}}
          onChange={onValuesChange('confirmPassword')}
          error={error.signin ==="재확인 비밀번호가 다릅니다."}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowConfirmPassword}
                onMouseDown={handleMouseDownConfirmPassword}
                edge="end"
              >
                {values.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
        {error.signin ==="재확인 비밀번호가 다릅니다." && <FormHelperText id="component-error-text" error={true}>{error.signin}</FormHelperText>}
      </FormControl>
      <div className={styles.checkbox_container}>
        <Checkbox
          checked={values.checked}
          onChange={onCheckboxChange}
          inputProps={{ 'aria-label': 'controlled' }}
        />
        <p>개인정보처리방침에 동의합니다.</p>
        {error.signin==="개인정보처리방침 동의는 필수입니다." && <p style={{color: "red", marginBottom: '5px'}}>{error.signin}</p>}
      </div>
      <div className={styles.dataInfo_container}>
        {/* <div>{ReactHtmlParser(text)}</div> */}
      </div>
      <div className={styles.signIn_button} onClick={onSignInClick}>
        회원가입
      </div>
        <Typography variant='body2' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width:"100%", mt: 3 }}>
        <Link passHref href='/login'>
            <LinkStyled>
              <ChevronLeft />
              <span>Back to login</span>
            </LinkStyled>
          </Link>
        </Typography>
    </>
  )
}
export default withPublic(SignIn)