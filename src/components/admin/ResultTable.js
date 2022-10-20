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
  const [cardData, setCardData] = useState([
    { totalUser: 0, title: "loading", avatars:['/default_avatar.png','/default_avatar.png','/default_avatar.png','/default_avatar.png']},
    { totalUser: 0, title: "loading", avatars:['/default_avatar.png','/default_avatar.png','/default_avatar.png','/default_avatar.png']},
    { totalUser: 0, title: "loading", avatars:['/default_avatar.png','/default_avatar.png','/default_avatar.png','/default_avatar.png']},
  ])
  const [listData, setListData] = useState([
    { avatar: '/default_avatar.png', position: "직책", location:"수원", age:"28", phoneNumber:"010-1243-1243", id: "1", roles:"editor", username:"username", uid: "asdfasdfasdfas" },
  ])
  const [isLoading, setIsLoading] = useState(true)  
  const [title, setTitle] = useState("")

  
  const columns = [
  {
    flex: 0.09,
    minWidth: 180,
    field: 'username',
    headerName: '이름',
    renderCell: ({ row }) => {
      const { avatar, username } = row
      return (
        <div className={styles.user_container}>
          {username}
        </div>
      )
    }
  },
  {
    flex: 0.12,
    minWidth: 110,
    field: 'age',
    headerName: '나이',
    renderCell: ({ row }) => {
      return (
        <Typography variant='body2' noWrap>
          28
        </Typography>
      )
    }
  },
  {
    flex: 0.12,
    minWidth: 110,
    field: 'location',
    headerName: '거주지',
    renderCell: ({ row }) => {
      return (
        <Typography variant='body2' noWrap>
          수원
        </Typography>
      )
    }
  },
  {
    flex: 0.18,
    minWidth:170,
    field: 'phoneNumber',
    headerName: '연락처',
    renderCell: ({ row }) => {
      return (
        <Typography variant='body2' noWrap>
          {row.phoneNumber}
        </Typography>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 100,
    headerName: '직책',
    field: 'position',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap sx={{ textTransform: 'capitalize' }}>
          {row.position}
        </Typography>
      )
    }
  },
  {
    flex: 0.15,
    minWidth: 100,
    headerName: '다문화가족',
    field: 'roles',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap sx={{ textTransform: 'capitalize' }}>
          O
        </Typography>
      )
    }
  },
  ]
  

  useEffect(() => {
    const fetchData = async () => {
      const id_list = await firebaseHooks.fetch_admin_uid_list_from_teamname(teamName)
      const users = await firebaseHooks.fetch_user_data_list_from_user_uid_list(id_list)
      let avatars = []
      let userList = []
      let id = 0;
      users.forEach((user) => {
        console.log(user.data())
        //for  ControlTeamUser.js
        avatars.push(user.data().photo)

        //for UserList.js 
        let role = ""
        if (user.data().roles[0].includes("admin_"))
          role = user.data().roles[0]
        else
          role = user.data().roles[1]
        userList.push({
          avatar: user.data().photo,
          position: user.data().position,
          phoneNumber: user.data().phoneNumber,
          id: id,
          roles: role,
          uid: user.id,
          username: user.data().name
        })
        id++
      })
      setCardData([
        { totalUsers: users.length, title: '팀 구성원', avatars: avatars },
      ])
      // setListData(userList)
      console.log(type)
      console.log(id)
      db.collection("contents").doc(teamName).collection(type).doc(docId).get().then((doc) => {
        setTitle(doc.data().title)
      })
      setIsLoading(false)
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