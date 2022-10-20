import useAuth from "src/hooks/auth/auth"
import { useRouter } from "next/router"
import Link from "next/link"

import HeaderRightClose from "src/components/public/HeaderRIghtClose"
import MyPageProfile from "src/components/myPage/MyPageProfile"
import HorizontalBanner from "src/components/public/HorizontalBanner"
import ItemContainer from "src/components/myPage/ItemContainer"

import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import Diversity2OutlinedIcon from '@mui/icons-material/Diversity2Outlined';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import AodOutlinedIcon from '@mui/icons-material/AodOutlined';
import NotListedLocationOutlinedIcon from '@mui/icons-material/NotListedLocationOutlined';
import DeviceUnknownOutlinedIcon from '@mui/icons-material/DeviceUnknownOutlined';
import NewspaperOutlinedIcon from '@mui/icons-material/NewspaperOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import ContactPageOutlinedIcon from '@mui/icons-material/ContactPageOutlined';
import DocumentScannerOutlinedIcon from '@mui/icons-material/DocumentScannerOutlined';

//내 정보 관리, 내게 온 알림, 신청한 프로그램, 설문조사 기록, 공지사항, 센터 문의
//소식(한다뉴), 서비스 이용약관, 개인정보 처리방침, FAQ, 로그아웃
const MyPage = () => {
  const { logout } = useAuth()
  const router = useRouter()
  const iconStyle = { color: "#814ad8" }
  
  const onLogoutClick = () => {
    logout()
    router.push("/")
  }
  const itemData = [
    {
      title: "내 정보 관리", 
      subtitle: "어플에 입력할 정보를 관리할 수 있습니다.",
      icon: <AccountBoxOutlinedIcon style={iconStyle} />,
      onClick: ()=>{router.push("/myProfile")}
    },
    {
      title: "내게 온 알림", 
      subtitle: "자신에게 필요한 맞춤 알림을 확인하세요.",
      icon: <CampaignOutlinedIcon style={iconStyle} />
    },
    {
      title: "신청한 프로그램 기록", 
      subtitle: "신청했던 프로그램 목록들을 확인하세요.",
      icon: <Diversity2OutlinedIcon style={iconStyle} />
    },
    {
      title: "설문조사 기록", 
      subtitle: "참여했던 설문조사의 목록을 확인하세요.",
      icon: <AodOutlinedIcon style={iconStyle} />
    },
    {
      title: "공지사항", 
      subtitle: "센터와 어플에서 보낸 공지사항입니다.",
      icon: <CampaignOutlinedIcon style={iconStyle} />
    },
    {
      title: "센터 문의", 
      subtitle: "센터에 직접 궁금한 사항을 물어보세요.",
      icon: <SupportAgentOutlinedIcon style={iconStyle} />
    },
    {
      title: "다문화 소식", 
      subtitle: "한국다문화뉴스의 다문화 소식을 확인하세요.",
      icon: <NewspaperOutlinedIcon style={iconStyle} />
    },
    {
      title: "서비스 이용약관", 
    },
    {
      title: "개인정보 처리방침", 
    },
    {
      title: "FAQ", 
    },
    {
      title: "로그아웃", 
      onClick: onLogoutClick
    },

  ]
  return (
    <>
      <HeaderRightClose title="마이 페이지" />
      <Link href="/myProfile">
        <a>
          <MyPageProfile />
        </a>
      </Link>
      <HorizontalBanner src="/banner_ad.png" />
      {
        itemData.map((item, index) => {
          return(
            <ItemContainer key={index} title={item.title} subtitle={item.subtitle} icon={item.icon} onClick={item.onClick} />
          )
        })
      }
    </>
  )
}

export default MyPage