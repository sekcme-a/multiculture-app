const API_KEY = process.env.NEXT_PUBLIC_API_KEY

export const translate = async (text, fromLang, toLang) => {
  let url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;
  url += '&q=' + encodeURI(text);
  url += `&source=${fromLang}`;
  url += `&target=${toLang}`;
  return new Promise(async function (resolve, reject) {
    try {
      fetch(url, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      })
        .then(res => res.json())
        .then((response) => {
          if(response.data)
            resolve(response.data.translations[0].translatedText)
          else {
            console.log(response)
            reject(response.error.message)
          }
        })
    } catch (e) {
      reject(new Error(e.message))
    }
  })
}
