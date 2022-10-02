import { firestore as db } from "firebase/firebase"

export const firebaseHooks = {
  is_team_admin: (uid, teamName) => {
    return new Promise((resolve, reject) => {
      try {
        db.collection("users").doc(uid).get().then((doc) => {
          if (doc.data().roles.includes(`admin_${teamName}`))
            resolve(true)
          else
            resolve(false)
        })
      } catch (e) {
        reject(e)
      }

    })
  },
  overWrite: (collectionName, docName, overWriteData) => {
    try {
      db.collection(collectionName).doc(docName).get().then((doc) => {
        db.collection(collectionName).doc(docName).set({...doc.data(), ...overWriteData})
      })
    } catch (e) {
      console.log(e)
    }
  },
  fetch_admin_uid_list_from_teamname: (teamname) => {
    return new Promise(async(resolve, reject) => {
      try {
        console.log("here")
        let result = []
        db.collection("admin_group").doc(teamname).collection("members").get().then((query) => {
          query.docs.forEach((value, index, array) => {
            result.push(value.id)
            console.log(value.id)
            if(index === array.length -1)
              resolve(result)
          })
        })
        // console.log(data.docs)
        // data.docs.forEach((value, index, array) => {
        //   result.push(value.id)
        //   console.log(value.id)
        //   if(index === array.length -1)
        //     resolve(result)
        // })
      } catch (e) {
        reject(e)
      }

    })
  },
  fetch_user_data_list_from_user_uid_list: (idList) => {
    return new Promise((resolve, reject) => {
      if(idList.length===0)
        reject("list length is 0")
      try {
        let result = []
        idList.forEach(async(value, index, array) => {
          const doc = await db.collection("users").doc(value).get()
          result.push(doc.data())
          if(index === array.length -1)
            resolve(result)
        })
      } catch (e) {
        reject(e)
      }

    })
  }
}