import { useEffect, useState } from "react"

import { useRouter } from "next/router"
import { firestore as db } from "firebase/firebase"

import { Button } from "@mui/material"
import styles from "styles/components/admin/csvTable.module.css"
import useAuth from "src/hooks/auth/auth"

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

const CSVTable = ({headers, data, type, docId}) => {
    const router = useRouter()
    const {teamName} = useAuth()
    const [isLoading, setIsLoading] = useState(true)
    const [rowData, setRowData] = useState([])
    const [triggerReload, setTriggerReload] = useState(true)

    useEffect(()=>{
        const fetchData = async() => {
            let tempList = []
            for (const item of data){
                await db.collection("contents").doc(teamName).collection("programs").doc(docId).collection("participate").doc(item.uid).get().then((doc)=>{
                    if(doc.exists)
                        tempList.push({...item, hasPart: doc.data().hasPart})
                    else
                        tempList.push({...item})
                })
            }
            setRowData(tempList)
            setIsLoading(false)
        }   
        fetchData()
    },[triggerReload])

    const onUidClick = (uid)=>{
        router.push(`/admin/user/${uid}`)
    }

    const onYesClick = async(uid, hasPart)=>{
        await db.collection("comments").doc(uid).get().then((doc)=>{
            if(doc.exists){
                if(doc.data().hasPart)
                    db.collection("comments").doc(uid).update({hasPart: doc.data().hasPart+1})
                else
                    db.collection("comments").doc(uid).update({hasPart: 1})

                if(hasPart===false){
                    db.collection("comments").doc(uid).update({hasNotPart: doc.data().hasNotPart-1})
                }
            } else
                db.collection("comments").doc(uid).set({hasPart: 1})
        })
        await db.collection("contents").doc(teamName).collection("programs").doc(docId).collection("participate").doc(uid).set({hasPart: true})
        setTriggerReload(!triggerReload)
    }

    const onNoClick = async(uid, hasPart) => {
        await db.collection("comments").doc(uid).get().then((doc)=>{
            if(doc.exists){
                if(doc.data().hasNotPart)
                    db.collection("comments").doc(uid).update({hasNotPart: doc.data().hasNotPart+1})
                else
                    db.collection("comments").doc(uid).update({hasNotPart: 1})

                if(hasPart===true){
                    db.collection("comments").doc(uid).update({hasPart: doc.data().hasPart-1})
                }
            } else
                db.collection("comments").doc(uid).set({hasNotPart: 1})
        })
        await db.collection("contents").doc(teamName).collection("programs").doc(docId).collection("participate").doc(uid).set({hasPart: false})
        setTriggerReload(!triggerReload)
    }

    if(isLoading)
    return<></>

    
    return(
        <div className={styles.main_container}>
            <table>
                <thead>
                    <tr>
                        {headers?.map((item, index)=>{
                            return(
                                <th key={index} className={styles.header_item}>
                                    {item.label}
                                </th>
                            )
                        })}
                        {type==="programs" && <th>참여여부</th>}
                    </tr>
                </thead>

                <tbody>
                    {rowData?.map((item, index)=>{
                        return(
                            <tr key={index} >
                                {headers.map((head, index2)=>{
                                    return(
                                        <td key={index2} onClick={()=>onUidClick(item.uid)}>
                                            {item[head.key]}
                                        </td>
                                    )
                                })}
                                {type==="programs" &&
                                    <td className={styles.part_container}>
                                        {item.hasPart===true && <h1><CheckCircleOutlineIcon /> 참여함</h1>}
                                        {item.hasPart===false && <h2><CancelOutlinedIcon /> 미참여</h2>}
                                        {item.hasPart!==undefined && <p>|</p>}
                                        <Button disabled={item.hasPart===true} onClick={()=>onYesClick(item.uid, item.hasPart)}>참여함</Button>
                                        <Button style={item.hasPart===true ?{color:"red"} : {}} disabled={item.hasPart===false} onClick={()=>onNoClick(item.uid, item.hasPart)}>미참여</Button>
                                    </td>
                                }
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default CSVTable