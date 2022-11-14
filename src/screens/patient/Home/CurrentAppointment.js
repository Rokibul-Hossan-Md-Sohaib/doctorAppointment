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
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import PatientWrapper from '../wrapper';
import {images, colors, routes, fonts} from '../../../config';
import {Button, GradientButton} from '../../../components/Button';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
const win = Dimensions.get('window');
import {useLocale} from '../../../hooks';
import {
  RegularText,
  SemiboldText,
  BoldText,
  GradientText,
} from '../../../components/Text';

//
export default function CurAppointment({navigation}) {
  const {translations} = useLocale();
  const [showModal, setShowModal] = useState(false);
  //
  useEffect(() => {
    return () => {};
  }, []);

  //onCancel
  const onCancel = () => {
    try {
    } catch (err) {}
  };
  //
  return (
    <PatientWrapper
      hdr={true}
      hdrText={'Upcoming Appointment'}
      back={true}
      navigation={navigation}>
      <KeyboardAwareScrollView style={{flex: 1, marginVertical: 16}}>
        <View
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
            onPress={() => {}}
            deactivate={true}
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
        </View>
        <View
          style={{
            borderWidth: 1,
            height: 250,
            borderRadius: 8,
            borderColor: colors.PRIMARY,
            position: 'static',
            bottom: 0,
            backgroundColor: '#fff',
            marginHorizontal: 16,
            marginVertical: 16,
          }}>
          <GradientButton
            onPress={() => {}}
            deactivate={true}
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
            text={'Appointment Details'}
          />
          <View style={{padding: 10}}>
            <View style={{flexDirection: 'row', marginVertical: 8}}>
              <View style={{flex: 1}}>
                <RegularText
                  style={{fontSize: 12, color: '#000'}}
                  title={'Date:'}
                />
              </View>
              <View style={{flex: 1, alignItems: 'flex-end'}}>
                <RegularText
                  style={{fontSize: 12, color: '#000'}}
                  title={'Sat 20 Sept 2022'}
                />
              </View>
            </View>
            <View style={{flexDirection: 'row', marginVertical: 8}}>
              <View style={{flex: 1}}>
                <RegularText
                  style={{fontSize: 12, color: '#000'}}
                  title={'Serial :'}
                />
              </View>
              <View style={{flex: 1, alignItems: 'flex-end'}}>
                <RegularText
                  style={{fontSize: 12, color: '#000'}}
                  title={'210'}
                />
              </View>
            </View>
            <View style={{flexDirection: 'row', marginVertical: 8}}>
              <View style={{flex: 1}}>
                <RegularText
                  style={{fontSize: 12, color: '#000'}}
                  title={'Time:'}
                />
              </View>
              <View style={{flex: 1, alignItems: 'flex-end'}}>
                <RegularText
                  style={{fontSize: 12, color: '#000'}}
                  title={'8.00 am - 5.00 pm'}
                />
              </View>
            </View>
            <View style={{flexDirection: 'row', marginVertical: 8}}>
              <View style={{flex: 1}}>
                <RegularText
                  style={{fontSize: 12, color: '#000'}}
                  title={'Location:'}
                />
              </View>
              <View style={{flex: 1, alignItems: 'flex-end'}}>
                <RegularText
                  style={{fontSize: 12, color: '#000'}}
                  title={'Online Appointment'}
                />
              </View>
            </View>
            <View style={{flexDirection: 'row', marginVertical: 8}}>
              <View style={{flex: 1}}>
                <RegularText
                  style={{fontSize: 12, color: '#000'}}
                  title={'Payment By:'}
                />
              </View>
              <View style={{flex: 1, alignItems: 'flex-end'}}>
                <RegularText
                  style={{fontSize: 12, color: '#000'}}
                  title={'Card'}
                />
              </View>
            </View>
            <View style={{flexDirection: 'row', marginVertical: 8}}>
              <View style={{flex: 1}}>
                <RegularText
                  style={{fontSize: 12, color: '#000'}}
                  title={'Amount:'}
                />
              </View>
              <View style={{flex: 1, alignItems: 'flex-end'}}>
                <RegularText
                  style={{fontSize: 12, color: '#000'}}
                  title={'BDT 500 tk'}
                />
              </View>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
      <GradientButton
        onPress={() => setShowModal(true)}
        cl1={colors.PRIMARY}
        cl2={colors.SECONDARY}
        style={{
          height: 48,
          marginHorizontal: 16,
        }}
        titleStyle={{
          fontSize: 16,
          color: colors.WHITE,
          fontFamily: fonts.bold,
        }}
        text={'Cancel Appointment'}
      />
      {showModal && <AlertModal hideModal={() => setShowModal(false)} />}
    </PatientWrapper>
  );
}
//
const AlertModal = ({hideModal}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      onRequestClose={() => {
        hideModal();
      }}>
      <TouchableWithoutFeedback onPress={() => hideModal()}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <BoldText
                style={{fontSize: 18, color: '#000', marginVertical: 16}}
                title={'Cancel Appointment?'}
              />
              <SemiboldText
                style={{fontSize: 14, color: '#72777A'}}
                title={'Are you sure want to cancel this appointment?'}
              />
              <GradientButton
                onPress={() => setShowModal(true)}
                cl1={colors.PRIMARY}
                cl2={colors.SECONDARY}
                style={{
                  height: 48,
                  width: 300,
                  marginVertical: 16,
                }}
                titleStyle={{
                  fontSize: 16,
                  color: colors.WHITE,
                  fontFamily: fonts.bold,
                }}
                text={'Cancel'}
              />
              <TouchableOpacity onPress={() => hideModal()}>
                <GradientText
                  onPress={() => {}}
                  cl1={colors.PRIMARY}
                  cl2={colors.SECONDARY}
                  style={{fontSize: 14}}>
                  No, thanks
                </GradientText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    height: 200,
    width: '90%',
    // marginHorizontal: 16,
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
