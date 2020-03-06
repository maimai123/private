import { http } from '@/api';

export const getUser = () => http.get('user/profile');
export const login = ({ phone, password }) => http.post('user/login', { phone, password });
export const logout = () => http.get('user/logout');
export const getAccess = () => http.get('admin/access', { message: false });
