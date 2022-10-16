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
import DoctorCategory from '../screens/patient/DoctorCategory';
import PatientSettings from '../screens/patient/Settings';
import PatientHistory from '../screens/patient/History';

const Tab = createBottomTabNavigator();

function PatientBottomNavigator(props) {
  //
  const Icon = (src, focused) => {
    return (
      <Image
        style={{
          width: 24,
          height: 24,
          tintColor: focused ? colors.PRIMARY : colors.GRAY,
        }}
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
          tabBarIcon: ({focused}) => Icon(images.home, focused),
          tabBarOptions: {activeTintColor: colors.PRIMARY},
        }}
      />
      <Tab.Screen
        name="PatientHistory"
        component={PatientHistory}
        options={{
          tabBarLabel: 'History',
          tabBarIcon: ({focused}) => Icon(images.history, focused),
          tabBarOptions: {activeTintColor: colors.PRIMARY},
        }}
      />
      <Tab.Screen
        name="Appointment"
        component={DoctorCategory}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              style={{
                width: 80,
                height: 80,
              }}
              resizeMode="contain"
              source={images.plus}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Category"
        component={DoctorCategory}
        options={{
          tabBarLabel: 'Specialist',
          tabBarIcon: ({focused}) => Icon(images.doc_specialist, focused),
        }}
      />

      <Tab.Screen
        name="PatientSettings"
        component={PatientSettings}
        options={{
          tabBarLabel: 'More',
          tabBarIcon: ({focused}) => Icon(images.more, focused),
        }}
      />
    </Tab.Navigator>
  );
}

export default PatientBottomNavigator;
