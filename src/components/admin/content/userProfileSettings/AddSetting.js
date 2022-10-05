import styles from "styles/components/admin/content/userProfileSettings.module.css"

const AddSetting = (props) => {
  return (
    <div className={styles.add_container} onClick={props.onAddClick}>
      <p>+</p>
    </div>
  )
}
export default AddSetting