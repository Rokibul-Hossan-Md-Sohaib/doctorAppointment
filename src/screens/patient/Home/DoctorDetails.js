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
} from 'react-native';
import {images, colors, routes, fonts} from '../../../config';
import InputField from '../../../components/InputField';
import {Button, GradientButton} from '../../../components/Button';
import AppModal from '../../../components/Modal';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import {useLocale} from '../../../hooks';
import StarRating from 'react-native-star-rating';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import PatientWrapper from '../wrapper';
import DoctorCard from './DoctorCard';
export default function DoctorDetails({navigation, closeModal}) {
  const {translations} = useLocale();
  const [starCount, setStarCount] = useState(4);
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
  return (
    // <AppModal closeModal={closeModal} navigation={navigation}>
    //   <Text>asd</Text>
    // </AppModal>
    <PatientWrapper
      hdr={true}
      hdrText={'Doctor Profile'}
      back={true}
      navigation={navigation}>
      <KeyboardAwareScrollView style={{flex: 1}}>
        <DoctorCard cardStyle={styles.card} />
      </KeyboardAwareScrollView>
    </PatientWrapper>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    flexDirection: 'row',
    height: 171,
    flex: 1,
    marginVertical: 16,
    marginHorizontal: 16,
    backgroundColor: '#EFF4FA',
    marginRight: 0,
    borderRadius: 0,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
    padding: 8,
  },
  textStyle: {
    fontSize: 14,
    fontFamily: fonts.regular,
  },
  labelStyle: {
    fontSize: 12,
    fontFamily: fonts.regular,
    color: '#222222',
  },
});
