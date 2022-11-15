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
  FlatList,
  SafeAreaView,
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
import PatientPackage from './PatientPackage';
import {AppModal} from '../../../components/Modal';
import DoctorCard from './DoctorCard';
import {RegularText, SemiboldText, BoldText} from '../../../components/Text';

const searchRef = React.createRef();

export default function Home({navigation}) {
  const {translations} = useLocale();
  const [bInit, setBInit] = useState(false);
  const [searchDoc, setSearchDoc] = useState('');
  const popularDoctors = ['a', 'b'];

  //
  useEffect(() => {
    return () => {};
  }, []);
  //
  useEffect(() => {
    if (searchDoc.length == 1) {
      searchRef.current.focus();
    }
    return () => {};
  }, [searchDoc.length && searchDoc.length === 1]);
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
                  width: 60,
                  alignItems: 'flex-end',
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
          <View style={styles.gap}></View>
          <PopularDoctorsList navigation={navigation} />
          <View style={styles.gap}></View>
          {/* Package */}
          <PatientPackage />
          <View style={styles.gap}></View>
        </KeyboardAwareScrollView>
        {searchDoc.length > 0 && (
          <AppModal
            closeModal={() => setSearchDoc('')}
            navigation={navigation}
            hideClose={true}
            style={{backgroundColor: '#EFF4FA'}}>
            <SafeAreaView style={{flex: 1, marginVertical: 16}}>
              <InputField
                placeholder={translations.search_doctor}
                value={searchDoc}
                style={styles.inputFieldStyle}
                onChangeText={text => {
                  setSearchDoc(text);
                }}
                ref={searchRef}
                containerStyle={[styles.inputContainerStyle]}
                returnKeyType="next"
              />
              <Icon
                style={{position: 'absolute', right: 40, top: 56}}
                name={'search'}
                size={18}
                color={colors.GRAY}
              />
              <View style={{flex: 1, marginHorizontal: 16}}>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  extraData={popularDoctors}
                  data={popularDoctors}
                  renderItem={({item}) => {
                    return (
                      <DoctorCard
                        showDoctorDetails={() => {
                          setSearchDoc('');
                          navigation?.navigate(routes.DOCTOR_DETAILS);
                        }}
                        cardStyle={{marginRight: 0}}
                        navigation={navigation}
                      />
                    );
                  }}
                />
              </View>
            </SafeAreaView>
          </AppModal>
        )}
        <TouchableOpacity
          onPress={() => {
            navigation?.navigate(routes.CUR_APPOINTMENT);
          }}
          style={{
            borderWidth: 1,
            height: 90,
            borderRadius: 8,
            borderColor: colors.PRIMARY,
            position: 'static',
            bottom: 0,
            backgroundColor: '#fff',
            marginHorizontal: 16,
          }}>
          <GradientButton
            onPress={() => {
              navigation?.navigate(routes.CUR_APPOINTMENT);
            }}
            cl1={colors.PRIMARY}
            cl2={colors.SECONDARY}
            style={{
              height: 30,
            }}
            titleStyle={{
              fontSize: 12,
              color: colors.WHITE,
              fontFamily: fonts.semiBold,
            }}
            text={'You have scheduled Appointment in 3 day 2 hour 38 Minute'}
          />
          <View style={{flexDirection: 'row'}}>
            <Image
              style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                marginVertical: 10,
                justifyContent: 'flex-start',
                marginHorizontal: 10,
              }}
              resizeMode="contain"
              source={images.profile_demo}
            />
            <View style={{marginVertical: 12, flex: 1}}>
              <RegularText
                style={{fontSize: 12, color: '#000'}}
                title={'Dr. Sadia Jahan'}
              />
              <RegularText
                style={{fontSize: 12, color: '#222222'}}
                title={'General Physician'}
              />
            </View>
            <View
              style={{
                backgroundColor: '#C2C2C2',
                width: 1,
                height: 30,
                marginVertical: 12,
              }}></View>
            <View style={{marginVertical: 12, marginLeft: 10, flex: 1}}>
              <RegularText
                style={{fontSize: 12, color: '#282828'}}
                title={'Date: 21 Nov 2022'}
              />
              <RegularText
                style={{fontSize: 12, color: '#282828'}}
                title={'Location: Chamber'}
              />
            </View>
          </View>
        </TouchableOpacity>
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
  gap: {
    height: 4,
    backgroundColor: '#D9E7F0',
    marginVertical: 16,
  },
});
