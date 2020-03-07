/*
 * @Author: 麦麦
 * @Date: 2020-03-07 23:01:00
 * @Last Modified time: 2020-03-07 23:01:00
*/

export const getMultimediaUri = () => {
  return '/api/attachment/upload';
};

export const upload = ({ type, file }) => {
  const form = new FormData();
  const xhr = new XMLHttpRequest();
  return new Promise((resolve, reject) => {
    // form.append('type', type);
    // form.append('file', file);
    // xhr.withCredentials = true;
    // xhr.open('POST', getMultimediaUri(), true);
    // xhr.onload = (e) => {
    //   if (xhr.status < 200 || xhr.status >= 300) {
    //     reject(e);
    //   } else {
    //     const data = JSON.parse(e.target.responseText);
    //     resolve(data.data);
    //   }
    // };
    // xhr.onerror = (e) => {
    //   reject(e);
    // };
    // xhr.send(form);
    resolve({ id: 1, img: 'http://img2.imgtn.bdimg.com/it/u=1795100662,1399982332&fm=26&gp=0.jpg' });
  });
};
/* eslint-disable no-await-in-loop */
// export const uploadMultimedia = async (type, files) => {
//   const data = [];
//   for (let i = files.length - 1; i >= 0; i -= 1) {
//     data.push(await upload({ type, file: files.item(i) }));
//   }
//   return data.reverse();
// };
