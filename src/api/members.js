import { http } from '@/api';

/**
 * 会员套餐列表
 * @param Object limit, page, type, q, dateRange
 */
export const fetch = (params) => {
  return http.get('operation/rights/index', { params });
};

/**
 * 新增
 * @param Object
 */
export const create = (data) => {
  return http.post('operation/rights/create', data);
}

/**
 * 上/下线
 * @param Number id
 */
export const change = id => http.get('operation/rights/change-status', { params: { id } });

/**
 * 修改
 * @param Object id
 */
export const edit = (id, data) => {
  return http.post('operation/rights/create', { id, ...data });
};

/**
 * 删除
 * @param Number id
 */
export const del = (data) => {
  return http.get('operation/rights/delete', { params: data });
};
