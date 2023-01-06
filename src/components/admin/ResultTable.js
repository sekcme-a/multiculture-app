
import { useEffect, useState } from "react"
import styles from "styles/components/admin/content/teamManagement/userList.module.css"
import { useRouter } from "next/router"

import { firestore as db } from "firebase/firebase"
import useAuth from "src/hooks/auth/auth"
import { firebaseHooks } from "firebase/hooks"

import LoaderGif from "src/components/loader/LoaderGif"
import PageHeader from "src/components/admin/public/PageHeader"
import ControlTeamUser from "src/components/admin/content/teamManagement/ControlTeamUser"
import UserList from "src/components/admin/content/teamManagement/UserList"

import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import { DataGrid, GridRow, GridRowCount, gridRowCountSelector, GridRowParams } from '@mui/x-data-grid'
import ServerSideToolbar from "./ServerSideToolbar"
const ManageTeam = ({type, docId}) => {
  const { teamName } = useAuth()
  const [pageSize, setPageSize] = useState(10)
  const [columns, setColumns] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [title, setTitle] = useState("")
    const [listData, setListData] = useState([
    ])
  
  const router = useRouter()
  
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

  const find = (row, id) => {
    console.log(row)
    for (const item of row) {
      console.log(item)
      if (item.id === id)
        console.log(item.text)
        return item.text
    }
  }
  

  useEffect(() => {
    const fetchData = async () => {
      let columnsList = [
        { field: "uid", headerName: "유저코드", maxWidth: 100 },
        { field: "name", headerName: "실명", minWidth: 130 },
        { field: "phone", headerName: "전화번호", minWidth: 180 },
        { field: "space", headerName:"", width: 0},
      ]
      let rowsList = []
      db.collection("contents").doc(teamName).collection(type).doc(docId).collection("result").get().then((query) => {
        query.docs.map(async (doc, index) => {
          let temp = {}
          
          console.log(doc.id)

          //해당 유저의 유저데이터 가져오기


          const userDoc = await db.collection("users").doc(doc.id).get()
            let tempDataList = {id: index,uid: doc.id, name: userDoc.data().realName, phone: userDoc.data().phoneNumber}

            doc.data().data.map((item, index) => {
              if (typeof (item.value) === "object") {
                if (item.value.length !== undefined) {
                  let tempString = ""
                  item.value.map((asdf, index) => {
                    if (index === 0)
                      tempString = asdf
                    else
                      tempString = `${tempString},${asdf}`
                  })
                  console.log(tempString)
                  tempDataList = { ...tempDataList, [item.id]: item.value }
                }
                else
                 tempDataList = { ...tempDataList, [item.id]: item.value.toDate().toLocaleString('ko-KR').replace(/\s/g, '') }
              } else
                tempDataList = { ...tempDataList, [item.id]: item.value }
            })
          
            // rowsList.push({id: index})

          rowsList = [...rowsList, tempDataList]

          setListData(rowsList)
        })
        // setListData([
        //   {id: 0, VsWhMcspFBBUT1p35TdC:"첫번째필드", olh2yCYaYHAJbCu5GD1g: "두번째필드", NRr1nznZUo1rlyFuqhMd:"세번째필드"},
        //   {id: 1, VsWhMcspFBBUT1p35TdC:"첫번째필드2", olh2yCYaYHAJbCu5GD1g: "두번째필드2", NRr1nznZUo1rlyFuqhMd:"세번째필드2"}
        // ])
      db.collection("contents").doc(teamName).collection(type).doc(docId).get().then((doc) => {
        setTitle(doc.data().title)
        doc.data().form.map((item) => {
          columnsList.push({
            minWidth: 130,
            // width: 300,
            headerName: item.title,
            field: item.id,
          })
        })
        setColumns(columnsList)
        console.log(columnsList)
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
        onRowDoubleClick={(data) => { router.push(`/admin/user/${data.row.uid}`) }}
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
