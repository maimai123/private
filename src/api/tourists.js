import { http } from '@/api';

/**
 * 优质游客圈列表
 * @param Object
 */
export const fetchSearch = () => {
  return http.get('tourists/list/search');
};

/**
 * 优质游客圈列表
 * @param Object limit, page, type, q, dateRange
 */
export const fetch = (params) => {
  return http.get('tourists/list', { params });
};

/**
 * 查看优质游客圈
 * @param Number id
 */
export const find = id => http.get(`tourists/list/${id}`);

/**
 * 新增
 * @param Object
 */
export const create = (data) => {
  return http.post('tourists/list', data);
}

/**
 * 修改
 * @param Object id
 */
export const edit = (id, data) => {
  return http.put(`tourists/list/${id}`, data);
};

/**
 * 删除
 * @param Number id
 */
export const del = (id) => {
  return http.delete(`tourists/list/${id}`);
};

/**
 * 审核
 * @param Number id
 */
export const audit = (id, data) => {
  return http.put(`tourists/list/audit/${id}`, data);
};
