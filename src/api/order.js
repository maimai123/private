import { http } from '@/api';

/**
 * 订单列表
 * @param Object limit, page, time_start，time_end, keywords
 */
export const fetch = (params) => {
  return http.get('operation/orders/index', { params });
};

/**
 * 获取会员权益/价格
 */
export const getEquityAndPrice = () => {
  return http.get('operation/orders/setting');
};

/**
 * 修改会员权益/价格
 * @param Object data
 */
export const editEquityAndPrice = (data) => {
  return http.post('operation/orders/setting', data);
};

/**
 * 删除
 * @param Number id
 */
export const del = (data) => {
  return http.get('operation/orders/delete', { params: data });
};
