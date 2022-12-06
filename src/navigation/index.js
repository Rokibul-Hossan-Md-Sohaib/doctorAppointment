/*
 * @copyRight by iHealthScreen
 */
import React, {createContext, useEffect, useReducer, useMemo} from 'react';
import AuthStack from './AuthStack';
import PatientStack from './PatientStack';
import DoctorStack from './DoctorStack';
import LoadingStack from './LoadingStack';
import {api} from '../config';
import {setToken, getToken} from '../utils';
import AuthContext from '../shared/AuthContext';

export default AppNavigator = () => {
  //
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    },
  );
  //
  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;
      try {
        userToken = await getToken();
      } catch (e) {
        // Restoring token failed
      }
      dispatch({type: 'RESTORE_TOKEN', token: userToken});
    };
    //
    bootstrapAsync();
  }, []);
  //
  const authContext = useMemo(
    () => ({
      signIn: async token => {
        dispatch({type: 'SIGN_IN', token: token});
        await setToken(token);
      },
      signOut: () => dispatch({type: 'SIGN_OUT'}),
      signUp: async token => {
        dispatch({type: 'SIGN_IN', token: token});
      },
    }),
    [],
  );
  //
  return (
    <AuthContext.Provider value={authContext}>
      {!state.userToken ? (
        <LoadingStack />
      ) : state?.user?.userType === 'Doctor' ? (
        <>
          <DoctorStack />
        </>
      ) : (
        <>
          <PatientStack />
        </>
      )}
    </AuthContext.Provider>
  );
};
