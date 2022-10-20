import loader from "public/circle-loader.gif"
import Image from "next/image"

const CircleLoader = () => {
  return (
     <Image width="50px" height="50px" src={loader} />
  )
}

export default CircleLoader