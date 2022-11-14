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
import AppModal from '../../../components/Modal';
import DoctorCard from './DoctorCard';
import {RegularText, SemiboldText, BoldText} from '../../../components/Text';

const searchRef = React.createRef();

export default function AllDoctorList({navigation}) {
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
    console.log('asaasas');
    return () => {};
  }, [searchDoc.length && searchDoc.length === 1]);

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
  gap: {
    height: 4,
    backgroundColor: '#D9E7F0',
    marginVertical: 16,
  },
});
