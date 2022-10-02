import { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import styles from "styles/main/menu.module.css"
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import useAuth from "src/hooks/auth/auth";

const Menu = (props) => {
  const { logout } = useAuth()
  const onCloseMenuClick = () => {
    props.handleIsMenuOpen(false)
  }

  const onLogoutClick = () => {
    logout()
  }
  
  return (
    <AnimatePresence>
      {props.isMenuOpen &&
        <motion.div
          key="modal"
          className={props.isMenuOpen ? styles.main_container : `${styles.main_container} ${styles.hide}`}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, transition: { duration: .5, }, x: 0 }}
          exit={{ opacity: 0, x: 40, transition: { duration: .5, } }}
        >
          <CloseRoundedIcon onClick={onCloseMenuClick} />
          <div onClick={onLogoutClick}>로그아웃</div>
        </motion.div>
      }
    </AnimatePresence>
  )
}

export default Menu