import { useState, useEffect } from "react"

import styles from "styles/login/socialLogin.module.css"

import useAuth from "src/hooks/auth/auth"


import {
  GoogleLoginButton,
  FacebookLoginButton,
  AppleLoginButton
} from "react-social-login-buttons"


const SocialLogin = (props) => {
  const { user, loginWithGoogle, loginWithFacebook, error, resetPassword, loginWithApple, signInUserWithEmailAndPassword, setError } = useAuth();
  const [text, setText] = useState(props.text)

  useEffect(() => {
    setText(props.text)
  },[props])
  return (
    <div className={styles.main_container}>
      <div className={styles.button_container} >
        <AppleLoginButton onClick={()=>loginWithApple()}><span>{text.continue_with_apple}</span></AppleLoginButton>
      </div>
      <div className={styles.button_container2}>
        <GoogleLoginButton onClick={()=>loginWithGoogle()}><span>{text.continue_with_google}</span></GoogleLoginButton>
      </div>
      <div className={styles.button_container3}>
        <FacebookLoginButton onClick={()=>loginWithFacebook()}><span>{text.continue_with_facebook}</span></FacebookLoginButton>
      </div>
    </div>
  )
}

export default SocialLogin