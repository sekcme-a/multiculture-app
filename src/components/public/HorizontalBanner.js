import Image from "next/image"

//1000*180
const HorizontalBanner = ({src}) => {
  return (
    <div style={{borderTop:"4px solid rgb(240,240,240)",borderBottom:"4px solid rgb(240,240,240)"}}>
      <Image src={src} width={1000} height={180} />
    </div>
  )
}
export default HorizontalBanner