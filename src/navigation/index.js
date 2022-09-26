import React from 'react';
import {useSelector} from 'react-redux';

import AuthStack from './AuthStack';
import PatientStack from './PatientStack';
import DoctorStack from './DoctorStack';
import {api} from '../config';
export default AppNavigator = () => {
  const auth = /* useSelector(state => state.login.data); */ {token: ''};

  if (!auth.token) {
    return <AuthStack />;
  } else {
    return auth?.user.userType === api.USER_TYPE.DOCTOR ? (
      <>
        <DoctorStack />
      </>
    ) : (
      <>
        <PatientStack />
      </>
    );
  }
};
