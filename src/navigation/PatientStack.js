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
import FavDoctors from '../screens/patient/FavDoctors';
import Appointment from '../screens/patient/appointment';
import DoctorDetails from '../screens/patient/Home/DoctorDetails';
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
        <Stack.Screen name={routes.FAV_DOCTOR} component={FavDoctors} />
        <Stack.Screen
          name={routes.PATIENT_APPOINTMENT_CREATE}
          component={Appointment}
        />
        <Stack.Screen name={routes.DOCTOR_DETAILS} component={DoctorDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
