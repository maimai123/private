import { http } from '@/api';

/**
 * 提现审核列表
 * @param Object limit, page, type, q, dateRange
 */
export const fetch = (params) => {
  return http.get('operation/withdraw/index', { params });
};

/**
 * 新增
 * @param Object
 */
export const create = (data) => {
  return http.post('operation/withdraw/create', data);
}

/**
 * 获取说明
 * @param Object
 */
export const getInstruction = () => {
  return http.get('operation/withdraw/setting');
}

/**
 * 修改说明
 * @param Object
 */
export const setInstruction = (params) => {
  return http.post('operation/withdraw/setting', params);
}

/**
 * 切换状态
 * @param Number id
 */
export const change = ({ id, status, fail_reason }) => http.get('operation/withdraw/verify', { params: { id, status, fail_reason } });

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
