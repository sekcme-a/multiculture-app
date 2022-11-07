import { useEffect, useState } from "react"
import styles from "styles/components/admin/content/teamManagement/userList.module.css"

import { firestore as db } from "firebase/firebase"
import useAuth from "src/hooks/auth/auth"
import { firebaseHooks } from "firebase/hooks"

import LoaderGif from "src/components/loader/LoaderGif"
import PageHeader from "src/components/admin/public/PageHeader"
import ControlTeamUser from "src/components/admin/content/teamManagement/ControlTeamUser"
import UserList from "src/components/admin/content/teamManagement/UserList"

import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import { DataGrid } from '@mui/x-data-grid'
import ServerSideToolbar from "./ServerSideToolbar"
const ManageTeam = ({type, docId}) => {
  const { teamName } = useAuth()
  const [pageSize, setPageSize] = useState(10)
  const [columns, setColumns] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [title, setTitle] = useState("")
  
  // const columns = [
  // {
  //   flex: 0.09,
  //   minWidth: 180,
  //   field: 'username',
  //   headerName: '이름',
  //   renderCell: ({ row }) => {
  //     const { avatar, username } = row
  //     return (
  //       <div className={styles.user_container}>
  //         {username}
  //       </div>
  //     )
  //   }
  // },
  // {
  //   flex: 0.12,
  //   minWidth: 110,
  //   field: 'age',
  //   headerName: '나이',
  //   renderCell: ({ row }) => {
  //     return (
  //       <Typography variant='body2' noWrap>
  //         28
  //       </Typography>
  //     )
  //   }
  // },
  // {
  //   flex: 0.12,
  //   minWidth: 110,
  //   field: 'location',
  //   headerName: '거주지',
  //   renderCell: ({ row }) => {
  //     return (
  //       <Typography variant='body2' noWrap>
  //         수원
  //       </Typography>
  //     )
  //   }
  // },
  // {
  //   flex: 0.18,
  //   minWidth:170,
  //   field: 'phoneNumber',
  //   headerName: '연락처',
  //   renderCell: ({ row }) => {
  //     return (
  //       <Typography variant='body2' noWrap>
  //         {row.phoneNumber}
  //       </Typography>
  //     )
  //   }
  // },
  // {
  //   flex: 0.1,
  //   minWidth: 100,
  //   headerName: '직책',
  //   field: 'position',
  //   renderCell: ({ row }) => {
  //     return (
  //       <Typography noWrap sx={{ textTransform: 'capitalize' }}>
  //         {row.position}
  //       </Typography>
  //     )
  //   }
  // },
  // {
  //   flex: 0.15,
  //   minWidth: 100,
  //   headerName: '다문화가족',
  //   field: 'roles',
  //   renderCell: ({ row }) => {
  //     return (
  //       <Typography noWrap sx={{ textTransform: 'capitalize' }}>
  //         O
  //       </Typography>
  //     )
  //   }
  // },
  // ]
  

  useEffect(() => {
    const fetchData = async () => {
      let list = []
      db.collection("contents").doc(teamName).collection(type).doc(docId).get().then((doc) => {
        setTitle(doc.data().title)
      })
      db.collection("contents").doc(teamName).collection(type).doc(docId).collection(result).get().then((query) => {
        query.docs.map((doc) => {
          
        })
      })
    }
      fetchData()
  },[])

  if(isLoading) return <LoaderGif mode="background"/>
  
  return (
    <div>
      <PageHeader title="폼 결과 확인" subtitle={`"${title}" 폼의 입력 현황입니다.`} mt="40px" />
      <DataGrid
        style={{backgroundColor:"white"}}
            autoHeight
            pagination
            rows={listData}
            columns={columns}
            checkboxSelection
            pageSize={pageSize}
            disableSelectionOnClick
            rowsPerPageOptions={[10, 25, 50]}
            onPageSizeChange={newPageSize => setPageSize(newPageSize)}
            components={{ Toolbar: ServerSideToolbar }}
          />
    </div>
  )
}
export default ManageTeam;
