/*
 * @copyRight by iHealthScreen
 */
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavigationService from '../../../services/NavigationService';
import _ from 'lodash';
import {
  ActivityIndicator,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useLocale} from '../../../hooks';
import PatientWrapper from '../wrapper';
import {images, colors, routes, fonts} from '../../../config';
import InputField from '../../../components/InputField';
import {Button, GradientButton} from '../../../components/Button';
import Password from '../../../components/Password';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
const passwordRef = React.createRef();
const cnfPasswordRef = React.createRef();
export default function PasswordChange({navigation}) {
  const {translations} = useLocale();
  const [bInit, setBInit] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  //
  useEffect(() => {
    return () => {};
  }, []);
  //
  const getValidity = () => {
    return !_.isEmpty(username) && !_.isEmpty(password);
  };
  //onSubmit
  const onSubmit = () => {
    try {
    } catch (err) {}
  };
  //
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
      <PatientWrapper
        hdr={true}
        hdrText={'Password Settings'}
        back={true}
        navigation={navigation}>
        <KeyboardAwareScrollView style={{flex: 1}}>
          <View style={{flex: 1, marginTop: 16}}>
            <InputField
              placeholder={'Previous password'}
              value={oldPassword}
              style={styles.inputFieldStyle}
              onChangeText={text => {
                setOldPassword(text);
              }}
              containerStyle={[styles.inputContainerStyle]}
              returnKeyType="next"
            />
            <Password
              passwordRef={passwordRef}
              cnfPasswordRef={cnfPasswordRef}
              password={password}
              confPassword={confPassword}
              setPassword={text => {
                setPassword(text);
              }}
              setConfPassword={text => {
                setConfPassword(text);
              }}
            />
          </View>
        </KeyboardAwareScrollView>
        <GradientButton
          onPress={onSubmit}
          cl1={colors.PRIMARY}
          cl2={colors.SECONDARY}
          style={{
            height: 48,
            marginHorizontal: 20,
            marginTop: 16,
          }}
          titleStyle={{
            fontSize: 20,
            color: colors.WHITE,
          }}
          text="Save"
        />
      </PatientWrapper>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainerStyle: {
    marginTop: 16,
    marginHorizontal: 8,
  },
  inputFieldStyle: {
    borderWidth: 1,
    borderColor: colors.LIGHT_GRAY,
    borderRadius: 8,
  },
  imgStyle: {
    height: 200,
    width: 200,
    borderRadius: 100,
    backgroundColor: '#00CACE',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
