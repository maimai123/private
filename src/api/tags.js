import { http } from '@/api';

/**
 * 标签列表
 * @param Object limit, page, type, q, dateRange
 */
export const fetch = (params) => {
  return http.get('operation/tag/index', { params });
};

/**
 * 新增
 * @param Object
 */
export const create = (data) => {
  return http.post('operation/tag/create', data);
}

/**
 * 显隐
 * @param Number id is_show
 */
export const change = (id, is_show) => http.get('operation/tag/change-show', { params: { id, is_show } });

/**
 * 修改
 * @param Object id
 */
export const edit = (id, data) => {
  return http.post(`operation/tag/update?id=${id}`, data);
};

/**
 * 删除
 * @param Number id
 */
export const del = (data) => {
  return http.get('operation/tag/delete', { params: data });
};
