/*
 * @copyRight by iHealthScreen
 */
import http from '../utils/http';
import {api} from '../config';

export default class AuthService {
  //
  static async login(payload) {
    const resp = await http.post(`${api.SERVER_LIVE}/api/auth/login`, payload);
    console.log('resp::::', resp);
    return resp;
  }
  //
  static async logout() {
    return http.get(`${api.SERVER_LIVE}/api/user/logout`);
  }
  //
  static forgotPassword(payload) {
    return http.post(`${api.SERVER_LIVE}/api/auth/forgot-password`, payload);
  }
  //
  static resetPassword(payload) {
    return http.post(`${api.SERVER_LIVE}/api/auth/reset-password`, payload);
  }
  //
  static changePassword(payload) {
    return http.post(`${api.SERVER_LIVE}/api/user/password/update`, payload);
  }
  //
  static async getCurrentUser() {
    let params = {};
    return http
      .get(`${api.SERVER_LIVE}/api/user/profile`, {params})
      .then(response => response.data);
  }
  //
  static async updateProfile(payload) {
    return http
      .post(`${api.SERVER_LIVE}/api/user/update`, payload)
      .then(response => response.data);
  }
  //
  static async refreshToken() {
    return http.get(`${api.SERVER_LIVE}/api/user/refresh-token`);
  }
}
