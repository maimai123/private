import { http } from '@/api';

/**
 * 优质游客圈列表
 * @param Object limit, page, name, role_type, time_start, time_end
 */
export const fetch = (params) => {
  return http.get('operation/great-customer/index', { params });
};

/**
 * 新增
 * @param Object
 */
export const create = (data) => {
  return http.post('operation/great-customer/create', data);
}

/**
 * 退群
 * @param Number id
 */
export const out = (id) => {
  return http.get('operation/great-customer/out', { params: { id } });
};
