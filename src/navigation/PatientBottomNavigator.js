import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  ActivityIndicator,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {images, colors, routes, fonts} from '../config';

import Home from '../screens/patient/Home';
// import History from '../screens/patient/Home';
// import NewAppointment from '../screens/patient/Home';
// import DoctorCategory from '../screens/patient/Home';
// import More from '../screens/course/More';

const Tab = createBottomTabNavigator();

function PatientBottomNavigator(props) {
  //
  const Icon = src => {
    return (
      <Image
        style={{width: 24, height: 24, tintColor: colors.PRIMARY}}
        resizeMode="contain"
        source={src}
      />
    );
  };
  //
  return (
    <Tab.Navigator
      initialRouteName="PatientHome"
      screenOptions={{headerShown: false}}
      activeColor="#554141"
      inactiveColor={'#BBBBBB'}
      shifting={false}
      barStyle={{backgroundColor: 'white'}}>
      <Tab.Screen
        name="PatientHome"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => Icon(images.home),
        }}
      />
    </Tab.Navigator>
  );
}

export default PatientBottomNavigator;
