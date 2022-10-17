/*
 * @copyRight by iHealthScreen
 */
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavigationService from '../../services/NavigationService';
import _ from 'lodash';
import {ShowAlert} from '../../components/ShowAlert';
import {useLocale} from '../../hooks';
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
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Password from '../../components/Password';

const usernameRef = React.createRef();
const passwordRef = React.createRef();
const cnfPasswordRef = React.createRef();

export default function SignUp({navigation}) {
  const {translations} = useLocale();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  //
  useEffect(() => {
    return () => {};
  }, []);
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
              {translations.auth.cfa}
            </Text>
          </View>
        </View>
        <View style={{flex: 1}}>
          <InputField
            placeholder={translations.name}
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
            placeholder={translations.auth.pe}
            value={username}
            style={styles.inputFieldStyle}
            onChangeText={text => {
              setUsername(text);
            }}
            onSubmitEditing={() => passwordRef.current.focus()}
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
            text={translations.auth.signup}
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
              {translations.auth.aha}
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
                {translations.auth.signin}
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
