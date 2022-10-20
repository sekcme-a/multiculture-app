import { useEffect, useState } from "react"
import styles from "styles/components/admin/content/teamManagement/userList.module.css"
import { useRouter } from "next/router"

import { firestore as db } from "firebase/firebase"
import useAuth from "src/hooks/auth/auth"
import { firebaseHooks } from "firebase/hooks"

import LoaderGif from "src/components/loader/LoaderGif"
import PageHeader from "src/components/admin/public/PageHeader"
import ControlTeamUser from "src/components/admin/content/teamManagement/ControlTeamUser"
import UserListGrid from "src/components/admin/content/teamManagement/UserList"

import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'

const UserList = () => {
  const { teamName } = useAuth()
  const router = useRouter()
  const [cardData, setCardData] = useState([
    { totalUser: 0, title: "loading", avatars:['/default_avatar.png','/default_avatar.png','/default_avatar.png','/default_avatar.png']},
    { totalUser: 0, title: "loading", avatars:['/default_avatar.png','/default_avatar.png','/default_avatar.png','/default_avatar.png']},
    { totalUser: 0, title: "loading", avatars:['/default_avatar.png','/default_avatar.png','/default_avatar.png','/default_avatar.png']},
  ])
  const [listData, setListData] = useState([
    { avatar: '/default_avatar.png', position: "직책", phoneNumber:"010-1243-1243", id: "1", roles:"editor", username:"username", uid: "asdfasdfasdfas" },
  ])
  const [isLoading, setIsLoading] = useState(true)  

  
  const columns = [
  {
    flex: 0.09,
    minWidth: 180,
    field: 'fullName',
    headerName: '닉네임',
    renderCell: ({ row }) => {
      const { avatar, username } = row
      return (
        <div className={styles.user_container} onClick={()=>router.push(`/admin/user/${row.uid}`)}>
          <Avatar src={avatar} />
          <p>{username}</p>
        </div>
      )
    }
    },
  {
    flex: 0.08,
    minWidth: 160,
    headerName: '실명',
    field: 'realName',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap sx={{ textTransform: 'capitalize' }}>
          {row.realName}
        </Typography>
      )
    }
  },
  {
    flex: 0.26,
    minWidth: 330,
    field: 'uid',
    headerName: '유저 코드',
    renderCell: ({ row }) => {
      return (
        <Typography variant='body2' noWrap>
          {row.uid}
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
    flex: 0.15,
    minWidth: 100,
    headerName: '권한',
    field: 'roles',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap sx={{ textTransform: 'capitalize' }}>
          {row.roles}
        </Typography>
      )
    }
  },
  ]
  

  useEffect(() => {
    const fetchData = async () => {
      const id_list = await firebaseHooks.fetch_all_not_admin_users_uid_list(teamName)
      console.log(id_list)
      const users = await firebaseHooks.fetch_user_data_list_from_user_uid_list(id_list)
      let avatars = []
      let userList = []
      let cityAvatars = []
      let cityUserList=[]
      let id = 0;
      users.forEach((user) => {
        console.log(user.data())
        //for  ControlTeamUser.js
        avatars.push(user.data().photo)
        if (user.data().city === teamName) {
          cityAvatars.push(user.data().photo)
        }
        //for UserList.js 
        userList.push({
          avatar: user.data().photo,
          realName: user.data().realName,
          phoneNumber: user.data().phoneNumber,
          id: id,
          roles: user.data().roles[0],
          uid: user.id,
          username: user.data().name
        })
        id++
      })
      setCardData([
        { totalUsers: users.length, title: '어플 사용자 수', avatars: avatars },
        { totalUsers: cityAvatars.length, title: `${teamName} 사용자 수`, avatars: cityAvatars },
      ])
      setListData(userList)
      setIsLoading(false)
    }
    fetchData()
  },[])

  if(isLoading) return <LoaderGif mode="background"/>
  
  return (
    <div>
      <PageHeader title="사용자 현황" subtitle="어플을 사용하는 사용자 현황입니다." mt="20px"/>
      <ControlTeamUser cardData={cardData} />
      <PageHeader title="사용자 목록" subtitle={`어플의 모든 사용자 목록입니다, 변경사항은 새로고침 시 표시됩니다.`} mt="40px" />
      <UserListGrid data={listData} columns={columns} />
    </div>
  )
}
export default UserList;