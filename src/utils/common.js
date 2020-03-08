export const deepCopy = (obj) => {
  /* eslint prefer-const: 0 */
  let newObj = obj instanceof Array ? [] : {};
  /* eslint guard-for-in: 0 */
  /* eslint no-restricted-syntax: 0 */
  for (let key in obj) {
    newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
  }
  return newObj;
};

export const findKey = (obj, tab) => {
  let k = deepCopy(obj);
  tab.forEach((i) => { k = k[i]; });
  return k;
};

/**
 * 数组去重
 * @param {array, string} 数组， 根据key值去重
 * @return {array} 去重后的数组
 */
export const uniqueByKeys = (array, keys) => {
  const tab = keys.split('.');
  const newArr = [];
  const hash = {};
  array.forEach((item) => {
    if (!hash[findKey(item, tab)]) {
      hash[findKey(item, tab)] = true;
      newArr.push(item);
    }
    return true;
  });
  return newArr;
};
