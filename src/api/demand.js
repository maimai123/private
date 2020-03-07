import { http } from '@/api';

/**
 * 需求列表
 * @param Object
 */
export const fetchSearch = () => {
  return http.get('demand/list/search');
};

/**
 * 需求列表
 * @param Object limit, page, type, status, q, dateRange
 */
export const fetch = (params) => {
  return http.get('demand/list', { params });
};

/**
 * 查看需求
 * @param Number id
 */
export const find = id => http.get(`demand/list/${id}`);

/**
 * 新增
 * @param Object
 */
export const create = (data) => {
  return http.post('demand/list', data);
}

/**
 * 修改
 * @param Object id
 */
export const edit = (id, data) => {
  return http.put(`demand/list/${id}`, data);
};

/**
 * 删除
 * @param Number id
 */
export const del = (id) => {
  return http.delete(`demand/list/${id}`);
};

/**
 * 审核
 * @param Number id
 */
export const audit = (id, data) => {
  return http.put(`demand/list/audit/${id}`, data);
};
