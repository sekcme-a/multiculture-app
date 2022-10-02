import { useEffect, useState } from "react"
import { text } from "data/text"

const Generator = () => {
  const [input, setInput] = useState("")
  const onInputChange = (e) => { setInput(e.target.value) }

  const [result, setResult] = useState("")
  
  const onClick = () => {
    let res=""
    for (let i = 0; i < text.length; i++){
      console.log(res)
      if (i === 0) {
        res = `if ( address === "${text[i].page}") {`
      } else {
        res = res+ `else if ( address === "${text[i].page}") {\n`
      }
      
      res = res + `  if (language==="ko")\n`
      res = res+`    resolve({`
      for (let j = 0; j < text[i].data.length; j++){
        res = res+`${text[i].data[j].text} : text[${i}].data[${j}].ko, `
      }
      res = res + `})\n`
      
      res = res + `  else if (language==="en")\n`
      res = res+`    resolve({`
      for (let j = 0; j < text[i].data.length; j++){
        res = res+`${text[i].data[j].text} : text[${i}].data[${j}].en, `
      }
      res = res + `})\n`
      
      res = res + `  else if (language==="zh")\n`
      res = res+`    resolve({`
      for (let j = 0; j < text[i].data.length; j++){
        res = res+`${text[i].data[j].text} : text[${i}].data[${j}].zh, `
      }
      res = res + `})\n`


      res = res + `  else if(language==="vi"){\n`
      for (let j = 0; j < text[i].data.length; j++){
        res = res + `    const ${text[i].data[j].text} = await translate(text[${i}].data[${j}].ko, "ko", "vi")\n`
      }
      res = res+`    resolve({`
      for (let j = 0; j < text[i].data.length; j++){
        res = res+`${text[i].data[j].text}: ${text[i].data[j].text}, `
      }
      res = res + `})\n`
      res = res+`}\n`

      res = res + `}\n`
    }
    setResult(res)
  }
  return (
    <div>
      <input value={input} onChange={onInputChange} />
      <div onClick={onClick} style={{marginBottom:"30px"}}>submit</div>
      <textarea type="text" value={result} cols="100" rows="30" />
    </div>
  )
}

export default Generator