import { http } from '@/api';

/**
 * 订单列表
 * @param Object limit, page, type, q, dateRange
 */
export const fetch = (params) => {
  return http.get('order/list', { params });
};

/**
 * 修改
 * @param Object id
 */
export const edit = (id, data) => {
  return http.put(`order/list/${id}`, data);
};

/**
 * 删除
 * @param Number id
 */
export const del = (data) => {
  return http.delete('order/list/', { params: data });
};
