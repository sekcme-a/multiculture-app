import "styles/reset.css"
import "styles/quill.css"
import { useEffect, useState } from "react"
import Head from "next/head"
import { useRouter } from "next/router"
import { UserDataProvider } from "src/context/useUserData"
import AuthStateChanged from "src/hooks/auth/AuthStateChanged"
import { AuthProvider } from "src/hooks/auth/auth"
import LanguageSpeedDial from "src/components/public/LanguageSpeedDial"
import BottomNavigation from "src/components/public/BottomNavigation"
import { IntlProvider, addLocaleData } from 'react-intl';
import { ThemeProvider, createTheme } from '@mui/material/styles';
// 이 서브 라이브러리들이 내 locale 파일을 사용할 수 있게 해준다
// import en from 'react-intl/locale-data/en';
// import ko from 'react-intl/locale-data/ko';
// import zh from 'react-intl/locale-data/zh';
import locale_en from 'locales/en.json';
import locale_kr from 'locales/kr.json';
import locale_zh from 'locales/zh.json';

// addLocaleData([...en, ...ko, ...zh]);

// 저장되어 있는 언어 데이터를 가져온다
const theme = createTheme({
  palette: {
    primary: {
      main: '#814ad8'
    }
  }
});

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const [language, setLanguage] = useState("ko")
  const [messages, setMessages] = useState()
  // const { language, setLanguage,  fetchText, groups, setGroups } = useUserData()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const locale = localStorage.getItem('language') || 'ko';
      setLanguage(locale)
      setMessages({ en: locale_en, ko: locale_kr, zh: locale_zh, vi: locale_kr, ja: locale_kr, th:locale_kr }[locale])
      console.log(locale)
      // localStorage.removeItem("history_program")
    }
    // if (typeof window !== 'undefined'){
    //   const locale = localStorage.getItem('language') || 'ko'
    //   setLanguage(locale)
    //   setMessages({ en: locale_en, ko: locale_kr, zh: locale_zh, vi: locale_kr, ja: locale_kr, th:locale_kr }[locale])
    // }
  },[])
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=Cute+Font&family=Dongle&family=East+Sea+Dokdo&family=Gamja+Flower&family=Gothic+A1&family=Jua&family=Nanum+Gothic&family=Nanum+Pen+Script&family=Noto+Sans+KR&display=swap" rel="stylesheet"></link>
        <meta name="google-site-verification" content="bLFivCjbVcRRhfLlSY8tACo_lPHtIgUdWIMCNKuCH0g" />
      </Head>
      <AuthProvider>
        <AuthStateChanged>
          <ThemeProvider theme={theme}>
            <IntlProvider locale={language} messages={{ en: locale_en, ko: locale_kr, zh: locale_zh, vi: locale_kr, ja: locale_kr, th:locale_kr }[language]}>
              <UserDataProvider>
                <Component {...pageProps} />
                {!router.pathname.includes("admin")&& router.pathname!=="/" && <BottomNavigation />}
                {/* {!router.pathname.includes("admin") && <LanguageSpeedDial setLang={setLanguage} />} */}

              </UserDataProvider>
            </IntlProvider>
          </ThemeProvider>
        </AuthStateChanged>
      </AuthProvider>
    </>
  ) 
}

export default MyApp
