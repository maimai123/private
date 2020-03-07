import { http } from '@/api';

/**
 * 标签列表
 * @param Object
 */
export const fetchSearch = () => {
  return http.get('tags/list/search');
};

/**
 * 标签列表
 * @param Object limit, page, type, q, dateRange
 */
export const fetch = (params) => {
  return http.get('tags/list', { params });
};

/**
 * 查看标签
 * @param Number id
 */
export const find = id => http.get(`tags/list/${id}`);

/**
 * 新增
 * @param Object
 */
export const create = (data) => {
  return http.post('tags/list', data);
}

/**
 * 修改
 * @param Object id
 */
export const edit = (id, data) => {
  return http.put(`tags/list/${id}`, data);
};

/**
 * 删除
 * @param Number id
 */
export const del = (id) => {
  return http.delete(`tags/list/${id}`);
};

/**
 * 审核
 * @param Number id
 */
export const audit = (id, data) => {
  return http.put(`tags/list/audit/${id}`, data);
};
