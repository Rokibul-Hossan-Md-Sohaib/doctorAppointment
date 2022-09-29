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
import Signup from '../screens/auth/Signup';
import ForgetPassword from '../screens/auth/ForgetPassword';
import Verification from '../screens/auth/Verification';

const Stack = createStackNavigator();

export default function PatientStack() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName={routes.FIRSTPAGE}
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name={routes.FIRSTPAGE} component={PatientInfo} />
        <Stack.Screen name={routes.SIGNUP} component={Signup} />
        <Stack.Screen name={routes.VERIFICATION} component={Verification} />
        <Stack.Screen
          name={routes.FORGET_PASSWORD}
          component={ForgetPassword}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
