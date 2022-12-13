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
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
const CELL_COUNT = 6;
import InputField from '../../components/InputField';
import {Button, GradientButton} from '../../components/Button';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
const win = Dimensions.get('window');
import {useLocale} from '../../hooks';
import AuthService from '../../services/AuthService';

export default function Verification({navigation, route}) {
  const {translations} = useLocale();

  const {userId, username} = route.params;
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  //
  useEffect(() => {
    return () => {};
  }, []);
  //
  const getValidity = () => {
    return !_.isEmpty(username);
  };
  //
  const onSubmit = async () => {
    try {
      const resp = await AuthService.resetPassword({
        userId: userId,
      });
      console.log('resp:::', resp);
      if (resp?.status === 201) {
        // await setToken(resp?.data?.token);
        navigation?.navigate(routes.VERIFICATION, {username, userId});
      }
    } catch (err) {}
  };
  //
  const resendOtp = () => {
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
          <View style={{marginTop: 16}}>
            <Text
              style={{
                color: colors.PRIMARY,
                fontSize: 18,
                fontWeight: 'bold',
                fontFamily: fonts.semiBold,
              }}>
              {translations.auth.eyp}
            </Text>
          </View>
          <View style={{marginTop: 80}}>
            <Text
              style={{
                color: colors.GRAY,
                fontSize: 16,
                fontFamily: fonts.regular,
              }}>
              {translations.auth.whso}
              {username}
            </Text>
          </View>
        </View>
        <View style={{flex: 1}}>
          <View style={{alignSelf: 'center'}}>
            <CodeField
              ref={ref}
              {...props}
              value={value}
              onChangeText={val => {
                setValue(val);
              }}
              cellCount={CELL_COUNT}
              rootStyle={styles.codeFieldRoot}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              renderCell={({index, symbol, isFocused}) => (
                <View
                  key={index}
                  style={{
                    width: 48,
                    height: 48,
                    backgroundColor: colors.WHITE,
                    margin: 4,
                    borderWidth: 2,
                    borderColor: colors.SECONDARY,
                    borderRadius: 10,
                  }}>
                  <Text
                    style={[styles.cell, isFocused && styles.focusCell]}
                    onLayout={getCellOnLayoutHandler(index)}>
                    {symbol || (isFocused ? <Cursor /> : null)}
                  </Text>
                </View>
              )}
            />
          </View>
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
            text={translations.submit}
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
              {translations.auth.dgt}
            </Text>
            <TouchableOpacity onPress={resendOtp}>
              <Text
                style={{
                  color: colors.SECONDARY,
                  fontStyle: 'italic',
                  fontSize: 20,
                  fontFamily: fonts.semiBold,
                }}>
                {translations.auth.resend}
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
  title: {textAlign: 'center', fontSize: 30},
  codeFieldRoot: {
    marginTop: 16,
  },
  cell: {
    textAlign: 'center',
    lineHeight: 46,
    fontSize: 25,

    color: colors.GRAY,
  },
  focusCell: {
    borderColor: colors.PRIMARY,
  },
});
