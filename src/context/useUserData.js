import { createContext, useState, useContext } from "react"

const userDataContext = createContext()

export default function useUserData(){
  return useContext(userDataContext)
}

export const UserDataProvider = (props) => {
  const [language, setLanguage] = useState("")
  const [groups, setGroups] = useState([])

  const value = {
    language,
    groups,
    setGroups,
    setLanguage,
  }

  return <userDataContext.Provider value={value} {...props} />
}