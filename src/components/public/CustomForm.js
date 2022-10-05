import { useState, useEffect } from "react";
import styles from "styles/components/admin/content/userProfileSettings.module.css"


import AddSetting from "src/components/admin/content/userProfileSettings/AddSetting"
import AddDialog from "src/components/admin/content/userProfileSettings/AddDialog"
// import SortableComponent from "src/components/admin/public/SortableComponent";
import SortableComponent from "src/components/admin/public/SortableComponent";
  
import Dialog from '@mui/material/Dialog';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

import { arrayMoveImmutable } from 'array-move';

const CustomForm = ({formData, setFormData}) => {
  const [openDialog, setOpenDialog] = useState(false)
  const handleCloseDialog = () => { setOpenDialog(false); };
  const onAddClick = () => { setOpenDialog(true) }
  // const [formData, setFormData] = useState([])

  const [componentData, setComponentData] = useState([])
  const [triggerDelete, setTriggerDelete] = useState("")


  const addFormData = (data) => {
    setFormData([...formData, data])
    // formDataNote= [...formData, data] 
    setComponentData([...componentData, renderComponent(data)])
    // componentDataNote= [...componentDataNote, renderComponent(data)] 
  }
  useEffect(() => {
    let temp = []
    for (let i = 0; i < formData.length; i++){
      temp.push(renderComponent(formData[i]))
    }
    setComponentData(temp)
  },[])
  
  const onEditClick = (title) => {
    alert("아직 추가되지 않은 기능입니다.")
    //need update
  }
  const onDeleteClick = (title) => {
    setTriggerDelete(title)
  }

  useEffect(() => {
    for (let i = 0; i < formData.length; i++){
      if (triggerDelete === formData[i].title) {
        const temp = arrayMoveImmutable(formData, i, formData.length - 1)
        temp.pop()
        setFormData(temp)
        
        const temp2 = arrayMoveImmutable(componentData, i, componentData.length - 1)
        temp2.pop()
        setComponentData(temp2)
        return;
      }
    }
    console.log("triggerdelete")
  },[triggerDelete])

  const renderComponent = (data) => {
    return(
      <div className={`${styles.component_container} ${styles.single_checkbox_container}`}>
        <h1><strong>{data.typeText}</strong></h1>
        <h2>{data.title}</h2>
        {/* <h3>
          옵션 : 
          <ul>
            {data.items.map((item, index) => (
              <li key={index}>{`${item},`}</li>
            ))}
          </ul>
        </h3> */}
        {/* <div>
          {data.type === "single_checkbox" && 
            <>

            </>
          }
        </div> */}
        <div className={styles.component_button_container} >
          <EditRoundedIcon sx={{ mr: "2px" }} onClick={()=>onEditClick(data.title)} />
          <DeleteRoundedIcon onClick={()=>onDeleteClick(data.title)} />
        </div>
      </div>
    )
  }


  return (
    <>
      <SortableComponent items={formData} setItems={setFormData}
        components={componentData} setComponents={setComponentData} mode="y" ulStyle={{ width: "100%" }} pressDelay={150} />
      <AddSetting onAddClick={onAddClick} />
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth={"lg"} >
        <AddDialog addFormData={addFormData} handleCloseDialog={handleCloseDialog} formData={formData} />
      </Dialog>
    </>
  )
}
export default CustomForm