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
import {useLocale} from '../../../hooks';
import PopularDoctorsList from './PopularDoctorsList';
export default function Home({navigation}) {
  const {translations} = useLocale();
  const [bInit, setBInit] = useState(false);
  const [searchDoc, setSearchDoc] = useState('');
  //
  useEffect(() => {
    return () => {};
  }, []);
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
          {/*Header*/}
          <View style={styles.header}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: 16,
              }}>
              <Image
                style={{
                  width: 44,
                  height: 44,
                  justifyContent: 'flex-start',
                  marginHorizontal: 5,
                }}
                resizeMode="contain"
                source={images.profile_demo}
              />
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                }}>
                <View>
                  <Text style={{fontFamily: fonts.regular, fontSize: 16}}>
                    Welcome,{' '}
                  </Text>
                </View>
                <View>
                  <Text style={{fontFamily: fonts.bold, fontSize: 16}}>
                    Md Sarwar Hoshen
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: 'flex-end',
                  marginRight: 10,
                }}>
                <Image
                  style={{width: 24, height: 24}}
                  resizeMode="contain"
                  source={images.notification}
                />
              </View>
            </View>
            <View style={{flex: 1}}>
              <InputField
                placeholder={translations.search_doctor}
                value={searchDoc}
                style={styles.inputFieldStyle}
                onChangeText={text => {
                  setSearchDoc(text);
                }}
                containerStyle={[styles.inputContainerStyle]}
                returnKeyType="next"
              />
              <Icon
                style={{position: 'absolute', right: 40, top: 26}}
                name={'search'}
                size={18}
                color={colors.GRAY}
              />
            </View>
          </View>
          {/*Popular Doctors List*/}
          <View
            style={{
              height: 4,
              backgroundColor: '#D9E7F0',
              marginVertical: 16,
            }}></View>
          <PopularDoctorsList />
        </KeyboardAwareScrollView>
      </PatientWrapper>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 115,
    marginTop: 20,
  },
  inputContainerStyle: {
    marginTop: 16,
  },
  inputFieldStyle: {
    borderWidth: 1,
    borderColor: colors.LIGHT_GRAY,
    borderRadius: 8,
  },
  skipBtn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 40,
  },
});
