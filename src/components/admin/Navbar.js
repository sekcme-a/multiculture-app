import { useEffect, useState } from "react";
import styles from "styles/admin/navbar.module.css"
import Image from "next/image";
import { useRouter } from "next/router";
import useAuth from "src/hooks/auth/auth";

import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import GroupIcon from '@mui/icons-material/Group';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import FolderSharedIcon from '@mui/icons-material/FolderShared';

const Navbar = (props) => {
  const router = useRouter()
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false)
  const { teamName } = useAuth()

  const handleClick = () => {
    setOpen(!open);
  };
  const handleClick2 = () => {setOpen2(!open2)}

  const uppercase = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1)
  }

  const onClick = (loc) => {
    router.push(`/admin/${teamName}/${loc}`)
  }

  return (
    <div className={styles.main_container}>
      <div className={styles.header}>
        <Image src="/logo_2zsoft_no_text.png" width={60} height={45} />
        <div style={{marginLeft: "10px"}}>
          <h1>Admin Team </h1>
          <h2>{uppercase(props.teamName)}</h2>
        </div>
      </div>
   <List
      sx={{ width: '100%', maxWidth: 300, bgcolor: "rgba(255, 255, 255, 0.87)" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
        
      <ListItemButton onClick={handleClick2}>
        <ListItemIcon>
          <PersonOutlineIcon />
        </ListItemIcon>
        <ListItemText primary="사용자 관리" />
        {open2 ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open2} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }} onClick={()=>onClick("userList")}>
            <ListItemIcon>
              <RecentActorsIcon />
            </ListItemIcon>
            <ListItemText primary="사용자 목록" />
          </ListItemButton>
        </List>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }} onClick={()=>onClick("userProfileSettings")}>
            <ListItemIcon>
              <FolderSharedIcon />
            </ListItemIcon>
            <ListItemText primary="사용자 프로필 설정" />
          </ListItemButton>
        </List>
        </Collapse>
        

      <ListItemButton>
        <ListItemIcon>
          <DraftsIcon />
        </ListItemIcon>
        <ListItemText primary="Drafts" />
      </ListItemButton>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <GroupIcon />
        </ListItemIcon>
        <ListItemText primary="팀 관리" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }} onClick={()=>onClick("manageTeam")}>
            <ListItemIcon>
              <Diversity3Icon />
            </ListItemIcon>
            <ListItemText primary="구성원 관리" />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
    </div>
  )
}

export default Navbar