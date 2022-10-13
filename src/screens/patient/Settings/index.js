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
import {useLocale} from '../../../hooks';
export default function PatientSettings({navigation}) {
  const {translations} = useLocale();
  const [searchDoc, setSearchDoc] = useState('');
  //
  useEffect(() => {
    return () => {};
  }, []);
  //
  //
  const Icon = src => {
    return (
      <Image
        style={{width: 16, height: 16}}
        resizeMode="contain"
        source={src}
      />
    );
  };
  return (
    <PatientWrapper hdr={true} hdrText={'More'}>
      <KeyboardAwareScrollView style={styles.container}>
        {/* Profile */}
        <View style={{marginVertical: 8}}>
          <Text style={styles.hdrText}>{translations.profile}</Text>
        </View>
        {/**/}
        <Items title={translations.edit_profile} img={images.user} />
        <Items title={translations.change_pass} img={images.settings} />
        <Items title={translations.manage_patient} img={images.users} />
        <Items title={translations.fav_doc} img={images.love} />
        {/* Payment */}
        <View style={{marginVertical: 8}}>
          <Text style={styles.hdrText}>{translations.payments}</Text>
        </View>
        <Items title={translations.pay_his} img={images.history1} />
        <Items title={translations.pay_policy} img={images.dollar} />
        {/* Legal */}
        <View style={{marginVertical: 8}}>
          <Text style={styles.hdrText}>{translations.legal}</Text>
        </View>
        <Items title={translations.t_c} img={images.terms} />
        <Items title={translations.pp} img={images.policy} />
        <Items title={translations.faq} img={images.faq} />
        <Items title={translations.aboutus} img={images.info} />
        <Items title={translations.logout} img={images.logout} />
      </KeyboardAwareScrollView>
    </PatientWrapper>
  );
}
function Items({title, img}) {
  //
  const Icon = src => {
    return (
      <Image
        style={{width: 16, height: 16}}
        resizeMode="contain"
        source={src}
      />
    );
  };
  //
  return (
    <View>
      <TouchableOpacity style={styles.subHdr} onPress={() => {}}>
        <View style={{flex: 1}}>
          <Text style={styles.subHdrText}>{title}</Text>
        </View>
        <View style={{flex: 1, alignItems: 'flex-end'}}>{Icon(img)}</View>
      </TouchableOpacity>
      <View style={styles.gap}></View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  hdrText: {
    fontFamily: fonts.bold,
    fontSize: 16,
  },
  subHdr: {
    flexDirection: 'row',
    height: 38,
    alignItems: 'center',
    marginLeft: 20,
    marginHorizontal: 16,
  },
  subHdrText: {
    fontFamily: fonts.regular,
    fontSize: 16,
  },
  gap: {
    height: 1,
    backgroundColor: '#D9E7F0',
    marginVertical: 8,
  },
});
