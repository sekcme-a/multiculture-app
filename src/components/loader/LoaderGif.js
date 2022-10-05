import Image from "next/image"
import loader from "public/loader_multiculture.gif"
import styles from "styles/loader/loaderGif.module.css"

const LoaderGif = (props) => {
  return (
    <div className={(props.mode==="background" || props.mode===undefined )&& styles.background_container}>
      <Image src={loader} />
    </div>
  )
}

export default LoaderGif