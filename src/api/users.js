import { http } from '@/api';

/**
 * 用户列表
 * @param Object limit, page, q
 */
export const fetch = ({ limit, page, q }) => {
  return http.get('user/list', { params: { limit, page, q } });
};

/**
 * 修改
 * @param Object id
 */
export const edit = (id, data) => {
  return http.put(`user/list/${id}`, data);
};

/**
 * 删除用户
 * @param Number id
 */
export const del = (id) => {
  return http.delete(`user/list/${id}`);
};
