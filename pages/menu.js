import Menu from "src/components/main/Menu"
import { useRouter } from "next/router"

const MenuPage = () => {
  const router = useRouter()
  const handleIsMenuOpen = (bool) => {
    if(!bool)
      router.back()
  }
  const setIsHide = () => {
    
  }
  return (
    <Menu isMenuOpen={true} handleIsMenuOpen={handleIsMenuOpen}  setIsHide={setIsHide} /> 
  )
}

export default MenuPage