import { useEffect, useState } from "react";

import { useRouter } from "next/router";
import styles from "styles/admin/admin.module.css"
import Navbar from "src/components/admin/Navbar"
import Header from "src/components/admin/Header"
import useAuth from "src/hooks/auth/auth";
import Form from "src/form/Form.js"
import CustomForm from "src/components/public/CustomForm";

import { firestore as db } from "firebase/firebase";

import { Button } from "@mui/material";
import { Backdrop } from "@mui/material";

const ProgramSurvey = () => {
    const router = useRouter()
    const {docId} = router.query
    const { user, userrole, setUserrole, setTeamName,teamName } = useAuth();
    const [mainFormData, setMainFormData] = useState([])
    const [openBackdrop, setOpenBackdrop] = useState(false)


    const onPreviewClick = () => {
        setOpenBackdrop(true)
      }


    const onSubmitClick = async() => {
        const input = confirm("게재하시겠습니까?\n(게재 후 수정할 수 없습니다.)")
        if(input){
            db.collection("contents").doc(teamName).collection("programs").doc(docId).collection("participate").get().then(async(query)=>{
                if(query.empty){
                    alert("프로그램에 참여한 인원이 없습니다.\n프로그램에 참여한 인원을 선택한 후 다시 게재해주세요.")
                }
                else{
                    const programDoc = await db.collection("contents").doc(teamName).collection("programs").doc(docId).get()
                    await db.collection("programSurvey").doc(docId).set({
                        form: mainFormData,
                        title: programDoc.data().title
                    })
                    
                    await query.docs.forEach(async(doc)=>{
                        if(doc.data().hasPart===true)
                            await db.collection("users").doc(doc.id).collection("programSurvey").doc(docId).set({hasSubmit: false, title: programDoc.data().title})
                    })
                    alert("게재되었습니다.")
                    router.push(`/admin/${teamName}/program`)
                }
            })
        }
    }   


    return(
        <div className={styles.main_container}>
            <Navbar teamName={teamName} />
            <Header location="programSurvey" />
            <div className={styles.content_container}>
                <div style={{display: "flex", justifyContent:"space-between"}}>
                    <div>
                        <h1>프로그램 설문조사는 프로그램에 참여한 사람들에 한해서 전달됩니다.</h1>
                        <h1 style={{color: "red", marginTop:"5px", marginBottom:"15px"}}>*프로그램 설문조사는 게재 후 수정할 수 없습니다.</h1>
                    </div>
                    <Button variant="contained" style={{height:"fit-content"}} onClick={onSubmitClick}>게재</Button>
                </div>

                {/* <div style={{width:"400px", height:"700px", backgroundColor:"white", overflow:"scroll", padding: "10px"}}> */}
                    <CustomForm formData={mainFormData} setFormData={setMainFormData} teamName={teamName} contentMode={true} id={docId} />
                {/* </div> */}
                <div style={{display:"flex", justifyContent:"center"}}>
                    <Button
                    color="inherit"
                    onClick={onPreviewClick}
                    sx={{ mr: 1 }}
                    >
                    미리보기
                    </Button>
                </div>
            </div>
            <Backdrop
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={openBackdrop}
                onClick={()=>setOpenBackdrop(false)}
            >
                <div style={{width:"400px", height:"700px", backgroundColor:"white", overflow:"scroll", padding: "10px"}}>
                    <Form formDatas={mainFormData} data={[]} handleData={()=>{}} addMargin={true} />
                </div>
            </Backdrop>
        </div>
    )
}

export default ProgramSurvey