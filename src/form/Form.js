import { useEffect, useState } from "react"
import styles from "styles/form/items.module.css"

import SingleCheckbox from "./items/SingleCheckbox"
import MultipleCheckbox from "./items/MultipleCheckbox"
import ListSelect from "./items/ListSelect"
import NumberSelect from "./items/NumberSelect"
import SmallInput from "./items/SmallInput"
import FreeInput from "./items/FreeInput"
import DateTime from "./items/DateTime"
import PhoneNumber from "./items/PhoneNumber"
import Address from "./items/Address"
import Image from "./items/Image"
import File from "./items/File"

const Form = ({ formDatas, data, handleData, addMargin }) => {
  useEffect(() => {
    if (data === "") {
      
    }
  },[formDatas])
  return (
    <div className={styles.form_container}>
      {
        formDatas.map((formData, index) => {
          if (formData.type === "single_checkbox")
            return(
              <div style={addMargin && { marginBottom: "30px" }}>
                <SingleCheckbox index={index}
                  id={formData.id} title={formData.title} items={formData.items}
                  data={data} handleData={handleData} text={formData.text} isRequired={formData.isRequired}
                />
              </div>
            )
          else if (formData.type === "multiple_checkbox")
            return <div style={addMargin && {marginBottom:"30px"}}><MultipleCheckbox index={index}
              id={formData.id} title={formData.title} items={formData.items}
              data={data} handleData={handleData} text={formData.text} isRequired={formData.isRequired}
            /></div>
          else if (formData.type === "list_select")
            return <div style={addMargin && {marginBottom:"30px"}}><ListSelect index={index}
              id={formData.id} title={formData.title} items={formData.items}
              data={data} handleData={handleData} text={formData.text} isRequired={formData.isRequired}
            /></div>
          else if (formData.type === "number_select")
            return <div style={addMargin && {marginBottom:"30px"}}><NumberSelect index={index}
              id={formData.id} title={formData.title} items={formData.items}
              data={data} handleData={handleData} text={formData.text} isRequired={formData.isRequired}
            /></div>
          else if (formData.type === "small_input")
            return <div style={addMargin && {marginBottom:"30px"}}><SmallInput index={index}
              id={formData.id} title={formData.title} items={formData.items}
              data={data} handleData={handleData} text={formData.text} isRequired={formData.isRequired}
            /></div>
          else if (formData.type === "free_input")
            return <div style={addMargin && {marginBottom:"30px"}}><FreeInput index={index}
              id={formData.id} title={formData.title} items={formData.items}
              data={data} handleData={handleData} text={formData.text} isRequired={formData.isRequired}
            /></div>
          else if (formData.type === "date_time")
            return <div style={addMargin && {marginBottom:"30px"}}><DateTime index={index}
              id={formData.id} title={formData.title} items={formData.items}
              data={data} handleData={handleData} text={formData.text} isRequired={formData.isRequired}
            /></div>
          else if (formData.type === "phone_number")
            return <div style={addMargin && {marginBottom:"30px"}}><PhoneNumber index={index}
              id={formData.id} title={formData.title} items={formData.items}
              data={data} handleData={handleData} text={formData.text} isRequired={formData.isRequired}
            /></div>
          else if (formData.type === "address")
            return <div style={addMargin && {marginBottom:"30px"}}><Address index={index}
              id={formData.id} title={formData.title} items={formData.items}
              data={data} handleData={handleData} text={formData.text} isRequired={formData.isRequired}
            /></div>
          else if (formData.type === "image")
            return <div style={addMargin && {marginBottom:"30px"}}><Image index={index}
              id={formData.id} title={formData.title} items={formData.items}
              data={data} handleData={handleData} text={formData.text} isRequired={formData.isRequired}
            /></div>
          else if (formData.type === "file")
            return <div style={addMargin && {marginBottom:"30px"}}><File index={index}
              id={formData.id} title={formData.title} items={formData.items}
              data={data} handleData={handleData} text={formData.text} isRequired={formData.isRequired}
            /></div>
      })}
    </div>
  )
}

export default Form