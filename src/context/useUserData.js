import { createContext, useState, useContext } from "react"

const userDataContext = createContext()

export default function useUserData(){
  return useContext(userDataContext)
}

export const UserDataProvider = (props) => {
  const [language, setLanguage] = useState("ko")

  const value = {
    language,
    setLanguage,
  }

  return <userDataContext.Provider value={value} {...props} />
}