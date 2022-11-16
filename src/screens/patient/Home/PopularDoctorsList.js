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
import Icon from 'react-native-vector-icons/FontAwesome5';
const win = Dimensions.get('window');
import {useLocale} from '../../../hooks';
import DoctorCard from './DoctorCard';
import {
  RegularText,
  SemiboldText,
  BoldText,
  GradientText,
} from '../../../components/Text';

export default function PopularDoctorsList({navigation}) {
  const {translations} = useLocale();
  const popularDoctors = ['a', 'b'];
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
    <View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          marginHorizontal: 16,
        }}>
        <View>
          <Text
            style={{
              fontFamily: fonts.semiBold,
              fontSize: 16,
              color: '#474747',
            }}>
            Popular Doctors
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'flex-end',
          }}>
          <Image
            style={{width: 20, height: 20}}
            resizeMode="contain"
            source={images.filter1}
          />
        </View>
        <View
          style={{
            alignItems: 'flex-start',
            marginRight: 10,
            marginHorizontal: 10,
          }}>
          <Image
            style={{width: 20, height: 20}}
            resizeMode="contain"
            source={images.filter2}
          />
        </View>
      </View>
      {/* doctor card */}
      <View style={{marginHorizontal: 16}}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          extraData={popularDoctors}
          data={popularDoctors}
          renderItem={({item}) => {
            return (
              <DoctorCard
                showDoctorDetails={() =>
                  navigation?.navigate(routes.DOCTOR_DETAILS)
                }
                navigation={navigation}
              />
            );
          }}
        />
      </View>

      <TouchableOpacity
        style={{marginHorizontal: 16}}
        onPress={() => {
          navigation?.navigate(routes.DOCTOR_LIST);
        }}>
        <GradientText
          cl1={colors.PRIMARY}
          cl2={colors.SECONDARY}
          style={{fontSize: 16}}>
          See all doctors
        </GradientText>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  card: {
    flexDirection: 'row',
    height: 171,
    width: 330,
    backgroundColor: '#fff',
    marginVertical: 16,
    marginRight: 10,
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
