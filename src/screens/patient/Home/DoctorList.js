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
import {images, colors, routes, fonts} from '../../../config';
import InputField from '../../../components/InputField';
import {Button, GradientButton} from '../../../components/Button';
import Icon from 'react-native-vector-icons/FontAwesome5';
const win = Dimensions.get('window');
import {useLocale} from '../../../hooks';
import {AppModal} from '../../../components/Modal';
import DoctorCard from './DoctorCard';
import {RegularText, SemiboldText, BoldText} from '../../../components/Text';
import Department from '../DoctorCategory/Department';

const searchRef = React.createRef();

export default function AllDoctorList({navigation, closeModal}) {
  const {translations} = useLocale();
  const [bInit, setBInit] = useState(false);
  const popularDoctors = ['a', 'b'];
  //
  useEffect(() => {
    return () => {};
  }, []);
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
      <AppModal
        closeModal={() => closeModal()}
        navigation={navigation}
        hideClose={true}
        style={{backgroundColor: '#EFF4FA'}}>
        <SafeAreaView style={{flex: 1, marginVertical: 16}}>
          <View style={{height: 80, marginVertical: 8}}>
            <Department />
          </View>
          <View style={{flex: 1, marginHorizontal: 16}}>
            <FlatList
              showsVerticalScrollIndicator={false}
              extraData={popularDoctors}
              data={popularDoctors}
              renderItem={({item}) => {
                return (
                  <DoctorCard
                    showDoctorDetails={() => {
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
