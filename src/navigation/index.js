/*
 * @copyRight by iHealthScreen
 */
import React, {createContext, useEffect, useReducer, useMemo} from 'react';
import AuthStack from './AuthStack';
import PatientStack from './PatientStack';
import DoctorStack from './DoctorStack';
import LoadingStack from './LoadingStack';
import {api} from '../config';
import {setToken, getToken, removeToken} from '../utils';
import AuthContext from '../shared/AuthContext';

export default AppNavigator = () => {
  //Auth State
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
  //Get Store Token
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
  //Auth Method
  const authContext = useMemo(
    () => ({
      signIn: async token => {
        dispatch({type: 'SIGN_IN', token: token});
        await setToken(token);
      },
      signOut: async () => {
        dispatch({type: 'SIGN_OUT'});
        await removeToken();
      },
      signUp: async token => {
        dispatch({type: 'SIGN_UP', token: token});
      },
    }),
    [],
  );
  //App Stack
  return (
    <AuthContext.Provider value={authContext}>
      {state.isLoading ? (
        <LoadingStack />
      ) : !state.userToken ? (
        <AuthStack />
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
