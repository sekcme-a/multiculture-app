import { text } from "data/text"
import { translate } from 'src/hooks/translate'
// import useUserData from 'src/context/useUserData'

export const fetchText = (address, language) => {
  // const { language, setLanguage } = useUserData()

  return new Promise(async function (resolve, reject) {
    try {

      
if ( address === "index") {  if (language==="ko")
    resolve({program : text[0].data[0].ko, all : text[0].data[1].ko, })
  else if (language==="en")
    resolve({program : text[0].data[0].en, all : text[0].data[1].en, })
  else if (language==="zh")
    resolve({program : text[0].data[0].zh, all : text[0].data[1].zh, })
  else if(language==="vi"){
    const program = await translate(text[0].data[0].ko, "ko", "vi")
    const all = await translate(text[0].data[1].ko, "ko", "vi")
    resolve({program: program, all: all, })
}
}
else if ( address === "login") {
  if (language==="ko")
    resolve({back : text[1].data[0].ko, email : text[1].data[1].ko, password : text[1].data[2].ko, login : text[1].data[3].ko, find_password : text[1].data[4].ko, sign_in : text[1].data[5].ko, continue_with_apple : text[1].data[6].ko, continue_with_google : text[1].data[7].ko, continue_with_facebook : text[1].data[8].ko, })
  else if (language==="en")
    resolve({back : text[1].data[0].en, email : text[1].data[1].en, password : text[1].data[2].en, login : text[1].data[3].en, find_password : text[1].data[4].en, sign_in : text[1].data[5].en, continue_with_apple : text[1].data[6].en, continue_with_google : text[1].data[7].en, continue_with_facebook : text[1].data[8].en, })
  else if (language==="zh")
    resolve({back : text[1].data[0].zh, email : text[1].data[1].zh, password : text[1].data[2].zh, login : text[1].data[3].zh, find_password : text[1].data[4].zh, sign_in : text[1].data[5].zh, continue_with_apple : text[1].data[6].zh, continue_with_google : text[1].data[7].zh, continue_with_facebook : text[1].data[8].zh, })
  else if(language==="vi"){
    const back = await translate(text[1].data[0].ko, "ko", "vi")
    const email = await translate(text[1].data[1].ko, "ko", "vi")
    const password = await translate(text[1].data[2].ko, "ko", "vi")
    const login = await translate(text[1].data[3].ko, "ko", "vi")
    const find_password = await translate(text[1].data[4].ko, "ko", "vi")
    const sign_in = await translate(text[1].data[5].ko, "ko", "vi")
    const continue_with_apple = await translate(text[1].data[6].ko, "ko", "vi")
    const continue_with_google = await translate(text[1].data[7].ko, "ko", "vi")
    const continue_with_facebook = await translate(text[1].data[8].ko, "ko", "vi")
    resolve({back: back, email: email, password: password, login: login, find_password: find_password, sign_in: sign_in, continue_with_apple: continue_with_apple, continue_with_google: continue_with_google, continue_with_facebook: continue_with_facebook, })
}
}

      
      
    } catch (e) {
      console.log(e)
      reject(e)
    }
  })
}