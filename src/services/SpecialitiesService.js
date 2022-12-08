/*
 * @copyRight by iHealthScreen
 */
import http from '../utils/http';
import {api} from '../config';

export default class SpecialitiesService {
  //
  static async getAllSpecialities(payload) {
    const resp = await http.get(`${api.SERVER_LIVE}/api/specialities`);
    return resp;
  }
  //
  static async getSingleSpecialities(id) {
    return await http.get(`${api.SERVER_LIVE}/api/specialities/${id}`);
  }
  //
  static async createSpecialities(payload) {
    return await http.post(`${api.SERVER_LIVE}/api/specialities}`, payload);
  }
  //
  static async UpdateSpecialities(id,payload) {
    return await http.patch(`${api.SERVER_LIVE}/api/specialities/${id}}`, payload);
  }
}
