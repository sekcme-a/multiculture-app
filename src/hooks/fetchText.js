import { text } from "data/text"
import { translate } from 'src/hooks/translate'
// import useUserData from 'src/context/useUserData'

export const fetchText = (address, language) => {
  // const { language, setLanguage } = useUserData()

  return new Promise(async function (resolve, reject) {
    try {
if ( address === "index") {  if (language==="ko")
    resolve({program : text[0].data[0].ko, all : text[0].data[1].ko, hello : text[0].data[2].ko, Please_log_in_for_more_information_and_participation_in_the_program : text[0].data[3].ko, Please_register_your_email : text[0].data[4].ko, })
  else if(language==="vi"){
    const program = await translate(text[0].data[0].ko, "ko", "vi")
    const all = await translate(text[0].data[1].ko, "ko", "vi")
    const hello = await translate(text[0].data[2].ko, "ko", "vi")
    const Please_log_in_for_more_information_and_participation_in_the_program = await translate(text[0].data[3].ko, "ko", "vi")
    const Please_register_your_email = await translate(text[0].data[4].ko, "ko", "vi")
    resolve({program: program, all: all, hello: hello, Please_log_in_for_more_information_and_participation_in_the_program: Please_log_in_for_more_information_and_participation_in_the_program, Please_register_your_email: Please_register_your_email, })
}
  else if(language==="zh"){
    const program = await translate(text[0].data[0].ko, "ko", "zh")
    const all = await translate(text[0].data[1].ko, "ko", "zh")
    const hello = await translate(text[0].data[2].ko, "ko", "zh")
    const Please_log_in_for_more_information_and_participation_in_the_program = await translate(text[0].data[3].ko, "ko", "zh")
    const Please_register_your_email = await translate(text[0].data[4].ko, "ko", "zh")
    resolve({program: program, all: all, hello: hello, Please_log_in_for_more_information_and_participation_in_the_program: Please_log_in_for_more_information_and_participation_in_the_program, Please_register_your_email: Please_register_your_email, })
}
  else if(language==="ja"){
    const program = await translate(text[0].data[0].ko, "ko", "ja")
    const all = await translate(text[0].data[1].ko, "ko", "ja")
    const hello = await translate(text[0].data[2].ko, "ko", "ja")
    const Please_log_in_for_more_information_and_participation_in_the_program = await translate(text[0].data[3].ko, "ko", "ja")
    const Please_register_your_email = await translate(text[0].data[4].ko, "ko", "ja")
    resolve({program: program, all: all, hello: hello, Please_log_in_for_more_information_and_participation_in_the_program: Please_log_in_for_more_information_and_participation_in_the_program, Please_register_your_email: Please_register_your_email, })
}
  else if(language==="th"){
    const program = await translate(text[0].data[0].ko, "ko", "th")
    const all = await translate(text[0].data[1].ko, "ko", "th")
    const hello = await translate(text[0].data[2].ko, "ko", "th")
    const Please_log_in_for_more_information_and_participation_in_the_program = await translate(text[0].data[3].ko, "ko", "th")
    const Please_register_your_email = await translate(text[0].data[4].ko, "ko", "th")
    resolve({program: program, all: all, hello: hello, Please_log_in_for_more_information_and_participation_in_the_program: Please_log_in_for_more_information_and_participation_in_the_program, Please_register_your_email: Please_register_your_email, })
}
  else if(language==="en"){
    const program = await translate(text[0].data[0].ko, "ko", "en")
    const all = await translate(text[0].data[1].ko, "ko", "en")
    const hello = await translate(text[0].data[2].ko, "ko", "en")
    const Please_log_in_for_more_information_and_participation_in_the_program = await translate(text[0].data[3].ko, "ko", "en")
    const Please_register_your_email = await translate(text[0].data[4].ko, "ko", "en")
    resolve({program: program, all: all, hello: hello, Please_log_in_for_more_information_and_participation_in_the_program: Please_log_in_for_more_information_and_participation_in_the_program, Please_register_your_email: Please_register_your_email, })
}
}
else if ( address === "login") {
  if (language==="ko")
    resolve({back : text[1].data[0].ko, email : text[1].data[1].ko, password : text[1].data[2].ko, login : text[1].data[3].ko, find_password : text[1].data[4].ko, sign_in : text[1].data[5].ko, continue_with_apple : text[1].data[6].ko, continue_with_google : text[1].data[7].ko, continue_with_facebook : text[1].data[8].ko, })
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
  else if(language==="zh"){
    const back = await translate(text[1].data[0].ko, "ko", "zh")
    const email = await translate(text[1].data[1].ko, "ko", "zh")
    const password = await translate(text[1].data[2].ko, "ko", "zh")
    const login = await translate(text[1].data[3].ko, "ko", "zh")
    const find_password = await translate(text[1].data[4].ko, "ko", "zh")
    const sign_in = await translate(text[1].data[5].ko, "ko", "zh")
    const continue_with_apple = await translate(text[1].data[6].ko, "ko", "zh")
    const continue_with_google = await translate(text[1].data[7].ko, "ko", "zh")
    const continue_with_facebook = await translate(text[1].data[8].ko, "ko", "zh")
    resolve({back: back, email: email, password: password, login: login, find_password: find_password, sign_in: sign_in, continue_with_apple: continue_with_apple, continue_with_google: continue_with_google, continue_with_facebook: continue_with_facebook, })
}
  else if(language==="ja"){
    const back = await translate(text[1].data[0].ko, "ko", "ja")
    const email = await translate(text[1].data[1].ko, "ko", "ja")
    const password = await translate(text[1].data[2].ko, "ko", "ja")
    const login = await translate(text[1].data[3].ko, "ko", "ja")
    const find_password = await translate(text[1].data[4].ko, "ko", "ja")
    const sign_in = await translate(text[1].data[5].ko, "ko", "ja")
    const continue_with_apple = await translate(text[1].data[6].ko, "ko", "ja")
    const continue_with_google = await translate(text[1].data[7].ko, "ko", "ja")
    const continue_with_facebook = await translate(text[1].data[8].ko, "ko", "ja")
    resolve({back: back, email: email, password: password, login: login, find_password: find_password, sign_in: sign_in, continue_with_apple: continue_with_apple, continue_with_google: continue_with_google, continue_with_facebook: continue_with_facebook, })
}
  else if(language==="th"){
    const back = await translate(text[1].data[0].ko, "ko", "th")
    const email = await translate(text[1].data[1].ko, "ko", "th")
    const password = await translate(text[1].data[2].ko, "ko", "th")
    const login = await translate(text[1].data[3].ko, "ko", "th")
    const find_password = await translate(text[1].data[4].ko, "ko", "th")
    const sign_in = await translate(text[1].data[5].ko, "ko", "th")
    const continue_with_apple = await translate(text[1].data[6].ko, "ko", "th")
    const continue_with_google = await translate(text[1].data[7].ko, "ko", "th")
    const continue_with_facebook = await translate(text[1].data[8].ko, "ko", "th")
    resolve({back: back, email: email, password: password, login: login, find_password: find_password, sign_in: sign_in, continue_with_apple: continue_with_apple, continue_with_google: continue_with_google, continue_with_facebook: continue_with_facebook, })
}
  else if(language==="en"){
    const back = await translate(text[1].data[0].ko, "ko", "en")
    const email = await translate(text[1].data[1].ko, "ko", "en")
    const password = await translate(text[1].data[2].ko, "ko", "en")
    const login = await translate(text[1].data[3].ko, "ko", "en")
    const find_password = await translate(text[1].data[4].ko, "ko", "en")
    const sign_in = await translate(text[1].data[5].ko, "ko", "en")
    const continue_with_apple = await translate(text[1].data[6].ko, "ko", "en")
    const continue_with_google = await translate(text[1].data[7].ko, "ko", "en")
    const continue_with_facebook = await translate(text[1].data[8].ko, "ko", "en")
    resolve({back: back, email: email, password: password, login: login, find_password: find_password, sign_in: sign_in, continue_with_apple: continue_with_apple, continue_with_google: continue_with_google, continue_with_facebook: continue_with_facebook, })
}
}
else if ( address === "public") {
  if (language==="ko")
    resolve({back : text[2].data[0].ko, edit_profile : text[2].data[1].ko, })
  else if(language==="vi"){
    const back = await translate(text[2].data[0].ko, "ko", "vi")
    const edit_profile = await translate(text[2].data[1].ko, "ko", "vi")
    resolve({back: back, edit_profile: edit_profile, })
}
  else if(language==="zh"){
    const back = await translate(text[2].data[0].ko, "ko", "zh")
    const edit_profile = await translate(text[2].data[1].ko, "ko", "zh")
    resolve({back: back, edit_profile: edit_profile, })
}
  else if(language==="ja"){
    const back = await translate(text[2].data[0].ko, "ko", "ja")
    const edit_profile = await translate(text[2].data[1].ko, "ko", "ja")
    resolve({back: back, edit_profile: edit_profile, })
}
  else if(language==="th"){
    const back = await translate(text[2].data[0].ko, "ko", "th")
    const edit_profile = await translate(text[2].data[1].ko, "ko", "th")
    resolve({back: back, edit_profile: edit_profile, })
}
  else if(language==="en"){
    const back = await translate(text[2].data[0].ko, "ko", "en")
    const edit_profile = await translate(text[2].data[1].ko, "ko", "en")
    resolve({back: back, edit_profile: edit_profile, })
}
}


      
      
    } catch (e) {
      console.log(e)
      reject(e)
    }
  })
}