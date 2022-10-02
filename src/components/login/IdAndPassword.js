import { useEffect, useState } from "react"
import styles from "styles/login/idAndPassword.module.css"
import { useRouter } from "next/router";

import useAuth from "src/hooks/auth/auth"

import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';



const IdAndPassword = (props) => {
  const { user, loginWithGoogle, loginWithFacebook, error, resetPassword, loginWithApple, signInUserWithEmailAndPassword, setError } = useAuth();
  const [text, setText] = useState(props.text)
  const router = useRouter();

  const [email, setEmail] = useState("")
  const onEmailChange = (e) => { setEmail(e.target.value) }
  const [password, setPassword] = useState("")
  const onPasswordChange = (e) => {setPassword(e.target.value)}
  const [values, setValues] = useState({
    password: '',
    showPassword: false,
    error: ""
  });

  useEffect(() => {
    setError("")
  }, [])

  useEffect(() =>{
    setText(props.text)
  },[props.text])
  
  const handleChange = (prop) => (event) => {
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

  const onLoginClick = () => {
    try {
      signInUserWithEmailAndPassword(email, values.password)
    } catch (e) {
        setValues({ ...values, error: e.code})
    }
  }


  const onSignInClick = () => {
    if (props.admin)
      router.push("/admin/signin")
    else
      router.push("/signin")
  }

  const onFindPasswordClick = () => {
    if (props.admin)
      router.push("/admin/forgotPassword")
    else
      router.push("/forgotPassword")
    // resetPassword(email)
  }

  const handleOnKeyPress = (e) => {
    if (e.key === "Enter") {
      onLoginClick()
    }
  }

  return (
    <div className={styles.login_container} onKeyPress={handleOnKeyPress}>
      <TextField
        fullWidth
        id="outlined-helperText"
        label={text.email}
        value={email}
        size="small"
        margin="normal"
        onChange={onEmailChange}
        style={{width:"70%", marginTop: "0px"}}
      />
      <FormControl sx={{m:1, width: '70%'}} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password" >{text.password}</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={values.showPassword ? 'text' : 'password'}
          value={values.password}
          style={{paddingTop:0, paddingBottom:0}}
          onChange={handleChange('password')}
          error={error.login!==undefined}
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
        {error.login !== undefined && <FormHelperText id="component-error-text" error={error.login!==undefined}>{error.login}</FormHelperText>}
      </FormControl>

      <Button variant="outlined" sx={{m:1}} style={{
      width: "70%", fontSize: "17px",
      }} onClick={onLoginClick}>{text.login}</Button>

      <div className={styles.find_password_container}>
        <p onClick={onFindPasswordClick}>{text.find_password}</p>
        <p onClick={onSignInClick}>{text.sign_in}</p>
      </div>
    </div>
  )
}

export default IdAndPassword