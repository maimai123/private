/*
 * @Author: 麦麦
 * @Date: 2020-03-07 23:01:00
 * @Last Modified time: 2020-03-07 23:01:00
*/

export const getMultimediaUri = () => {
  return '/api/operation/upload/index';
};

export const upload = ({ field, files }) => {
  const form = new FormData();
  const xhr = new XMLHttpRequest();
  return new Promise((resolve, reject) => {
    form.append('type', field);
    form.append('file', files);
    xhr.withCredentials = true;
    xhr.open('POST', getMultimediaUri(), true);
    xhr.onload = (e) => {
      if (xhr.status < 200 || xhr.status >= 300) {
        reject(e);
      } else {
        const data = JSON.parse(e.target.responseText);
        resolve(data.data);
      }
    };
    xhr.onerror = (e) => {
      reject(e);
    };
    xhr.send(form);
  });
};
/* eslint-disable no-await-in-loop */
export const uploadMultimedia = async (field, files) => {
  const data = [];
  for (let i = files.length - 1; i >= 0; i -= 1) {
    data.push(await upload({ field, files: files.item(i) }));
  }
  return data.reverse();
};
