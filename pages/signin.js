import { withPublic } from "src/hooks/auth/route";
import styles from "styles/signin.module.css"
import { useRouter } from "next/router"

import SignInCompo from "src/components/login/SignIn"

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';


const SignIn = ({auth}) => {
  const router = useRouter()
  const onTitleClick = () => {
    router.back()
  }


  return (
    <div className={styles.main_container}>
      <div className={styles.title_container} onClick={onTitleClick}>
        <ArrowBackIosNewIcon style={{fontSize: "15px"}} />
        <p>회원가입</p>
      </div>  
      <SignInCompo />
    </div>
  )
}

export default withPublic(SignIn);