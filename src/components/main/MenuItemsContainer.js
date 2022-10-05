import styles from "styles/main/menuItemsContainer.module.css"

import useAuth from "src/hooks/auth/auth"


//items = [{icon: <></>, text: ""},]
const MenuItemsContainer = ({ items }) => {
  const { user, logout } = useAuth()
  
  const onLogoutClick = () => {
    logout()
  }
  return (
    <div className={styles.main_container}>
      {items?.map((item, index) => {
        return (
          <div className={styles.item_container} key={index}>
            <h1>{item.title}</h1>
            {item?.data?.map((content, index)=>{
              return(
                <div key={index} className={styles.content_container}>
                  {content.icon}
                  <p>{content.text}</p>
                </div>
              )
            })}
          </div>
        )
      })}
      <div style={{height: "180px", width:"100%", backgroundColor: "rgb(235,235,235)"}} onClick={onLogoutClick}>로그아웃</div>
    </div>
  )
}

export default MenuItemsContainer