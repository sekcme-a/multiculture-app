import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import useUserData from 'src/context/useUserData';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

const SelectLanguage = () => {
  const [selected, setSelected] = useState(0)
  const [values, setValues] = useState([
    { code: "ko", text: "한국어" },
    { code: "en", text: "English" },
    { code: "zh", text: "汉语" },
    { code: "vi", text: "iếng Việt" },
    { code: "ja", text: "日本语" },
    {code:"th", text:"ภาษาไทย"},
  ]);
  const { language, setLanguage } = useUserData()
  const router = useRouter()

  useEffect(() => {
    for (let i = 0; i < values.length; i++){
      if(values[i].code===language)
        setSelected(i)
    }
  },[])

  const handleChange = (event, newValue) => {
    setSelected(newValue);
    setLanguage(values[newValue].code)


  };


  return (
    <div style={{borderBottom:"1px solid #6F38C5"}}>
        <Tabs
          value={selected}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
          sx={{
            '& .css-1aquho2-MuiTabs-indicator': { backgroundColor: "white" },
            '& .css-1h9z7r5-MuiButtonBase-root-MuiTab-root': {color:"black"},
            '& .css-1h9z7r5-MuiButtonBase-root-MuiTab-root.Mui-selected': {color:"#6F38C5"}
          }}
      >
        {values.map((value, index) => (
          <Tab key={index} label={value.text} />
        ))}
        </Tabs>
    </div>
  );
}
export default SelectLanguage