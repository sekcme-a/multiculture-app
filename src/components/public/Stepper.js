import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { firestore as db } from 'firebase/firebase';


import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { TimePicker } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { MobileDatePicker } from '@mui/x-date-pickers'
import { MobileDateTimePicker } from '@mui/x-date-pickers'
// import { TimePicker } from '@mui/x-date-pickers'
import { LocalizationProvider } from '@mui/x-date-pickers';
import Backdrop from '@mui/material/Backdrop';


import DropperImage from "src/components/public/DropperImage"
import DateTime from 'src/form/items/DateTime';
import ShowArticle from 'src/components/public/ShowArticle';
import styles from "styles/components/public/stepper.module.css"
import Form from "src/form/Form.js"

import { firebaseHooks } from 'firebase/hooks';
import useAuth from 'src/hooks/auth/auth';


// ** Next Import
import dynamic from 'next/dynamic'

import CustomForm from "src/components/public/CustomForm.js"


// ! To avoid 'Window is not defined' error
// const ReactDraftWysiwyg = dynamic(() => import('react-draft-wysiwyg').then(mod => mod.Editor), {
//   ssr: false
// })

// const QuillNoSSRWrapper = dynamic(import('react-quill'), {
//   ssr: false,
//   loading: () => <p>로딩중 ...</p>,
// })

// const Editor = dynamic(import('src/components/public/Editor'), {
//   ssr: false,
//   loading: () => <p>로딩중 ...</p>,
// })
import Editor from 'src/components/public/Editor';

export default function HorizontalLinearStepper({ id, teamName, type }) {
  const [steps, setSteps] = useState([])
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [textData, setTextData] = useState()
  const [hasSurvey, setHasSurvey] = useState(false)
  const [surveyId, setSurveyId] = useState("")
  const [deadline, setDeadline] = useState()
  const [isPublished, setIsPublished] = useState(false)
  const [openBackdrop, setOpenBackdrop] = useState(false)
  const handleCloseBackDrop = () => {setOpenBackdrop(false)}
  const onTextChange = (html) => {
    setTextData(html)
  }
  const [values, setValues] = useState({
    title: "",
    subtitle: "",
    thumbnailImg:"",
  })
  const onValuesChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const [alarmValues, setAlarmValues] = useState({
    marriage: false,
    spouse: false,
    children: false,
    family: false,
    all: false,
  })
  const onAlarmValuesChange = (prop) => (event) => {
    if (prop === "all")
      if(event.target.checked)
        setAlarmValues({marriage: true,spouse: true,children: true,family: true,all: true,})
      else
        setAlarmValues({marriage: false,spouse: false,children: false,family: false,all: false,})
    else
      setAlarmValues({...alarmValues, [prop]: event.target.checked})
  }

  const { user } = useAuth()
  const [mainFormData, setMainFormData] = useState([])
  const [surveyFormData, setSurveyFormData] = useState([])
  const router = useRouter()

  useEffect(() => {
    if(type==="programs")
      setSteps(['게시물 작성', '폼 작성', '프로그램 종료 후 설문조사', '저장 및 게재'])
    else if(type==="surveys")
      setSteps(['게시물 작성', '폼 작성', '저장 및 게재'])
    else
      setSteps(['게시물 작성', '저장 및 게재'])
    db.collection("contents").doc(teamName).collection(type).doc(id).get().then((doc) => {
      if (doc.exists) {
        setValues({
          title: doc.data().title,
          subtitle: doc.data().subtitle,
          thumbnailImg: doc.data().thumbnailImg
        })
        setTextData(doc.data().content)
        setMainFormData([...doc.data().form])
        setHasSurvey(doc.data().hasSurvey)
        setSurveyId(doc.data().surveyId)
        setIsPublished(doc.data().published)
        setDeadline(doc.data().deadline?.toDate())
        if(doc.data().alarm)
          setAlarmValues(doc.data().alarm)
        if (doc.data().hasSurvey === true && doc.data().surveyId) {
          db.collection("contents").doc(teamName).collection("programSurveys").doc(doc.data().surveyId).get().then((doc) => {
            setSurveyFormData(doc.data().form)
          })
        }
      }
    })
  },[])


  const isStepOptional = (step) => {
    // return step === 1;
    return false;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = (step) => {
    if(step===0)
      router.back()
    else
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const setImgURL = (url) => {
    setValues({...values, thumbnailImg: url})
  }

  const onSaveClick = async(openAlert) => {
    try {
      // console.log(editorValue.getCurrentContent())
      // const content = convertToHTML(editorValue.getCurrentContent())
      // console.log(content)
      let sid = surveyId
      console.log(mainFormData)
      if(surveyId==="" || surveyId===undefined)
        sid = await firebaseHooks.get_random_id_from_collection("users")
      await db.collection("contents").doc(teamName).collection("programSurveys").doc(sid).set({
        form: surveyFormData,
      })
      setSurveyId(sid)
      const result = await firebaseHooks.save_content(teamName, type, id,
        {
          title: values.title,
          subtitle: values.subtitle,
          thumbnailImg: values.thumbnailImg,
          content: textData,
          form: mainFormData,
          savedDate: new Date(),
          lastSaved: user.uid,
          hasSurvey: hasSurvey,
          surveyId: sid,
          alarm: alarmValues,
      })
      if(result==="success" && openAlert!==false)
        alert("성공적으로 저장되었습니다.")
    } catch (e) {
      
    }
  }
  const onPublishClick = async () => {
    // console.log(deadline)
    onSaveClick(false)
    setIsPublished(!isPublished)
    if(type!=="anouncements")
      await firebaseHooks.save_content(teamName, type, id, { deadline: deadline })
    await firebaseHooks.publish_content(teamName, type, id, user.uid, !isPublished)
    if(!isPublished)
      alert("게재되었습니다.")
    else
      alert("게재취소되었습니다.")
  }

  const onPreviewClick = () => {
    setOpenBackdrop(true)
  }
  const createMarkup = () => {
    return {__html: textData}
  }


  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
          <React.Fragment>
            <Card sx={{ padding: "10px 25px", mt: "20px" }}>
              {activeStep === 0 &&
                <>
                  <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}. 게시물 작성</Typography>

                  <div className={styles.main_container}>
                    <div className={styles.item_container}>
                      <TextField id="standard-basic" label="제목" variant="standard" value={values.title} onChange={onValuesChange("title")} />
                    </div>
                    <div className={styles.item_container}>
                      <TextField id="standard-basic" label="부제목" variant="standard" value={values.subtitle} onChange={onValuesChange("subtitle")} />
                    </div>
                    <div className={styles.items_container}>
                    {type !== "anouncements" && <DropperImage setImgURL={setImgURL} path={`content/${id}/thumbnailImg`} imgURL={values.thumbnailImg} />}
                  </div>
                    <div style={{width: "100%", marginTop: "15px"}}>
                      {/* <ReactDraftWysiwyg editorState={editorValue}
                        localization={{
                          locale: "ko",
                        }}
                        onEditorStateChange={data => setEditorValue(data)}
                        toolbar={{
                          inline: { inDropdown: true },
                          list: { inDropdown: true },
                          textAlign: { inDropdown: true },
                          link: { inDropdown: true },
                          history: { inDropdown: false },
                        }}
                      /> */}
                    <Editor path={`content/${id}`} handleChange={onTextChange} textData={textData} />
                    </div>
                  </div>
                </>
              }
              {activeStep === 1 && type!=="anouncements" &&
                <>
                  <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}. 폼 작성</Typography>

                  <div className={styles.main_container}>
                  <CustomForm formData={mainFormData} setFormData={setMainFormData} teamName={teamName} contentMode={true} id={id} />
                  </div>
                </>
              }
              {activeStep === 1 && type==="anouncements" &&
                <>
                  <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}. 저장 및 게재</Typography>

                  <div className={styles.main_container}>
                    <div className={styles.container}>
                      <p>저장해도 게재 전까지는 사용자들에게 보여지지 않습니다.</p>
                      <Button variant="text" disabled={isPublished} onClick={onSaveClick} style={{ fontSize: "16px" }}>저장</Button>
                    </div>

                    <div className={styles.container}>
                    <p>게재 후엔 내용 변경이 불가능합니다.</p>
                    {isPublished && <Button disabled={true} style={{ fontSize: "16px" }}>게재됨</Button>}
                    <Button variant="text" onClick={onPublishClick} style={{ fontSize: "16px" }}
                    >{isPublished ? "게재 취소" : "게재"}</Button>
                    </div>
                  </div>
                </>
              }
              {(type==="programs" && activeStep === 2) &&
                <>
                  <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}. 프로그램 종료 후 설문조사</Typography>
                <FormControlLabel
                  control={
                    <Switch
                      checked={hasSurvey}
                      onChange={(e) => setHasSurvey(e.target.checked)}
                    />
                  }
                  label={hasSurvey === true ? "설문조사 유" : "설문조사 무"}
                />
                  <div className={styles.main_container}>
                  {hasSurvey &&
                    <CustomForm formData={surveyFormData} setFormData={setSurveyFormData} teamName={teamName} contentMode={true} id={id} />
                  }
                  </div>
                </>
              }
              {(activeStep === 3 || (type==="surveys" && activeStep===2)) &&
                <>
                  <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}. 저장 및 게재</Typography>

                  <div className={styles.main_container}>
                    <div className={styles.container}>
                      <p>저장해도 게재 전까지는 사용자들에게 보여지지 않습니다.</p>
                      <Button variant="text" disabled={isPublished} onClick={onSaveClick} style={{ fontSize: "16px" }}>저장</Button>
                    </div>
                    <div style={{marginTop: "15px", width:"100%"}}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <MobileDateTimePicker
                          label="마감일을 선택해주세요."
                          value={deadline}
                          onChange={(e)=>setDeadline(e)}
                          renderInput={params => <TextField {...params} />}
                        />
                      </LocalizationProvider>
                  </div>
                  

                  <div style={{marginTop: "15px"}}>
                    <p>알림을 보낼 분류를 선택해주세요.</p>
                    <FormControlLabel control={<Switch checked={alarmValues.marriage} onChange={onAlarmValuesChange("marriage")} />} label="결혼이민자" />
                    <FormControlLabel control={<Switch checked={alarmValues.spouse} onChange={onAlarmValuesChange("spouse")} />} label="배우자" />
                    <FormControlLabel control={<Switch checked={alarmValues.children} onChange={onAlarmValuesChange("children")} />} label="자녀" />
                    <FormControlLabel control={<Switch checked={alarmValues.family} onChange={onAlarmValuesChange("family")} />} label="가족" />
                    <FormControlLabel control={<Switch checked={alarmValues.all} onChange={onAlarmValuesChange("all")} />} label="전체" />
                  </div>
                  

                    <div className={styles.container}>
                    <p>컨텐츠가 모든 사용자들에게 표시되며, 마감일 이후 "마감"으로 표시됩니다.</p>
                    <p>게재 후엔 내용 변경이 불가능합니다.</p>
                    {isPublished && <Button disabled={true} style={{ fontSize: "16px" }}>게재됨</Button>}
                    <Button variant="text" onClick={onPublishClick} style={{ fontSize: "16px" }}
                      disabled={deadline===undefined}
                    >{isPublished ? "게재 취소" : "게재"}</Button>
                    </div>
                  </div>
                </>
              }
              
              


              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, mt:10 }}>
                <Button
                  color="inherit"
                  // disabled={activeStep === 0}
                  onClick={()=>handleBack(activeStep)}
                  sx={{ mr: 1 }}
                >
                  뒤로가기
                </Button>

                <Box sx={{ flex: '1 1 auto' }} />

                <Button
                  color="inherit"
                  // disabled={activeStep === 0}
                  onClick={onPreviewClick}
                  sx={{ mr: 1 }}
                >
                  미리보기
                </Button>

                <Box sx={{ flex: '1 1 auto' }} />   

                <Button onClick={()=>handleNext("finished")}>
                  {activeStep !== steps.length - 1 && '다음'}
                </Button>

              </Box>
            </Card>
        </React.Fragment>
      )}
      <Backdrop
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackdrop}
        onClick={handleCloseBackDrop}
      >
        {activeStep === 0 &&
          <div style={{width:"400px", height:"700px", backgroundColor:"white", overflow:"scroll"}}>
            <div className="quill_custom_editor" style={{marginTop:"35px"}}>
              <div dangerouslySetInnerHTML={createMarkup()} />
            </div>
          </div>
        }
        {activeStep === 1 && type!=="anouncement" && 
          <div style={{width:"400px", height:"700px", backgroundColor:"white", overflow:"scroll", padding: "10px"}}>
            <Form formDatas={mainFormData} data={[]} handleData={()=>{}} addMargin={true} />
          </div>
        }
        {activeStep === 2 && type!=="survey" && 
          <div style={{width:"400px", height:"700px", backgroundColor:"white", overflow:"scroll", padding: "10px"}}>
            <Form formDatas={surveyFormData} data={[]} handleData={()=>{}} addMargin={true} />
          </div>
        }
      </Backdrop>
    </Box>
  );
}
