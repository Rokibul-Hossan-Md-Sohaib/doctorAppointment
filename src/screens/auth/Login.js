/*
 * @copyRight by iHealthScreen
 */
import React, {useEffect, useState, useContext} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavigationService from '../../services/NavigationService';
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
import AuthWrapper from './AuthWrapper';
import {images, colors, routes, fonts} from '../../config';
import InputField from '../../components/InputField';
import {Button, GradientButton} from '../../components/Button';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useLocale} from '../../hooks';
import AuthService from '../../services/AuthService';
import {setToken} from '../../utils';
import AuthContext from '../../shared/AuthContext';

const win = Dimensions.get('window');
const passwordRef = React.createRef();
const goToPassword = event => {
  passwordRef.current.focus();
};

export default function Login({navigation}) {
  // const dispatch = useDispatch();
  // const loginState = useSelector(state => state.login);
  const {signIn, isLoading} = useContext(AuthContext);
  console.log('isLoadingisLoadingisLoadingisLoading:::', isLoading);
  const {translations} = useLocale();
  const [bInit, setBInit] = useState(false);
  const [pShow, setPshow] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  //
  useEffect(() => {
    return () => {};
  }, []);
  //
  const rightIcon = () => {
    return (
      <TouchableOpacity
        style={{position: 'absolute', right: 15, marginTop: 12}}
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
  const getValidity = () => {
    return !_.isEmpty(username) && !_.isEmpty(password);
  };
  //
  const signInPress = async () => {
    try {
      const resp = await AuthService.login({
        username: username,
        password: password,
      });
      console.log('resp:::', resp);
      if (resp?.status === 201) {
        // await setToken(resp?.data?.token);
        await signIn(resp?.data?.token);
      }
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
      <AuthWrapper>
        <KeyboardAwareScrollView style={{flex: 1}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              height: 40,
              marginVertical: 40,
            }}>
            <View style={{marginRight: 5}}>
              <Image style={{height: 30, width: 36}} source={images.app_icon} />
            </View>
            <Text
              style={{
                color: colors.PRIMARY,
                fontSize: 30,
                fontWeight: 'bold',
              }}>
              MyHealth
            </Text>
          </View>
          <View style={{flex: 1, alignItems: 'center', marginBottom: 20}}>
            <Image
              style={{width: 300, height: win.height / 5}}
              resizeMode="contain"
              source={images.login_logo}
            />
            <View style={{marginVertical: 10}}>
              <Text
                style={{
                  color: colors.PRIMARY,
                  fontSize: 18,
                  fontWeight: 'bold',
                  fontFamily: fonts.bold,
                }}>
                {translations.auth.sadn}
              </Text>
            </View>
            <View style={{}}>
              <Text
                style={{
                  color: colors.GRAY,
                  fontSize: 16,
                  fontFamily: fonts.regular,
                }}>
                {translations.auth.signininfo1}
              </Text>
            </View>
            <View>
              <Text
                style={{
                  color: colors.GRAY,
                  fontSize: 16,
                  fontFamily: fonts.regular,
                }}>
                {translations.auth.signininfo2}
              </Text>
            </View>
          </View>
          <View style={{flex: 1}}>
            <InputField
              placeholder={translations.auth.tyeapn}
              value={username}
              style={styles.inputFieldStyle}
              onChangeText={text => {
                setUsername(text);
              }}
              onSubmitEditing={goToPassword}
              containerStyle={[styles.inputContainerStyle]}
              returnKeyType="next"
            />
            <InputField
              ref={passwordRef}
              value={password}
              placeholder={translations.auth.typ}
              errorStyle={{color: 'red'}}
              errorMessage=""
              onChangeText={text => {
                setPassword(text);
              }}
              style={styles.inputFieldStyle}
              secureTextEntry={pShow ? false : true}
              containerStyle={[styles.inputContainerStyle]}
              returnKeyType="done"
              rightIcon={rightIcon}
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
              onPress={signInPress}
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
              text={translations.auth.signin}
            />
            <TouchableOpacity
              onPress={() => {
                navigation?.navigate(routes.FORGOT_PASSWORD);
              }}
              style={{
                alignItems: 'flex-end',
                justifyContent: 'center',
                marginRight: 30,
                marginTop: 16,
              }}>
              <Text
                style={{
                  color: colors.SECONDARY,
                  fontSize: 16,
                  fontFamily: fonts.regular,
                }}>
                {translations.auth.forgetpassword}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation?.navigate(routes.SIGNUP);
              }}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 16,
              }}>
              <Text
                style={{
                  color: colors.SECONDARY,
                  fontSize: 20,
                  fontFamily: fonts.regular,
                }}>
                {translations.auth.dha}
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </AuthWrapper>
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
});
