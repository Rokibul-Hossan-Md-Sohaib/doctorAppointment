/*
 * @copyRight by iHealthScreen
 */
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
// import LoginView from './dynamicLoginView';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavigationService from '../../services/NavigationService';
import {colors, routes} from '../../config';
import {ActivityIndicator, View, Text, Image} from 'react-native';
import AuthWrapper from './AuthWrapper';
import {images} from '../../config';

export default function Login({navigation}) {
  // const dispatch = useDispatch();
  // const loginState = useSelector(state => state.login);
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
      <AuthWrapper style={{flex: 1}}>
        <View style={{flex: 1, alignItems: 'center'}}>
          <View style={{flexDirection: 'row', height: 55, marginTop: 20}}>
            <View style={{marginRight: 5}}>
              <Image style={{height: 30, width: 34}} source={images.app_icon} />
            </View>
            <Text style={{color: '#0AA0C7', fontSize: 25, fontFamily: 'bold'}}>
              MyHealth
            </Text>
          </View>
        </View>
        <View style={{flex: 1}}></View>
      </AuthWrapper>
    );
  }
}
