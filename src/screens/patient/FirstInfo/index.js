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
import PatientWrapper from '../wrapper';
import {images, colors, routes, fonts} from '../../../config';
import InputField from '../../../components/InputField';
import {Button, GradientButton} from '../../../components/Button';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
const win = Dimensions.get('window');
const passwordRef = React.createRef();
const goToPassword = event => {
  passwordRef.current.focus();
};
// const
export default function PatientInfo({navigation}) {
  // const dispatch = useDispatch();
  // const loginState = useSelector(state => state.login);
  const [bInit, setBInit] = useState(false);
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
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
      <PatientWrapper>
        <KeyboardAwareScrollView style={{flex: 1}}>
          <View style={{flex: 1, alignItems: 'center', marginBottom: 20}}>
            <Image
              style={{width: 300, height: win.height / 5}}
              resizeMode="contain"
              source={images.patient_info}
            />
            <View style={{marginVertical: 10}}>
              <Text
                style={{
                  color: colors.PRIMARY,
                  fontSize: 18,
                  fontWeight: 'bold',
                  fontFamily: fonts.bold,
                }}>
                PLEASE UPDATE YOUR INFO
              </Text>
            </View>
            <View style={{}}>
              <Text
                style={{
                  color: colors.GRAY,
                  fontSize: 16,
                  fontFamily: fonts.regular,
                }}>
                Update your basic info to create an
              </Text>
            </View>
            <View>
              <Text
                style={{
                  color: colors.GRAY,
                  fontSize: 16,
                  fontFamily: fonts.regular,
                }}>
                appointment instantly
              </Text>
            </View>
          </View>
          <View style={{flex: 1}}>
            <InputField
              placeholder={'Age'}
              value={age}
              style={styles.inputFieldStyle}
              onChangeText={text => {
                setAge(text);
              }}
              keyboardType={'number-pad'}
              onSubmitEditing={goToPassword}
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
              text="Update now"
            />
            <TouchableOpacity
              onPress={() => {
                navigation?.navigate(routes.FORGOT_PASSWORD);
              }}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 16,
              }}>
              <Text
                style={{
                  color: colors.PRIMARY,
                  fontSize: 16,
                  fontFamily: fonts.regular,
                }}>
                Skip
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
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
});
