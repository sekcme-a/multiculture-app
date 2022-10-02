import { useEffect, useState } from "react"

import { firestore as db } from "firebase/firebase"
import useAuth from "src/hooks/auth/auth"
import { firebaseHooks } from "firebase/hooks"

import LoaderGif from "src/components/loader/LoaderGif"
import PageHeader from "src/components/admin/public/PageHeader"
import ControlTeamUser from "src/components/admin/content/teamManagement/ControlTeamUser"
import UserList from "src/components/admin/content/teamManagement/UserList"

const ManageTeam = () => {
  const { teamName } = useAuth()
  const [cardData, setCardData] = useState([
    { totalUser: 0, title: "loading", avatars:['/default_avatar.png','/default_avatar.png','/default_avatar.png','/default_avatar.png']},
    { totalUser: 0, title: "loading", avatars:['/default_avatar.png','/default_avatar.png','/default_avatar.png','/default_avatar.png']},
    { totalUser: 0, title: "loading", avatars:['/default_avatar.png','/default_avatar.png','/default_avatar.png','/default_avatar.png']},
  ])
  const [listData, setListData] = useState([
    { avatar: '/default_avatar.png', position: "직책", phoneNumber:"010-1243-1243", id: "1", roles:"editor", username:"username", uid: "asdfasdfasdfas" },
  ])
  const [isLoading, setIsLoading] = useState(true)  
  // const cardData = [
  //   { totalUsers: 4, title: 'Administrator', avatars: ['1.png', '2.png', '3.png', '4.png'] },
  //   { totalUsers: 7, title: 'Manager', avatars: ['5.png', '6.png', '7.png', '8.png', '1.png', '2.png', '3.png'] },
  //   { totalUsers: 5, title: 'Users', avatars: ['4.png', '5.png', '6.png', '7.png', '8.png'] },
  //   { totalUsers: 3, title: 'Support', avatars: ['1.png', '2.png', '3.png'] },
  //   { totalUsers: 2, title: 'Restricted User', avatars: ['4.png', '5.png'] }
  // ]
  useEffect(() => {
    const fetchData = async () => {
      const id_list = await firebaseHooks.fetch_admin_uid_list_from_teamname(teamName)
      const users = await firebaseHooks.fetch_user_data_list_from_user_uid_list(id_list)
      let avatars = []
      let userList = []
      let id = 0;
      users.forEach((user) => {
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
      setListData(userList)
      setIsLoading(false)
    }
    fetchData()
  },[])

  if(isLoading) return <LoaderGif mode="background"/>
  
  return (
    <div>
      <PageHeader title="팀 구성원 현황" subtitle="코드를 통해 팀 구성원을 쉽게 관리하세요." mt="20px"/>
      <ControlTeamUser cardData={cardData} />
      <PageHeader title="팀 구성원 목록" subtitle={`${teamName} 팀의 모든 구성원 목록입니다, 변경사항은 새로고침 시 표시됩니다.`} mt="40px" />
      <UserList data={listData} />
    </div>
  )
}
export default ManageTeam;