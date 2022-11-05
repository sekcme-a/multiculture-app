import { useEffect, useState } from "react"
import styles from "styles/loader/pancakeLoader.module.css"

const PancakeLoader = (props) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    setTimeout(() => {
      setProgress(props.progress)
    },1000*props.progress)
  },[props.progress])
  if(progress===0)
  return<div className={styles.main_container}></div>
  return (
    <div className={styles.main_container}>
      {/* <div className={styles.loader}> */}
        <div className={styles.tall_stack}>
          <div className={progress>1.0 ? `${styles.butter} ${styles.falling_element}` : `${styles.pancake} ${styles.hide}`}></div>
          <div className={progress>0.9 ? `${styles.pancake} ${styles.falling_element}` : `${styles.pancake} ${styles.hide}`}></div>
          <div className={progress>0.75 ? `${styles.pancake} ${styles.falling_element}` : `${styles.pancake} ${styles.hide}`}></div>
          <div className={progress>0.6 ? `${styles.pancake} ${styles.falling_element}` : `${styles.pancake} ${styles.hide}`}></div>
          <div className={progress>0.45 ? `${styles.pancake} ${styles.falling_element}` : `${styles.pancake} ${styles.hide}`}></div>
          <div className={progress>0.3 ? `${styles.pancake} ${styles.falling_element}` : `${styles.pancake} ${styles.hide}`}></div>
          <div className={progress>0.15 ? `${styles.pancake} ${styles.falling_element}` : `${styles.pancake} ${styles.hide}`}></div>
          <div className={styles.plate}>
            <div className={styles.plate_bottom}></div>
            <div className={styles.shadow}></div>
          </div>
        {/* </div> */}
      </div>
      {/* <div class="loader">
        <div class="tall-stack">
          <div class="butter falling-element"></div>
          <div class="pancake falling-element"></div>
          <div class="pancake falling-element"></div>
          <div class="pancake falling-element"></div>
          <div class="pancake falling-element"></div>
          <div class="pancake falling-element"></div>
          <div class="pancake falling-element"></div>
          <div class="plate">
            <div class="plate-bottom"></div>
            <div class="shadow"></div>
          </div>
        </div>
      </div> */}

      <footer class="footer"></footer>
    </div>
  )
}

export default PancakeLoader