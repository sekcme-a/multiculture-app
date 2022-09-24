import { text } from "data/text"
import { translate } from 'src/hooks/translate'
// import useUserData from 'src/context/useUserData'

export const fetchText = (address, language) => {
  // const { language, setLanguage } = useUserData()

  return new Promise(async function (resolve, reject) {
    try {
      if (address === "index") {
        if (language === "ko")
          resolve({ program: text.index.program.ko, all: text.index.all.ko })
        else if (language === "zh")
          resolve({ program: text.index.program.zh, all: text.index.all.zh})
        else if (language === "en")
          resolve({ program: text.index.program.en, all: text.index.all.en})
        // else if (language === "zh") {
        //   const hi = await translate(text.index.program.ko, "ko", "zh")
        //   resolve({ hi: hi})
        // }
      }
    } catch (e) {
      console.log(e)
      reject(e)
    }
  })
}