/*
 * @copyRight by iHealthScreen
 */
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {navigationRef} from '../services/NavigationService';
import {routes, colors} from '../config';
// import Loader from '../screens/Loader';
import Login from '../screens/auth/Login';
import Signup from '../screens/auth/Signup';
import ForgetPassword from '../screens/auth/ForgetPassword';
import Verification from '../screens/auth/Verification';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName={routes.LOGIN}
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name={routes.LOGIN} component={Login} />
        <Stack.Screen name={routes.SIGNUP} component={Signup} />
        <Stack.Screen
          name={routes.FORGOT_PASSWORD}
          component={ForgetPassword}
        />
        <Stack.Screen name={routes.VERIFICATION} component={Verification} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
