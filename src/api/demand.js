import { http } from '@/api';

/**
 * 需求标签
 * @param Object
 */
export const fetchTags = (category) => {
  return http.get('operation/tag/index', { params: { category } });
};

/**
 * 需求列表
 * @param Object limit, page, type, status, q, dateRange
 */
export const fetch = (params) => {
  return http.get('operation/needs/index', { params });
};

/**
 * 查看需求
 * @param Number id
 */
export const find = id => http.get('operation/needs/detail', { params: { id } });

/**
 * 显隐
 * @param Number id is_show
 */
export const change = (id, is_show) => http.get('operation/needs/change-show', { params: { id, is_show } });

/**
 * 新增
 * @param Object
 */
export const create = (data) => {
  return http.post('operation/needs/create', data);
}

/**
 * 修改
 * @param Object id
 */
export const edit = (id, data) => {
  return http.put('operation/needs/create', { id, ...data });
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
export const audit = (id, status) => {
  return http.get('operation/needs/verify', { params: { id, status } });
};
