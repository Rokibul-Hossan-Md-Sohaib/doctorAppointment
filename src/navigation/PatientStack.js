/*
 * @copyRight by iHealthScreen
 */
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {navigationRef} from '../services/NavigationService';
import {routes, colors} from '../config';
// import Loader from '../screens/Loader';
import PatientInfo from '../screens/patient/FirstInfo';
import PatientProfile from '../screens/patient/Profile';
import PasswordChange from '../screens/patient/PasswordChange';
import PatientManage from '../screens/patient/ManagePatients';
import PatientBottomNavigator from '../navigation/PatientBottomNavigator';
const Stack = createStackNavigator();

export default function PatientStack() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName={routes.HOME}
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name={routes.HOME} component={PatientBottomNavigator} />
        <Stack.Screen name={routes.FIRSTPAGE} component={PatientInfo} />
        <Stack.Screen
          name={routes.PATIENT_PROFILE}
          component={PatientProfile}
        />
        <Stack.Screen name={routes.RESET_PASSWORD} component={PasswordChange} />
        <Stack.Screen name={routes.MANAGE_PATIENT} component={PatientManage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
