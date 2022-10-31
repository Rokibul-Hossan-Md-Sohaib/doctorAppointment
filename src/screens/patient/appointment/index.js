/*
 * @copyRight by iHealthScreen
 */
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
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
import {
  RegularText,
  SemiboldText,
  BoldText,
  GradientText,
} from '../../../components/Text';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {GradientButton} from '../../../components/Button';
import {Calendar} from '../../../modules';
import {useLocale} from '../../../hooks';
//
export default function Appointment({navigation}) {
  const {translations} = useLocale();
  const [bInit, setBInit] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
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
      <PatientWrapper
        hdr={true}
        hdrText={'Appointment'}
        back={true}
        navigation={navigation}>
        <KeyboardAwareScrollView
          style={{flex: 1, marginHorizontal: 16, marginVertical: 8}}>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1, alignItems: 'flex-start'}}>
              <BoldText
                style={{fontSize: 16, color: '#282828'}}
                title={'Patient'}
              />
            </View>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <TouchableOpacity style={{}} onPress={() => {}}>
                <GradientText
                  onPress={() => {}}
                  cl1={colors.PRIMARY}
                  cl2={colors.SECONDARY}
                  style={{fontSize: 14}}>
                  Change Patient
                </GradientText>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{flex: 1, marginTop: 8, marginHorizontal: 8}}>
            <BoldText
              style={{fontSize: 16, color: '#282828'}}
              title={'Nasir Uddin'}
            />
            <SemiboldText
              style={{fontSize: 12, color: '#282828'}}
              title={'Age: 26 Years Gender: Male'}
            />
          </View>

          <View style={{flexDirection: 'row', marginVertical: 8}}>
            <View style={{flex: 1, alignItems: 'flex-start'}}>
              <BoldText
                style={{fontSize: 16, color: '#282828'}}
                title={'Selected Doctor'}
              />
            </View>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <TouchableOpacity style={{}} onPress={() => {}}>
                <GradientText
                  onPress={() => {}}
                  cl1={colors.PRIMARY}
                  cl2={colors.SECONDARY}
                  style={{fontSize: 14}}>
                  Change Doctor
                </GradientText>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View>
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
            </View>
            <View style={{flex: 1, marginHorizontal: 5}}>
              <BoldText
                style={{fontSize: 12, color: '#282828'}}
                title={'Dr. Sadia Jahan'}
              />
              <RegularText
                style={{fontSize: 12, color: '#282828'}}
                title={'General Physician'}
              />
              <RegularText
                style={{fontSize: 12, color: '#282828'}}
                title={'Fees: 200'}
              />
            </View>
            <View
              style={{
                flex: 1,
                alignItems: 'flex-end',
              }}>
              <BoldText
                style={{
                  textAlign: 'left',
                  fontSize: 12,
                  color: '#282828',
                }}
                title={'Type'}
              />
              <RegularText
                style={{
                  fontSize: 12,
                  color: '#282828',
                }}
                title={'Chamber'}
              />
            </View>
          </View>
          <View style={{flex: 1, marginVertical: 8}}>
            <BoldText
              style={{fontSize: 16, color: '#282828'}}
              title={'Select Appointment Date'}
            />
          </View>
          <View>
            <TouchableOpacity
              style={{marginVertical: 10}}
              onPress={() => setIsCalendarVisible(!isCalendarVisible)}>
              <View
                style={{
                  flexDirection: 'row',
                  borderRadius: 8,
                  borderStyle: 'solid',
                  borderWidth: 0.6,
                  borderColor: '#e0e0e0',
                  backgroundColor: '#fff',
                  height: 48,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingRight: 15,
                  paddingLeft: 15,
                }}>
                <View
                  style={{
                    fontFamily: fonts.regular,
                    fontSize: 16,
                  }}>
                  <Text>Date</Text>
                </View>
                <View>
                  <Icon name={'calendar-alt'} size={22} color={colors.GRAY} />
                </View>
              </View>
            </TouchableOpacity>
            {isCalendarVisible && (
              <Calendar
                selectedDate={selectedDate}
                setSelectedDate={val => setSelectedDate(val)}
              />
            )}
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
          text="Make Payment & Confirm"
        />
      </PatientWrapper>
    );
  }
}
//
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
  card: {
    flexDirection: 'row',
    height: 70,
    flex: 1,
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 20,
    borderRadius: 8,
    borderStyle: 'solid',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 8,
  },
  imgStyle: {
    height: 44,
    width: 44,
    borderRadius: 22,
    backgroundColor: '#00CACE',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
