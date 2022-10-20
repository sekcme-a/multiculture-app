// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import MuiTab from '@mui/material/Tab'
import Card from '@mui/material/Card'

// ** Icons Imports
import AccountOutline from 'mdi-material-ui/AccountOutline'
// ** Demo Components Imports
import UserViewOverview from 'src/components/admin/content/userProfile/UserViewOverview'

// ** Styled Tab component
const Tab = styled(MuiTab)(({ theme }) => ({
  minHeight: 48,
  flexDirection: 'row',
  '& svg': {
    marginBottom: '0 !important',
    marginRight: theme.spacing(3)
  }
}))

const UserViewRight = (props) => {
  // ** State
  const [value, setValue] = useState('overview')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <TabContext value={value} >
      <TabList
        variant='scrollable'
        scrollButtons='auto'
        onChange={handleChange}
        aria-label='forced scroll tabs example'
      >
        <Tab value='overview' label='Overview' icon={<AccountOutline />} />
        {/* <Tab value='security' label='Security' icon={<LockOutline />} />
        <Tab value='billing-plan' label='Billing & Plan' icon={<BookmarkOutline />} />
        <Tab value='notification' label='Notification' icon={<BellOutline />} />
        <Tab value='connection' label='Connection' icon={<LinkVariant />} /> */}
      </TabList>
      <Box sx={{ mt: 2 }} >
        <TabPanel sx={{ p: 0 }} value='overview' >
          <Card>
            <UserViewOverview profile_settings={props.profile_settings} additional_data={props.additional_data} />
          </Card>
        </TabPanel>
        {/* <TabPanel sx={{ p: 0 }} value='security'>
          <UserViewSecurity />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='billing-plan'>
          <UserViewBilling />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='notification'>
          <UserViewNotification />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='connection'>
          <UserViewConnection />
        </TabPanel> */}
      </Box>
    </TabContext>
  )
}

export default UserViewRight
