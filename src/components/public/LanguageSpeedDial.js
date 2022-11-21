import * as React from 'react';
import styles from "styles/components/public/languageSpeedDial.module.css"
import useUserData from 'src/context/useUserData';
import { useRouter } from 'next/router';

import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import TranslateIcon from '@mui/icons-material/Translate';

const actions = [
  {
    icon: <div className={styles.flag_container}>
      <img
        alt="flag"
        src="http://purecatamphetamine.github.io/country-flag-icons/3x2/KR.svg" />
    </div>,
    name: '한국어',
    code:"ko",
  },
  {
    icon: <div className={styles.flag_container}>
      <img
        alt="flag"
        src="http://purecatamphetamine.github.io/country-flag-icons/3x2/US.svg" />
    </div>,
    name: 'English',
    code:"en",
  },
  {
    icon: <div className={styles.flag_container}>
      <img
        alt="flag"
        src="http://purecatamphetamine.github.io/country-flag-icons/3x2/CN.svg" />
    </div>,
    name: '汉语',
    code: "zh",
  },
  {
    icon: <div className={styles.flag_container}>
      <img
        alt="flag"
        src="http://purecatamphetamine.github.io/country-flag-icons/3x2/VN.svg" />
    </div>,
    name: 'Tiếng Việt',
    code:"vi",
  },
  {
    icon: <div className={styles.flag_container}>
      <img
        alt="flag"
        src="http://purecatamphetamine.github.io/country-flag-icons/3x2/JP.svg" />
    </div>,
    name: '日本语',
    code:"ja",
  },
  {
    icon: <div className={styles.flag_container}>
      <img
        alt="flag"
        src="http://purecatamphetamine.github.io/country-flag-icons/3x2/TH.svg" />
    </div>,
    name: 'ภาษาไทย',
    code:"th",
  },

];


const LanguageSpeedDial = ({setLang}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { language, setLanguage } = useUserData()
  const router = useRouter()

  const onClick = (code) => {
    handleClose()
    localStorage.setItem("language", code)
    setLanguage(code)
    setLang(code)
  }
  return (
    <div className={styles.main_container}>
      <Box sx={{ height: 330, transform: 'translateZ(0px)', flexGrow: 1 }}>
        <Backdrop open={open}  />
        <SpeedDial
          ariaLabel="SpeedDial tooltip example"
          sx={router.pathname.includes("article") ?
            { position: 'absolute', bottom: 90, right: 16 }
            :
            { position: 'absolute', bottom: 16, right: 16 }
          }
          icon={<TranslateIcon />}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              tooltipOpen
              onClick={()=>onClick(action.code)}
            />
          ))}
        </SpeedDial>
      </Box>
    </div>
  )
}

export default LanguageSpeedDial