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
import {genderList} from '../../../utils';
import {isLogBoxErrorMessage} from 'react-native/Libraries/LogBox/Data/LogBoxData';
const win = Dimensions.get('window');
const passwordRef = React.createRef();
const goToPassword = event => {
  passwordRef.current.focus();
};
export default function PatientInfo({navigation}) {
  const [bInit, setBInit] = useState(false);
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
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
          <View style={{flex: 1, alignItems: 'center', marginTop: 60}}>
            <Image
              style={{width: 300, height: win.height / 5}}
              resizeMode="contain"
              source={images.patient_info}
            />
            <View style={{marginTop: 26}}>
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
            <View style={{marginTop: 16}}>
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
          <View style={{flex: 1, marginTop: 16}}>
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
            <View style={{flexDirection: 'row'}}>
              {genderList.map(item => (
                <Button
                  onPress={() => {
                    setGender(item.val);
                  }}
                  style={{
                    flex: 1,
                    marginTop: 16,
                    height: 48,
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor:
                      gender === item.val ? colors.PRIMARY : colors.LIGHT_GRAY,
                    backgroundColor: '#fff',
                  }}
                  titleStyle={{
                    fontSize: 20,
                    color: '#0098DA',
                    alignItems: 'flex-start',
                    fontFamily: fonts.regular,
                    textAlign: 'left',
                  }}
                  title={item.name}
                  leftIconStyle={{
                    width: 24,
                    height: 24,
                    marginHorizontal: 16,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  leftIcon={item.img}
                />
              ))}
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
              text="Update now"
            />
            <TouchableOpacity
              onPress={() => {
                navigation?.navigate(routes.FORGOT_PASSWORD);
              }}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 80,
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
