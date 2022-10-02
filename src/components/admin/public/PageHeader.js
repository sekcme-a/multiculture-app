import styles from "styles/components/admin/public/pageHeader.module.css"

const PageHeader = ({ title, subtitle }) => {
  return (
    <div className={styles.main_container}>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </div>
  )
}
export default PageHeader