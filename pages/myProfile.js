import { useEffect, useState } from "react"
import styles from "styles/components/myProfile.module.css"
import { useRouter } from "next/router"
import Image from "next/image"

import useAuth from "src/hooks/auth/auth"
import useUserData from "src/context/useUserData"
import { firebaseHooks } from "firebase/hooks"
import { handleProfileImage } from "src/hooks/handleProfileImage"
import { firestore as db } from "firebase/firebase"
import { AuthService } from "src/hooks/auth/AuthService"

import PageHeader from "src/components/public/PageHeader"
import Form from "src/form/Form.js"

import CircularProgress from '@mui/material/CircularProgress'
import TextField from '@mui/material/TextField';
import Skeleton from '@mui/material/Skeleton';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';


const MyProfile = () => {
  const router = useRouter()
  const { user, setUser, updateUserProfile } = useAuth()
  const { language } = useUserData()

  const [image, setImage] = useState(user.photoURL)
  const [isImageURLLoading, setIsImageURLLoading] = useState(false)
  const [mainData, setMainData] = useState()
  const [subData, setSubData] = useState()
  const [profileData, setProfileData] = useState()
  const [teamList, setTeamList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isProfileFormLoading, setIsProfileFormLoading] = useState(false)

  const [city, setCity] = useState("");

  const [values, setValues] = useState({
    name: "",
    realName: "",
    phoneNumber: "",
  })
  const onValuesChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const fetchFormData = async(value) => {
      try {
        setIsProfileFormLoading(true)
        const result_main = await firebaseHooks.fetch_profile_settings_object(value, "main")
        const result_sub = await firebaseHooks.fetch_profile_settings_object(value, "sub")
        setMainData(result_main)
        setSubData(result_sub)
        setIsProfileFormLoading(false)
      } catch (e) {
        setMainData("")
        setSubData("")
        setIsProfileFormLoading(false)
        console.log(e)
      }
  }


  const handleChange = async (event) => {
    setCity(event.target.value);
    if (event.target.value !== undefined) {
      fetchFormData(event.target.value)
    }
  };
  
  const handleProfileDataChange = (data) => {
    setProfileData([...data])
  }


  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetch_user_profile = await firebaseHooks.fetch_user_profile(user.uid)
        setValues({...values, name: fetch_user_profile.name, realName: fetch_user_profile.realName, phoneNumber: fetch_user_profile.phoneNumber})
        if (fetch_user_profile.city) {
          setCity(fetch_user_profile.city)
          fetchFormData(fetch_user_profile.city )
        }        
        const result_team_list = await firebaseHooks.fetch_team_list()
        setTeamList(result_team_list)
        const result_user_additional_profile = await firebaseHooks.fetch_additional_profile_as_array(user.uid)
        setProfileData(result_user_additional_profile)
        setIsLoading(false)
      } catch (e) {
        console.log(e)
      }
    }
    fetchData()
  }, [])

  const onImgChange = async (e) => {
    try {
      setIsImageURLLoading(true)
      const photoURL = await handleProfileImage(e.target.files[0], `profile/${user.uid}`,1)
      updateUserProfile({photoURL: photoURL})
      setImage(photoURL)
      setIsImageURLLoading(false)
    } catch (e) {
      console.log(e)
    }
  }


  if (isLoading)
    return (
      // <Skeleton animation="wave" variant="rectangular" width="100%" height={250} />
   <div className={styles.main_container}>
      <div className={styles.title_container}>
          <Skeleton animation="wave" variant="text" width="100%" height={50} />
      </div>
      <div className={styles.img_container}>
       <Skeleton animation="wave" variant="circular" width="100%" height="100%"/>
      </div>
      <Skeleton animation="wave" variant="text" width="80%" height={50} />
      <div className={styles.input_container}>
        <Skeleton animation="wave" variant="text" width="100%" height={50} />
        <p style={{marginBottom:"10px"}}><Skeleton animation="wave" variant="text" width="100%" height={50} /></p>
        <p style={{marginBottom:"10px"}}><Skeleton animation="wave" variant="text" width="100%" height={50} /></p>
        <p style={{marginBottom:"10px"}}><Skeleton animation="wave" variant="text" width="100%" height={50} /></p>
        <p style={{marginBottom:"10px"}}><Skeleton animation="wave" variant="text" width="100%" height={50} /></p>
      </div>
    </div>
    )

  const onSubmitClick = () => {
    try {
      firebaseHooks.overWrite("users", user.uid,
        { city: city, name: values.name, realName: values.realName, phoneNumber: values.phoneNumber })
      localStorage.setItem("city", city)
      firebaseHooks.set_array_to_form_data(user.uid, "additional_profile", profileData, true)
      AuthService.updateUserProfile({displayName: values.name})
      console.log('asdf')
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className={styles.main_container}>
      <PageHeader text="프로필 편집" />


      <div className={styles.img_container}>
        {!isImageURLLoading ?
          <Image src={image} quality={75} alt={"유저 프로필 사진"} 
            layout="fill" objectFit="cover" objectPosition="center" priority={true} />
          :
          <CircularProgress />
        }
      </div>
      <label htmlFor="input_file" className={styles.img_button} >사진 편집</label><input onChange={onImgChange} type="file" id="input_file" accept="image/*" className={styles.hide_input} />

      <div className={styles.border} />
      <div className={styles.form_container}>


        <div className={styles.single_checkbox_container} >
          <TextField multiline id='textarea-outlined' placeholder='' label="닉네임" variant="standard"
            style={{ width: "100%", marginTop: "12px" }} value={values.name} onChange={onValuesChange("name")} />
        </div> 
        <div className={styles.single_checkbox_container}>
          <TextField multiline id='textarea-outlined' label="실명" variant="standard" placeholder="실명을 작성해주세요."
            style={{ width: "100%", marginTop: "12px" }} value={values.realName} onChange={onValuesChange("realName")} />
        </div> 
        <div className={styles.single_checkbox_container}>
          <TextField multiline id='textarea-outlined' label="전화번호" variant="standard" placeholder="010-xxxx-xxxx"
            style={{ width: "100%", marginTop: "12px" }} value={values.phoneNumber} onChange={onValuesChange("phoneNumber")} />
        </div> 


        <div className={styles.team_select}>
          <TextField
            id="standard-select-currency"
            select
            label="지역 선택"
            value={city}
            onChange={handleChange}
            helperText="살고있는 지역을 선택해 그에 맞는 프로필을 작성하세요!"
            variant="standard"
            style={{width: "100%"}}
          >
            {teamList.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        </div>
        {isProfileFormLoading && <CircularProgress sx={{ mt: 3 }} />}
          {mainData && <Form formDatas={mainData} data={profileData} handleData={handleProfileDataChange}/>}
      </div>
      {/* <Form formDatas={mainData} data={profileData} setData={setProfileData} /> */}
      {/* <Form datas={subForm} /> */}
      <Button variant="text" sx={{ fontSize: "17px", height:"fit-content" }} onClick={onSubmitClick}>저 장</Button>
      <div style={{marginBottom:"130px"}} />
    </div>
  )
}

export default MyProfile