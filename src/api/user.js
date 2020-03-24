import { http } from '@/api';

export const getUser = () => http.get('operation/manage/detail');
export const login = (params) => http.post('operation/login/index', params);
export const logout = () => http.get('operation/login/out');

export const resetPassword = (params) => http.post('operation/manage/reset-password', params);
export const changePassword = (params) => http.post('operation/manage/change-password', params);
/**
 * 获取验证码
 * */
export const getCaptcha = phone => http.get('operation/tool/phone-code', { params: { phone } });
/**
 * 验证验证码
 * */
export const validateCaptcha = params => http.get('front/tool/validate-code', { params });

// export const getAccess = () => http.get('admin/access', { message: false });
