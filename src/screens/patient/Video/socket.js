import io from 'socket.io-client';
import api from '../../../config/api';
//
export const socket = io(api.SOCKET_URL, {
  // adapt to your server
  reconnection: true, // default setting at present
  reconnectionDelay: 1000, // default setting at present
  reconnectionDelayMax: 5000, // default setting at present
  reconnectionAttempts: Infinity, // default setting at present
  pingTimeout: 7000,
  pingInterval: 3000,
});
