/*
 * @copyRight by iHealthScreen
 */
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavigationService from '../../services/NavigationService';
import _ from 'lodash';
import {ShowAlert} from '../../components/ShowAlert';

import {
  ActivityIndicator,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import AuthWrapper from './AuthWrapper';
import {images, colors, routes, fonts} from '../../config';
import InputField from '../../components/InputField';
import {Button, GradientButton} from '../../components/Button';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
const usernameRef = React.createRef();
const passwordRef = React.createRef();
const cnfPasswordRef = React.createRef();

export default function SignUp({navigation}) {
  const [pShow, setPshow] = useState(false);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  //
  useEffect(() => {
    return () => {};
  }, []);
  //
  const rightIcon = () => {
    return (
      <TouchableOpacity
        style={{position: 'absolute', right: 15, marginTop: 14}}
        onPress={() => setPshow(!pShow)}>
        <Icon
          name={pShow ? 'eye' : 'eye-slash'}
          size={22}
          color={colors.GRAY}
        />
      </TouchableOpacity>
    );
  };
  //
  //
  const rightIconCnfPass = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          ShowAlert({
            title: 'info!',
            msg: 'Passwords do NOT match',
            OnOK: () => {},
          });
        }}
        style={{position: 'absolute', right: 15, marginTop: 14}}>
        <Icon
          name={
            password.length && password === confPassword
              ? 'check-circle'
              : confPassword.length && confPassword.length
              ? 'info-circle'
              : null
          }
          size={22}
          color={password === confPassword ? colors.SUCCESS : colors.INFO}
        />
      </TouchableOpacity>
    );
  };
  //
  const getValidity = () => {
    return (
      !_.isEmpty(username) &&
      !_.isEmpty(password) &&
      !_.isEmpty(name) &&
      !_.isEmpty(confPassword) &&
      _.isEqual(password, confPassword)
    );
  };
  //
  const signUpPress = () => {
    try {
    } catch (err) {}
  };
  //
  return (
    <AuthWrapper>
      <KeyboardAwareScrollView style={{flex: 1}}>
        <View
          style={{
            marginTop: 40,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            style={{height: 78, width: 66}}
            source={images.app_icon}
            resizeMode={'contain'}
          />
          <View style={{marginVertical: 16}}>
            <Text
              style={{
                color: colors.PRIMARY,
                fontSize: 18,
                fontWeight: 'bold',
                fontFamily: fonts.semiBold,
              }}>
              Create a Free Account
            </Text>
          </View>
        </View>
        <View style={{flex: 1}}>
          <InputField
            placeholder={'Name'}
            value={name}
            style={styles.inputFieldStyle}
            onChangeText={text => {
              setName(text);
            }}
            onSubmitEditing={() => usernameRef.current.focus()}
            containerStyle={[styles.inputContainerStyle]}
            returnKeyType="next"
          />
          <InputField
            ref={usernameRef}
            placeholder={'Phone/Email'}
            value={username}
            style={styles.inputFieldStyle}
            onChangeText={text => {
              setUsername(text);
            }}
            onSubmitEditing={() => passwordRef.current.focus()}
            containerStyle={[styles.inputContainerStyle]}
            returnKeyType="next"
          />
          <InputField
            ref={passwordRef}
            value={password}
            placeholder={'Password'}
            errorStyle={{color: 'red'}}
            errorMessage=""
            onChangeText={text => {
              setPassword(text);
            }}
            onSubmitEditing={() => cnfPasswordRef.current.focus()}
            style={styles.inputFieldStyle}
            secureTextEntry={pShow ? false : true}
            containerStyle={[styles.inputContainerStyle]}
            returnKeyType="done"
            rightIcon={rightIcon}
          />
          <InputField
            ref={cnfPasswordRef}
            value={confPassword}
            placeholder={'Confirm Password'}
            errorStyle={{color: 'red'}}
            errorMessage=""
            onChangeText={text => {
              setConfPassword(text);
            }}
            style={styles.inputFieldStyle}
            secureTextEntry={pShow ? false : true}
            containerStyle={[styles.inputContainerStyle]}
            returnKeyType="done"
            rightIcon={rightIconCnfPass}
          />
          {/* <Button
          disabled={!getValidity()}
          onPress={signInPress}
          style={{
            height: 48,
            marginHorizontal: 16,
            marginTop: 12,
            borderRadius: 8,
            borderStyle: 'solid',
            borderWidth: 0.6,
            borderColor: '#e0e0e0',
            backgroundColor: getValidity()
              ? colors.SECONDARY
              : colors.LIGHT_GRAY,
          }}
          titleStyle={{
            fontSize: 20,
          }}
          title={'Sign in'}
        /> */}
          <GradientButton
            onPress={signUpPress}
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
            text="Sign Up"
            disabled={!getValidity()}
          />
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: 16,
              flexDirection: 'row',
            }}>
            <Text
              style={{
                color: colors.GRAY,
                fontSize: 16,
                fontFamily: fonts.semiBold,
              }}>
              Already have an account?
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation?.navigate(routes.LOGIN);
              }}>
              <Text
                style={{
                  color: colors.SECONDARY,
                  fontStyle: 'italic',
                  fontSize: 20,
                  fontFamily: fonts.semiBold,
                }}>
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </AuthWrapper>
  );
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
});
