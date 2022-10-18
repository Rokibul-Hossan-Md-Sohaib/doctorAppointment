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
  FlatList,
} from 'react-native';
import PatientWrapper from '../wrapper';
import {images, colors, routes, fonts} from '../../../config';
import {RegularText, SemiboldText, BoldText} from '../../../components/Text';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {GradientButton} from '../../../components/Button';
import DoctorCard from '../Home/DoctorCard';
import {useLocale} from '../../../hooks';
//
export default function FavDoctors({navigation}) {
  const {translations} = useLocale();
  const [bInit, setBInit] = useState(false);
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
        hdrText={'Favourite Doctors'}
        back={true}
        navigation={navigation}>
        <View style={{marginHorizontal: 16, flex: 1}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            extraData={['1', '2']}
            data={['1', '2']}
            renderItem={({item}) => {
              return (
                <DoctorCard
                  cardStyle={{marginRight: 0, marginVertical: 10}}
                  fav={true}
                />
              );
            }}
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
          text="Add a doctor"
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
});
