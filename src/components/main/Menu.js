import { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import styles from "styles/main/menu.module.css"
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const Menu = (props) => {
  const onCloseMenuClick = () => {
    props.handleIsMenuOpen(false)
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
        </motion.div>
      }
    </AnimatePresence>
  )
}

export default Menu