import { useEffect, useState } from "react"

import { firestore as db } from "firebase/firebase"
import useAuth from "src/hooks/auth/auth"
import { firebaseHooks } from "firebase/hooks"

import PageHeader from "src/components/admin/public/PageHeader"
import ControlTeamUser from "src/components/admin/content/teamManagement/ControlTeamUser"

const ManageTeam = () => {
  const { teamName } = useAuth()
  const [cardData, setCardData] = useState([
    { totalUser: 0, title: "loading", avatars:['/default_avatar.png','/default_avatar.png','/default_avatar.png','/default_avatar.png']},
    { totalUser: 0, title: "loading", avatars:['/default_avatar.png','/default_avatar.png','/default_avatar.png','/default_avatar.png']},
    { totalUser: 0, title: "loading", avatars:['/default_avatar.png','/default_avatar.png','/default_avatar.png','/default_avatar.png']},
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
      users.forEach((user) => {
        avatars.push(user.photo)
      })
      setCardData([
        { totalUsers: users.length, title: '팀 구성원', avatars: avatars },
        // { totalUsers: 7, title: 'Manager', avatars: ['5.png', '6.png', '7.png', '8.png', '1.png', '2.png', '3.png',] },
        // { totalUsers: 5, title: 'Users', avatars: ['4.png', '5.png', '6.png', '7.png', '8.png'] },
        // { totalUsers: 3, title: 'Support', avatars: ['1.png', '2.png', '3.png'] },
        // { totalUsers: 2, title: 'Restricted User', avatars: ['4.png', '5.png'] }
      ])
      setIsLoading(false)
    }
    fetchData()
  },[])

  if (isLoading)
    return (<></>)
  
  return (
    <div>
      <PageHeader title="팀 구성원 목록" subtitle="코드를 통해 팀 구성원을 쉽게 관리하세요." />
      <ControlTeamUser cardData={cardData} />
    </div>
  )
}
export default ManageTeam;