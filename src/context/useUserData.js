import { createContext, useState, useContext } from "react"
import { translate } from "src/hooks/translate"
import { useIntl } from "react-intl"; 

const userDataContext = createContext()

export default function useUserData(){
  return useContext(userDataContext)
}

export function UserDataProvider(props){
  const [language, setLanguage] = useState("")
  const [groups, setGroups] = useState([])
  const intl = useIntl()

  const fetchText = (id, lang) => {
    console.log(language)
    return new Promise(async function (resolve, reject) {
      try {
        // if (lang === "ko") {
          // resolve(intl.formatMessage({ id: id }))
          //번역 완료 시 아래의 코드로 바꾸기.
        if (lang === "ko" || lang === "en" || lang === "zh") {
          resolve( intl.formatMessage({id:id}))
        } else {
          if (lang === "")
            resolve(intl.formatMessage({ id: id }))
          else {
            const res = await translate(intl.formatMessage({ id: id }), "ko", lang)
            resolve(res)
          }
        }
      } catch (e) {
        alert(e)
      }
    })
  }

  const value = {
    language,
    groups,
    setGroups,
    setLanguage,
    fetchText
  }

  return <userDataContext.Provider value={value} {...props} />
}