/*
 * @copyRight by iHealthScreen
 */
import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {routes, colors} from '../config';
import {ActivityIndicator, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from '../services/NavigationService';
const Stack = createStackNavigator();
//
export default function LoadingStack() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName={routes.LOADER}
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name={routes.LOADER} component={AppLoader} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
//
function AppLoader({navigation}) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.WHITE,
      }}>
      <ActivityIndicator color={colors.PRIMARY} size="large" />
    </View>
  );
}
