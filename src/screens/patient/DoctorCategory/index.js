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
export default function DoctorCategory({navigation}) {
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
      <PatientWrapper hdr={true} hdrText={'Specialist Category'}>
        <View style={{height: 80}}>
          <InputField
            placeholder={translations.search_category}
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
        <KeyboardAwareScrollView style={{flex: 1}}>
          <CategoryCard navigation={navigation} />
        </KeyboardAwareScrollView>
      </PatientWrapper>
    );
  }
}
//CategoryCard
function CategoryCard({navigation}) {
  const {translations} = useLocale();

  return (
    <View style={styles.card}>
      <View style={{flex: 1, alignItems: 'center'}}>
        <Image
          style={{width: 60, height: 60}}
          resizeMode="contain"
          source={images.heart}
        />
      </View>
      <View style={{flex: 1, alignItems: 'flex-start'}}>
        <Text
          style={{
            color: '#404446',
            fontSize: 16,
            fontFamily: fonts.bold,
          }}>
          Cardiologists
        </Text>
        <Text
          style={{
            color: '#404446',
            fontFamily: fonts.regular,
            fontSize: 12,
            marginTop: 5,
          }}>
          213 Doctors
        </Text>
      </View>
      <View style={{flex: 1, alignItems: 'flex-end', paddingRight: 40}}>
        <Icon name={'chevron-right'} size={18} color={colors.GRAY} />
      </View>
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
    height: 100,
    flex: 1,
    backgroundColor: '#fff',
    marginHorizontal: 20,
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
    alignItems: 'center',
  },
});
