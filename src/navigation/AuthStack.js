/*
 * @copyRight by iHealthScreen
 */
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {navigationRef} from './NavigationService';
import {routes, colors} from '../config';
// import Loader from '../screens/Loader';
import Login from 'src/screens/auth/Login';
import Signup from 'src/screens/auth/Signup';
import ForgetPassword from 'src/screens/auth/ForgetPassword';
import Verification from 'src/screens/auth/Verification';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName={routes.LOGIN}>
        <Stack.Screen name={routes.LOGIN} component={Login}  doptions={{headerShown: false}} d/>
        <Stack.Screen name={routes.SIGNUP} component={Signup} />
        <Stack.Screen name={routes.VERIFICATION} component={Verification} />
        <Stack.Screen name={routes.FORGET_PASSWORD} component={ForgetPassword} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
