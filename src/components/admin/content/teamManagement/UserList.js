// ** React Imports
import { useEffect, useCallback, useState } from 'react'
import styles from "styles/components/admin/content/teamManagement/userList.module.css"

// ** Next Images
import Link from 'next/link'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import { DataGrid } from '@mui/x-data-grid'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'

// ** Icons Imports


// ** Styled component for the link for the avatar with image
const AvatarWithImageLink = styled(Link)(({ theme }) => ({
  marginRight: theme.spacing(3)
}))

// ** Styled component for the link for the avatar without image
const AvatarWithoutImageLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  marginRight: theme.spacing(3)
}))

// ** renders client column
// const renderClient = row => {
//   if (row.avatar.length) {
//     return (
//       <AvatarWithImageLink href={`/apps/user/view/${row.id}`}>
//         <Avatar src={row.avatar} sx={{ mr: 3, width: 30, height: 30 }} />
//       </AvatarWithImageLink>
//     )
//   } else {
//     return (
//       <AvatarWithoutImageLink href={`/apps/user/view/${row.id}`}>
//         <Avatar skin='light' color={row.avatarColor} sx={{ mr: 3, width: 30, height: 30, fontSize: '.875rem' }}>
//           {row.fullName}
//         </Avatar>
//       </AvatarWithoutImageLink>
//     )
//   }
// }

const columns = [
  {
    flex: 0.09,
    minWidth: 180,
    field: 'fullName',
    headerName: '이름',
    renderCell: ({ row }) => {
      const { avatar, username } = row
      return (
        <div className={styles.user_container}>
          <Avatar src={avatar} />
          <p>{username}</p>
        </div>
      )
    }
  },

  //     return (
  //       <Box sx={{ display: 'flex', alignItems: 'center' }}>
  //         {/* {renderClient(row)} */}
  //         <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
  //           <Link href={`/apps/user/view/${id}`} passHref>
  //             <Typography
  //               noWrap
  //               component='a'
  //               variant='body2'
  //               sx={{ fontWeight: 600, color: 'text.primary', textDecoration: 'none' }}
  //             >
  //               {fullName}
  //             </Typography>
  //           </Link>
  //           <Link href={`/apps/user/view/${id}`} passHref>
  //             <Typography noWrap component='a' variant='caption' sx={{ textDecoration: 'none' }}>
  //               @{username}
  //             </Typography>
  //           </Link>
  //         </Box>
  //       </Box>
  //     )
  //   }
  // },
  {
    flex: 0.26,
    minWidth: 250,
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
    flex: 0.14,
    minWidth:120,
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
  // {
  //   flex: 0.2,
  //   minWidth: 250,
  //   field: 'email',
  //   headerName: 'Email',
  //   renderCell: ({ row }) => {
  //     return (
  //       <Typography variant='body2' noWrap>
  //         {row.email}
  //       </Typography>
  //     )
  //   }
  // },
  {
    flex: 0.11,
    minWidth: 120,
    headerName: '직책',
    field: 'currentPlan',
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
  // {
  //   flex: 0.1,
  //   minWidth: 100,
  //   sortable: false,
  //   field: 'actions',
  //   headerName: 'Actions',
  //   renderCell: ({ row }) => (
  //     <Link href={`/apps/user/view/${row.id}`} passHref>
  //       <IconButton>
  //         <EyeOutline />
  //       </IconButton>
  //     </Link>
  //   )
  // }
]

const UserList = (props) => {
  // ** State
  const [plan, setPlan] = useState('')
  const [value, setValue] = useState('')
  const [pageSize, setPageSize] = useState(10)

  const handleFilter = useCallback(val => {
    setValue(val)
  }, [])

  const handlePlanChange = useCallback(e => {
    setPlan(e.target.value)
  }, [])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          {/* <TableHeader plan={plan} value={value} handleFilter={handleFilter} handlePlanChange={handlePlanChange} /> */}
          <DataGrid
            autoHeight
            rows={props.data}
            columns={columns}
            checkboxSelection
            pageSize={pageSize}
            disableSelectionOnClick
            rowsPerPageOptions={[10, 25, 50]}
            onPageSizeChange={newPageSize => setPageSize(newPageSize)}
          />
        </Card>
      </Grid>
    </Grid>
  )
}

export default UserList
