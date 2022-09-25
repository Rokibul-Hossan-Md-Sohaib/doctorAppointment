/*
 * @copyRight by iHealthScreen
 */
const api = {
  SERVER: 'https://mobile.myhealth.co.bd:5000',
  AUTH: {
    PATH: 'api',
    ROUTES: {
      LOGIN: 'login',
      REGISTER: 'register',
      FORGET_PASSWORD: 'forget-password',
      RESET_PASSWORD: 'reset-password',
    },
  },
  TIME_SLOT: {
    PATH: 'timeslot',
    ROUTES: {
      CREATE: 'create',
    },
  },
  DEPARTMENTS: {
    PATH: 'doctors',
    ROUTES: {
      GETDEPARTMENTS: 'getDepartments',
    },
  },
  // DEPARTMENTS: 'departments',
  APPOINTMENT: {
    PATH: 'appointment',
    ROUTES: {CREATE: 'create', STATUS_UPDATE: 'status-update'},
  },
  DOCTOR: {
    PATH: 'doctors',
    ROUTES: {DEPARTMENT: 'department'},
  },
  ICE_SERVER: [
    {
      url: 'stun:stun.l.google.com:19302',
    },
    {
      url: 'turn:numb.viagenie.ca',
      credential: 'prince72',
      username: 'dlab499@gmail.com',
    },
  ],
  SOCKET_URL: 'https://mobile.myhealth.co.bd:5000/',
  USER_TYPE: {
    PATIENT: 'PATIENT',
    DOCTOR: 'DOCTOR',
  },
};

export default api;
