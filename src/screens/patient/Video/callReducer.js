import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
// import AsyncStorage from '@react-native-community/async-storage';
import {api, routes} from '../../../config';
// import NavigationService from '../../navigation/NavigationService';

const initialState = {
  loadingHistory: false,
  callHistory: [],
  loading: false,
  callState: '',
  localStream: '',
  remoteStream: '',
  remoteURL: '',
  localURL: '',
  error: null,
};
const {SERVER} = api;

const callSlice = createSlice({
  name: 'call',
  initialState: initialState,
  reducers: {
    callRequest(state, action) {
      state.loading = true;
    },
    setCallSuccess(state, action) {
      state.loading = false;
      // state.timeSlots = [];
      // state.doctors = [];
    },
    setCallStateStore(state, action) {
      state.callState = action.payload;
    },
    setLocalStreamStore(state, action) {
      state.localStream = action.payload;
    },
    setRemoteStreamStore(state, action) {
      state.remoteStream = action.payload;
    },
    setRemoteURLStore(state, action) {
      state.remoteURL = action.payload;
    },
    setLocalURLStore(state, action) {
      state.localURL = action.payload;
    },

    setCallFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      // state.data = {};
    },
    //added by sabbir
    setCallHistory(state, action) {
      state.callHistory = action.payload;
    },
    setCallLoadingHistory(state, action) {
      state.loadingHistory = action.payload;
    }, //added by sabbir
  },
});

//added by sabbir 64-99

export const getCallHistory = appointmentId => async (dispatch, getState) => {
  if (appointmentId) {
    //   url = `${SERVER}/${DOCTOR_PATH}/${DOCTOR_ROUTES.DEPARTMENT}/${departmentId}`;
    // } else {
    //   url = `${SERVER}/${DOCTOR_PATH}`;
    // }
    const {setCallHistory, setCallLoadingHistory} = callSlice.actions;
    const token = getState().login.data.token;
    // const headers = getHeaders(token);
    // console.log('headers:::', headers);

    dispatch(setCallLoadingHistory(true));
    dispatch(setCallHistory([]));
    let url = `${SERVER}/doctors/get-call-info/${appointmentId}`;
    try {
      let response = await axios({
        method: 'GET',
        url,
        headers: {Authorization: `Bearer ${token}`},
      });
      dispatch(setCallHistory(response.data.data));
      console.log('call history data', response.data.data);
      dispatch(setCallLoadingHistory(false));
    } catch (e) {
      dispatch(setCallLoadingHistory(false));
      console.warn('getCallHistory', e);
    }
  }
};

export const {
  setCallStateStore,
  setLocalStreamStore,
  setRemoteStreamStore,
  setRemoteURLStore,
  setLocalURLStore,
  setCallLoadingHistory,
  setCallHistory,
} = callSlice.actions;
export default callSlice.reducer;

//added by sabbir 64-99

// export const getMessageThunk = userId => async (dispatch, getState) => {
//   // if (departmentId) {
//   //   url = `${SERVER}/${DOCTOR_PATH}/${DOCTOR_ROUTES.DEPARTMENT}/${departmentId}`;
//   // } else {
//   //   url = `${SERVER}/${DOCTOR_PATH}`;
//   // }
//   const {
//     messageRequest,
//     setMessageSuccess,
//     setMessageTab,
//     setMessageFailed,
//   } = messageSlice.actions;
//   const token = getState().login.data.token;
//   // const headers = getHeaders(token);
//   // console.log('headers:::', headers);

//   dispatch(messageRequest());
//   let url = `${SERVER}/common/messageList/?userId=${userId}`;

//   try {
//     let response = await axios({
//       method: 'GET',
//       url,
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     if (response.data.success) {
//       let messagesTab = response.data.data;
//       //console.log(doctorProfile);
//       dispatch(setMessageTab(messagesTab));
//       dispatch(setMessageSuccess());
//     }
//   } catch (e) {
//     dispatch(setMessageFailed(e.message));
//     console.log('get Messages Tab error:::', e.message);
//   }
// };

// export const {
//   setCallStateStore,
//   setLocalStreamStore,
//   setRemoteStreamStore,
//   setRemoteURLStore,
//   setLocalURLStore,
// } = callSlice.actions;

// export default callSlice.reducer;
