// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Select from '@mui/material/Select'
import Switch from '@mui/material/Switch'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import InputAdornment from '@mui/material/InputAdornment'
import LinearProgress from '@mui/material/LinearProgress'
import FormControlLabel from '@mui/material/FormControlLabel'
import DialogContentText from '@mui/material/DialogContentText'
import Avatar from "@mui/material/Avatar"

// ** Icons Imports
import Check from 'mdi-material-ui/Check'
import Circle from 'mdi-material-ui/Circle'
import BriefcaseVariantOutline from 'mdi-material-ui/BriefcaseVariantOutline'



// ** Styled <sup> component
const Sup = styled('sup')(({ theme }) => ({
  top: '0.2rem',
  left: '-0.6rem',
  position: 'absolute',
  color: theme.palette.primary.main
}))

// ** Styled <sub> component
const Sub = styled('sub')({
  fontWeight: 300,
  fontSize: '1rem',
  alignSelf: 'flex-end'
})

const roleColors = {
  admin: 'error',
  editor: 'info',
  author: 'warning',
  maintainer: 'success',
  subscriber: 'primary'
}

const statusColors = {
  active: 'success',
  pending: 'warning',
  inactive: 'secondary'
}

const UserViewLeft = ({ data }) => {
  // ** States
  const [openEdit, setOpenEdit] = useState(false)
  const [openPlans, setOpenPlans] = useState(false)

  // Handle Edit dialog
  const handleEditClickOpen = () => setOpenEdit(true)
  const handleEditClose = () => setOpenEdit(false)

  // Handle Upgrade Plan dialog
  const handlePlansClickOpen = () => setOpenPlans(true)
  const handlePlansClose = () => setOpenPlans(false)

  const renderUserAvatar = () => {
    if (data) {
      if (data.photo) {
        return (
          <Avatar src={data.photo} sx={{ width: 130, height: 130 }} variant="rounded"/>
        )
      } else {
        return (
          <Avatar src={data.photo} />
        )
      }
    } else {
      return null
    }
  }
  if (data) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardContent sx={{ pt: 10, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              {renderUserAvatar()}
              <Typography variant='h5' sx={{ mt: 2 , color: "purple"}} textTransform="capitalize">
                {data.name}
              </Typography>
              <Typography variant='h7' sx={{ color: "gray"}}>
                {data.roles[0]}
              </Typography>
            </CardContent>

            {/* <CardContent sx={{ mt: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box sx={{ mr: 8, display: 'flex', alignItems: 'center' }}>
                  <CustomAvatar skin='light' variant='rounded' sx={{ mr: 3 }}>
                    <Check />
                  </CustomAvatar>
                  <Box>
                    <Typography variant='h6' sx={{ lineHeight: 1.3 }}>
                      1.23k
                    </Typography>
                    <Typography variant='body5'>Task Done</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CustomAvatar skin='light' variant='rounded' sx={{ mr: 3 }}>
                    <BriefcaseVariantOutline />
                  </CustomAvatar>
                  <Box>
                    <Typography variant='h6' sx={{ lineHeight: 1.3 }}>
                      568
                    </Typography>
                    <Typography variant='body5'>Project Done</Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent> */}

            <CardContent>
              <Typography variant='h6'>Details</Typography>
              <Divider />
              <Box sx={{ pt: 2, pb: 2 }}>
                <Box sx={{ display: 'flex', mb: 1.5, alignItems:"center" }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '1rem' }}>닉네임:</Typography>
                  <Typography variant='body5'>{data.name}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 1.5, alignItems:"center" }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '1rem' }}>실명:</Typography>
                  <Typography variant='body5'>{data.realName}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 1.5, alignItems:"center" }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '1rem' }}>전화번호:</Typography>
                  <Typography variant='body5' sx={{ textTransform: 'capitalize' }}>
                    {data.phoneNumber}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 1.5, alignItems:"center" }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '1rem' }}>지역선택:</Typography>
                  <Typography variant='body5' sx={{ textTransform: 'capitalize' }}>
                    {data.city}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 1.5, alignItems:"center" }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '1rem' }}>로그인 경로:</Typography>
                  <Typography variant='body5' >
                    {data.providerId}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 1.5, alignItems:"center" }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '1rem' }}>언어 선택:</Typography>
                  <Typography variant='body5' sx={{ textTransform: 'capitalize' }}>
                    {data.language}
                  </Typography>
                </Box>
              </Box>
            </CardContent>

            {/* <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button variant='contained' sx={{ mr: 3 }} onClick={handleEditClickOpen}>
                Edit
              </Button>
              <Button color='error' variant='outlined'>
                Suspend
              </Button>
            </CardActions> */}

            <Dialog
              open={openEdit}
              onClose={handleEditClose}
              aria-labelledby='user-view-edit'
              sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650, p: [2, 10] } }}
              aria-describedby='user-view-edit-description'
            >
              <DialogTitle id='user-view-edit' sx={{ textAlign: 'center', fontSize: '1.5rem !important' }}>
                Edit User Information
              </DialogTitle>
              <DialogContent>
                <DialogContentText variant='body5' id='user-view-edit-description' sx={{ textAlign: 'center', mb: 7 }}>
                  Updating user details will receive a privacy audit.
                </DialogContentText>
                <form>
                  <Grid container spacing={6}>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label='Full Name' defaultValue={data.fullName} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label='Username'
                        defaultValue={data.username}
                        InputProps={{ startAdornment: <InputAdornment position='start'>@</InputAdornment> }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth type='email' label='Billing Email' defaultValue={data.email} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel id='user-view-status-label'>Status</InputLabel>
                        <Select
                          label='Status'
                          defaultValue={data.status}
                          id='user-view-status'
                          labelId='user-view-status-label'
                        >
                          <MenuItem value='pending'>Pending</MenuItem>
                          <MenuItem value='active'>Active</MenuItem>
                          <MenuItem value='inactive'>Inactive</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label='TAX ID' defaultValue='Tax-8894' />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label='Contact' defaultValue={`+1 ${data.contact}`} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel id='user-view-language-label'>Language</InputLabel>
                        <Select
                          label='Language'
                          defaultValue='English'
                          id='user-view-language'
                          labelId='user-view-language-label'
                        >
                          <MenuItem value='English'>English</MenuItem>
                          <MenuItem value='Spanish'>Spanish</MenuItem>
                          <MenuItem value='Portuguese'>Portuguese</MenuItem>
                          <MenuItem value='Russian'>Russian</MenuItem>
                          <MenuItem value='French'>French</MenuItem>
                          <MenuItem value='German'>German</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel id='user-view-country-label'>Country</InputLabel>
                        <Select
                          label='Country'
                          defaultValue='USA'
                          id='user-view-country'
                          labelId='user-view-country-label'
                        >
                          <MenuItem value='USA'>USA</MenuItem>
                          <MenuItem value='UK'>UK</MenuItem>
                          <MenuItem value='Spain'>Spain</MenuItem>
                          <MenuItem value='Russia'>Russia</MenuItem>
                          <MenuItem value='France'>France</MenuItem>
                          <MenuItem value='Germany'>Germany</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlLabel
                        label='Use as a billing address?'
                        control={<Switch defaultChecked />}
                        sx={{ '& .MuiTypography-root': { fontWeight: 500 } }}
                      />
                    </Grid>
                  </Grid>
                </form>
              </DialogContent>
              <DialogActions sx={{ justifyContent: 'center' }}>
                <Button variant='contained' sx={{ mr: 1 }} onClick={handleEditClose}>
                  Submit
                </Button>
                <Button variant='outlined' color='secondary' onClick={handleEditClose}>
                  Discard
                </Button>
              </DialogActions>
            </Dialog>
          </Card>
        </Grid>

        {/* <Grid item xs={12}>
          <Card sx={{ boxShadow: 'none', border: theme => `2px solid ${theme.palette.primary.main}` }}>
            <CardContent
              sx={{ display: 'flex', flexWrap: 'wrap', pb: '0 !important', justifyContent: 'space-between' }}
            >
              <Box sx={{ display: 'flex', position: 'relative' }}>
                <Sup>$</Sup>
                <Typography
                  variant='h3'
                  sx={{
                    mb: -1.2,
                    lineHeight: 1,
                    fontWeight: 600,
                    color: 'primary.main',
                    fontSize: '3rem !important'
                  }}
                >
                  99
                </Typography>
                <Sub>/ month</Sub>
              </Box>
            </CardContent>

            <CardContent>
              <Box sx={{ mt: 4, mb: 5 }}>
                <Box sx={{ display: 'flex', mb: 2.5, alignItems: 'center' }}>
                  <Circle sx={{ mr: 2, fontSize: '0.625rem', color: 'text.secondary' }} />
                  <Typography component='span' sx={{ fontSize: '1rem' }}>
                    10 Users
                  </Typography>
                </Box>
                <Box sx={{ mt: 2.5, display: 'flex', mb: 2.5, alignItems: 'center' }}>
                  <Circle sx={{ mr: 2, fontSize: '0.625rem', color: 'text.secondary' }} />
                  <Typography component='span' sx={{ fontSize: '1rem' }}>
                    Up to 10GB storage
                  </Typography>
                </Box>
                <Box sx={{ mt: 2.5, display: 'flex', mb: 2.5, alignItems: 'center' }}>
                  <Circle sx={{ mr: 2, fontSize: '0.625rem', color: 'text.secondary' }} />
                  <Typography component='span' sx={{ fontSize: '1rem' }}>
                    Basic Support
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', mb: 2, justifyContent: 'space-between' }}>
                <Typography sx={{ fontWeight: 600, fontSize: '1rem' }}>Days</Typography>
                <Typography sx={{ fontWeight: 600, fontSize: '1rem' }}>26 of 30 Days</Typography>
              </Box>
              <LinearProgress value={86.66} variant='determinate' sx={{ height: 8, borderRadius: '5px' }} />
              <Typography variant='body5' sx={{ mt: 2, mb: 4 }}>
                4 days remaining
              </Typography>
              <Button variant='contained' sx={{ width: '100%' }} onClick={handlePlansClickOpen}>
                Upgrade Plan
              </Button>
            </CardContent>

            <Dialog
              open={openPlans}
              onClose={handlePlansClose}
              aria-labelledby='user-view-plans'
              aria-describedby='user-view-plans-description'
              sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650, pt: 8, pb: 8 } }}
            >
              <DialogTitle id='user-view-plans' sx={{ textAlign: 'center', fontSize: '1.5rem !important' }}>
                Upgrade Plan
              </DialogTitle>

              <DialogContent>
                <DialogContentText variant='body5' sx={{ textAlign: 'center' }} id='user-view-plans-description'>
                  Choose the best plan for the user.
                </DialogContentText>
              </DialogContent>

              <DialogContent
                sx={{
                  display: 'flex',
                  pb: 8,
                  pl: [6, 15],
                  pr: [6, 15],
                  alignItems: 'center',
                  flexWrap: ['wrap', 'nowrap'],
                  pt: theme => `${theme.spacing(2)} !important`
                }}
              >
                <FormControl fullWidth size='small' sx={{ mr: [0, 3], mb: [3, 0] }}>
                  <InputLabel id='user-view-plans-select-label'>Choose Plan</InputLabel>
                  <Select
                    label='Choose Plan'
                    defaultValue='Standard'
                    id='user-view-plans-select'
                    labelId='user-view-plans-select-label'
                  >
                    <MenuItem value='Basic'>Basic - $0/month</MenuItem>
                    <MenuItem value='Standard'>Standard - $99/month</MenuItem>
                    <MenuItem value='Enterprise'>Enterprise - $499/month</MenuItem>
                    <MenuItem value='Company'>Company - $999/month</MenuItem>
                  </Select>
                </FormControl>
                <Button variant='contained' sx={{ minWidth: ['100%', 0] }}>
                  Upgrade
                </Button>
              </DialogContent>

              <Divider sx={{ m: 0 }} />

              <DialogContent sx={{ pt: 8, pl: [6, 15], pr: [6, 15] }}>
                <Typography sx={{ fontWeight: 500, mb: 2, fontSize: '1rem' }}>
                  User current plan is standard plan
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: ['wrap', 'nowrap'],
                    justifyContent: 'space-between'
                  }}
                >
                  <Box sx={{ mr: 3, display: 'flex', ml: 2.4, position: 'relative' }}>
                    <Sup>$</Sup>
                    <Typography
                      variant='h3'
                      sx={{
                        mb: -1.2,
                        lineHeight: 1,
                        color: 'primary.main',
                        fontSize: '3rem !important'
                      }}
                    >
                      99
                    </Typography>
                    <Sub>/ month</Sub>
                  </Box>
                  <Button color='error' variant='outlined' sx={{ mt: 2 }}>
                    Cancel Subscription
                  </Button>
                </Box>
              </DialogContent>
            </Dialog>
          </Card>
        </Grid> */}
      </Grid>
    )
  } else {
    return null
  }
}

export default UserViewLeft
