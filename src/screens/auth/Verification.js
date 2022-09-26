/*
 * @copyRight by iHealthScreen
 */
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
// import LoginView from './dynamicLoginView';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavigationService from '../../services/NavigationService';
import {colors, routes} from '../../config';
import {ActivityIndicator, View, Text} from 'react-native';

export default function Verification({navigation}) {
  // const dispatch = useDispatch();
  // const loginState = useSelector(state => state.login);
  console.log("sasasasasasas");
  const [bInit, setBInit] = useState(false);
  //
  useEffect(() => {
    return () => {};
  }, []);

  if (bInit) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.WHITE,
        }}>
        <ActivityIndicator color={colors.DARKISH_GREEN} size="large" />
      </View>
    );
  } else {
    return (
      <View style={{flex: 1}}>
        <Text>asd</Text>
      </View>
    );
  }
}
