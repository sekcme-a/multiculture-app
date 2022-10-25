// ** MUI Import
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import { styled } from '@mui/material/styles'
import TimelineDot from '@mui/lab/TimelineDot'
import TimelineItem from '@mui/lab/TimelineItem'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import MuiTimeline from '@mui/lab/Timeline'

// ** Icons Imports
import ArrowRight from 'mdi-material-ui/ArrowRight'
import MessageOutline from 'mdi-material-ui/MessageOutline'
import PhoneDialOutline from 'mdi-material-ui/PhoneDialOutline'

// Styled Timeline component
const Timeline = styled(MuiTimeline)({
  paddingLeft: 0,
  paddingRight: 0,
  '& .MuiTimelineItem-root': {
    width: '100%',
    '&:before': {
      display: 'none'
    }
  }
})

// Styled component for the image of a shoe
const ImgShoe = styled('img')(({ theme }) => ({
  borderRadius: theme.shape.borderRadius
}))

const TimelineLeft = () => {
  return (
    
    <Timeline >
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color='error' />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Box sx={{ mb: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant='body2' sx={{ mr: 2, fontWeight: 600, color: 'text.primary' }}>
              A 설문조사 참여
            </Typography>
            <Typography variant='caption'>2022/10/20</Typography>
          </Box>
          <Typography variant='body2'>2022/10/20 오후 3:12 에 A 설문조사를 참여했습니다.</Typography>
          <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
          </Box>
        </TimelineContent>
      </TimelineItem>


      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color='warning' />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Box sx={{ mb: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant='body2' sx={{ mr: 2, fontWeight: 600, color: 'text.primary' }}>
              B 프로그램 신청
            </Typography>
            <Typography variant='caption'>2022/10/22</Typography>
          </Box>
          <Typography variant='body2'>2022/10/22 오후 1:25 에 B 프로그램을 신청했습니다.</Typography>
          <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
          </Box>
        </TimelineContent>
      </TimelineItem>

      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color='success' />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Box sx={{ mb: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant='body2' sx={{ mr: 2, fontWeight: 600, color: 'text.primary' }}>
              프로필 변경
            </Typography>
            <Typography variant='caption'>2022/10/24</Typography>
          </Box>
          <Typography variant='body2' sx={{ mb: 2, color: 'text.primary' }}>
            사용자가 프로필을 변경하였습니다.
          </Typography>
          <Typography variant='body2' sx={{ mb: 2, color: 'text.primary' }}>
            {`"프로필 사진" 변경됨.`}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar src='/marketplace/materio-mui-react-nextjs-admin-template/demo-1/images/avatars/1.png' sx={{ width: '2rem', height: '2rem', mr: 2 }} />
            <Typography variant='subtitle2' sx={{ fontWeight: 600 }}>
              UserTcznj
            </Typography>
          </Box>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  )
}

export default TimelineLeft
