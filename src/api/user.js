import { http } from '@/api';

export const getUser = () => http.get('user/profile');
export const login = ({ phone, password }) => http.post('user/login', { phone, password });
export const logout = () => http.get('user/logout');
export const getAccess = () => http.get('admin/access', { message: false });
export const resetPassword = () => http.get('user/password/reset');
/**
 * 获取验证码
 * */
export const getCaptcha = phone => http.get(`user/phone-code/${phone}`);
