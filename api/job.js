import { firestore as db, storage } from "firebase/firebase"
import { resolve } from "styled-jsx/css"
import { handleProfileImage } from "src/hooks/handleProfileImage"

export const fetchJob = {
    fetch_job: (city) => {
        return new Promise((resolve, reject) => {
          try {
            const suwonData = [
                {
                    path: "0",
                    title:"수원시다문화가족지원센터 다문화가족 방문교육지도사(생활지도사) 모집",
                    author:"수원시다문화가족지원센터",
                    date:"2일전"
                },
                {
                    path: "1",
                    title:"수원시다문화가족지원센터 다이음 교육 강사 모집 공고",
                    author:"수원시다문화가족지원센터",
                    date:"5일전"
                },
                {
                    path: "2",
                    title:"수원시다문화가족지원센터 사회복지사(사례관리사) 모집",
                    author:"수원시다문화가족지원센터",
                    date:"7일전"
                },  
            ]
            if(city==="suwon")
                resolve(suwonData)
            else
                resolve([])
          } catch (e) {
            reject(e)
          }
    
        })
      },
      fetch_job_with_id: (id) => {
        return new Promise((resolve, reject) => {
          try {
            const data1 = {
                title:"수원시다문화가족지원센터 다문화가족 방문교육지도사(생활지도사) 모집",
                author:"수원시다문화가족지원센터",
                date:"2일전",
                content:[{
                    title:"지원자격",
                    data:[
                        {
                            title:"경력",
                            text:"경력무관"
                        },
                        {
                            title:"학력",
                            text:"초대졸이상"
                        },
                        {
                            title:"우대",
                            text:"봉사활동 경험"
                        }
                    ]
                },
                {
                    title:"근무조건",
                    data:[
                        {
                            title:"고용형태",
                            text:"계약직(근무기간 협의)",
                        },
                        {
                            title:"급여",
                            text:"시급 12,130원",
                        },
                        {
                            title:"지역",
                            text:"경기도 수원시 장안구, 수원시 권선구, 수원시 팔달구, 수원시 영통구"
                        },
                        {
                            title:"직책",
                            text:"팀원"
                        }
                    ]
                }]
            }
            const data2 = {
                title:"수원시다문화가족지원센터 다이음 교육 강사 모집 공고",
                author:"수원시다문화가족지원센터",
                date:"5일전",
                content:[{
                    title:"지원자격",
                    data:[
                        {
                            title:"경력",
                            text:"경력무관"
                        },
                        {
                            title:"학력",
                            text:"초대졸이상"
                        },
                        {
                            title:"우대",
                            text:"봉사활동 경험"
                        }
                    ]
                },
                {
                    title:"근무조건",
                    data:[
                        {
                            title:"고용형태",
                            text:"계약직(근무기간 협의)",
                        },
                        {
                            title:"급여",
                            text:"시급 12,130원",
                        },
                        {
                            title:"지역",
                            text:"경기도 수원시 장안구, 수원시 권선구, 수원시 팔달구, 수원시 영통구"
                        },
                        {
                            title:"직책",
                            text:"팀원"
                        }
                    ]
                }]
            }
            const data3 = {
                title:"수원시다문화가족지원센터 사회복지사(사례관리사) 모집",
                author:"수원시다문화가족지원센터",
                date:"7일전",
                content:[{
                    title:"지원자격",
                    data:[
                        {
                            title:"경력",
                            text:"경력무관"
                        },
                        {
                            title:"학력",
                            text:"초대졸이상"
                        },
                        {
                            title:"우대",
                            text:"봉사활동 경험"
                        }
                    ]
                },
                {
                    title:"근무조건",
                    data:[
                        {
                            title:"고용형태",
                            text:"계약직(근무기간 협의)",
                        },
                        {
                            title:"급여",
                            text:"시급 12,130원",
                        },
                        {
                            title:"지역",
                            text:"경기도 수원시 장안구, 수원시 권선구, 수원시 팔달구, 수원시 영통구"
                        },
                        {
                            title:"직책",
                            text:"팀원"
                        }
                    ]
                }]
            }
            if(id==="0")
                resolve(data1)
            else if(id==="1")
                resolve(data2)
            else
                resolve(data3)
          } catch (e) {
            reject(e)
          }
    
        })
      },
}
