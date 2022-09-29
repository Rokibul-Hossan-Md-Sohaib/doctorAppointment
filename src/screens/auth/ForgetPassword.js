/*
 * @copyRight by iHealthScreen
 */
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
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
const win = Dimensions.get('window');
import {useLocale} from '../../hooks';

export default function ForgetPassword({navigation}) {
  const {translations} = useLocale();
  const [username, setUsername] = useState('');
  //
  useEffect(() => {
    return () => {};
  }, []);
  //
  const getValidity = () => {
    return !_.isEmpty(username);
  };
  //
  const onSubmit = () => {
    try {
      navigation?.navigate(routes.VERIFICATION, {username: username});
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
              {translations.auth.ryp}
            </Text>
          </View>
          <View style={{}}>
            <Text
              style={{
                color: colors.GRAY,
                fontSize: 16,
                fontFamily: fonts.regular,
              }}>
              {translations.auth.rpi}
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
            containerStyle={[styles.inputContainerStyle]}
            returnKeyType="next"
          />
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
            text={translations.auth.rp}
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
              {translations.auth.bt}
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
