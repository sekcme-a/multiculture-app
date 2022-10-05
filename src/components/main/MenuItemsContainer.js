import styles from "styles/main/menuItemsContainer.module.css"


//items = [{icon: <></>, text: ""},]
const MenuItemsContainer = ({items}) => {
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
      <div style={{height: "60px", width:"100%", backgroundColor: "rgb(235,235,235)"}}>로그아웃</div>
    </div>
  )
}

export default MenuItemsContainer