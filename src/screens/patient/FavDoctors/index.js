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
import {RegularText, SemiboldText, BoldText} from '../../../components/Text';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {GradientButton} from '../../../components/Button';

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
        <KeyboardAwareScrollView style={{flex: 1}}>
            
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
          text="Add a doctor"
        />
      </PatientWrapper>
    );
  }
}
//HistoryCard
function PatientCard({navigation}) {
  const [modalShow, setModalShow] = useState(false);
  const {translations} = useLocale();

  return (
    <View style={{flex: 1}}>
      <TouchableOpacity
        onPress={() => {
          setModalShow(true);
        }}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View style={styles.card}>
          <View style={{alignItems: 'flex-start', marginTop: 4}}>
            <Image
              style={styles.imgStyle}
              resizeMode="contain"
              source={images.profile_demo}
            />
          </View>
          <View style={{flex: 3, marginHorizontal: 8}}>
            <View style={{marginBottom: 8, marginTop: 4}}>
              <BoldText style={{fontSize: 16}} title={'Nazmun Nahar'} />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View style={{flex: 1}}>
                <RegularText
                  style={{fontSize: 12, color: '#282828'}}
                  title={'Age: 26 years'}
                />
              </View>
              <View style={{alignItems: 'flex-end'}}>
                <RegularText
                  style={{fontSize: 12, color: '#282828'}}
                  title={'Gender: Female'}
                />
              </View>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: 'flex-end',
              paddingRight: 10,
              justifyContent: 'center',
            }}>
            <Icon name={'chevron-right'} size={18} color={'#D8D8D8'} />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
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
