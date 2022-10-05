import { firestore as db } from "firebase/firebase"
import { resolve } from "styled-jsx/css"

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
    return new Promise(async (resolve, reject) => {
    try {
      db.collection(collectionName).doc(docName).get().then((doc) => {
        db.collection(collectionName).doc(docName).set({...doc.data(), ...overWriteData})
      })
      resolve("success")
    } catch (e) {
      console.log(e)
      resolve(e)
    }
    })

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
          result.push(doc)
          if(index === array.length -1)
            resolve(result)
        })
      } catch (e) {
        reject(e)
      }

    })
  },
  give_admin_role_with_user_uid: (uid, teamname) => {
    return new Promise(async(resolve, reject) => {
      try {
        console.log(uid)
        const user = await db.collection("users").doc(uid).get()
        if (!user.exists)
          reject("없는 코드입니다.")
        else if(user.data().roles.includes(`admin_${teamname}`))
          reject("이미 팀의 구성원입니다.")
        else {
          const batch = db.batch()
          batch.update(db.collection("users").doc(uid), {roles: [`admin_${teamname}`]})
          batch.set(db.collection("admin_group").doc(teamname).collection("members").doc(uid), { role: "admin" })
          await batch.commit();
          resolve("성공적으로 추가되었습니다.")
        }
      } catch (e) {
        reject(e.message)
      }

    })
  },
  delete_admin_role_with_user_uid: (uid, teamname) => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await db.collection("admin_group").doc(teamname).collection("members").doc(uid).get()
        if (!user.exists)
          reject("팀의 구성원이 아닙니다.")
        else {
          const batch = db.batch()
          batch.update(db.collection("users").doc(uid), { roles: ["user"] })
          batch.delete(db.collection("admin_group").doc(teamname).collection("members").doc(uid))
          await batch.commit();
          resolve("성공적으로 삭제되었습니다.")
        }
      } catch(e){
        reject(e.message)
      }
    })
  },
  set_object_to_firestore_collection: (data, collection, doc) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (doc)
          await db.collection(collection).doc(doc).set(data)
        else
          await db.collection(collection).set(data)
        resolve("success")
      } catch (e) {
        console.log(e)
        reject(e.message)
      }
    })
  },
  get_data_from_collection: (collection, doc) => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await db.collection(collection).doc(doc).get()
        resolve(result.data())
      } catch (e) {
        reject(e.message)
      }
    })
  },
  fetch_language_with_user_uid: (uid) => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await db.collection("users").doc(uid).get()
        resolve(result.data().language)
      } catch (e) {
        reject(e.message)
      }
    })
  }
}