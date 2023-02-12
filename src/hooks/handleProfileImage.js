import React from 'react';
import imageCompression from 'browser-image-compression';
import { firebaseHooks } from 'firebase/hooks';

export const handleProfileImage = async (img,path,maxMB) => {
  const options = {
    maxSizeMB: 0.4,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };
  const checkIsImage = (imgName) => {
    const pathpoint = imgName.lastIndexOf('.')
    const filepoint = imgName.substring(pathpoint+1,imgName.length)
    const filetype = filepoint.toLowerCase();
    if (filetype == 'jpg' || filetype == 'png' || filetype == 'git' || filetype == 'jpeg' || filetype == 'bmp') {
      return true;
    }
    else {
      // alert("이미지 파일만 선택할 수 있습니다.\n (.jpg .gif .png .jpeg .bmp)")
      return false;
    }
  }

  const checkIsImageSize = (img) => {
    const maxSize = maxMB * 1024 * 1024; //1MB
    console.log(img)
    console.log(maxSize)
    if (img > maxSize) {
      return false;
    }
    else
      return true
  }


  return new Promise(async function (resolve, reject) {
    let image = img
    try {
      if (img) {
        if (checkIsImage(img.name)) {
          console.log(img.name)
          if (!checkIsImageSize(img.size)) 
            image = await imageCompression(img, options)
          const url = await firebaseHooks.upload_image_to_storage(image, path)
          resolve(url)
        } else {
          const url = await firebaseHooks.upload_image_to_storage(image, path)
          resolve(url)
        }
      }
    } catch (e) {
      reject(e)
    }

  })
}