/*
 * @copyRight by iHealthScreen
 */
import http from '../utils/http';
import {api} from '../config';

export default class AppointmentService {
  //
  static async getAppointments(payload) {
    const resp = await http.get(`${api.SERVER_LIVE}/api/appointment`);
    return resp;
  }
  //
  static async createAppointment(payload) {
    return await http.post(`${api.SERVER_LIVE}/api/appointment`, payload);
  }
}
