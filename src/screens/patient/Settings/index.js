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
        {/**/}
        <TouchableOpacity style={styles.subHdr} onPress={() => {}}>
          <View style={{flex: 1}}>
            <Text style={styles.subHdrText}>{translations.edit_profile}</Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            {Icon(images.user)}
          </View>
        </TouchableOpacity>
        <View style={styles.gap}></View>
        <TouchableOpacity style={styles.subHdr} onPress={() => {}}>
          <View style={{flex: 1}}>
            <Text style={styles.subHdrText}>{translations.change_pass}</Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            {Icon(images.settings)}
          </View>
        </TouchableOpacity>
        <View style={styles.gap}></View>
        <TouchableOpacity style={styles.subHdr} onPress={() => {}}>
          <View style={{flex: 1}}>
            <Text style={styles.subHdrText}>{translations.manage_patient}</Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            {Icon(images.users)}
          </View>
        </TouchableOpacity>
        <View style={styles.gap}></View>
        <TouchableOpacity style={styles.subHdr} onPress={() => {}}>
          <View style={{flex: 1}}>
            <Text style={styles.subHdrText}>{translations.fav_doc}</Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            {Icon(images.love)}
          </View>
        </TouchableOpacity>
        <View style={styles.gap}></View>
        {/* Payment */}
        <View style={{marginVertical: 8}}>
          <Text style={styles.hdrText}>{translations.payments}</Text>
        </View>
        <TouchableOpacity style={styles.subHdr} onPress={() => {}}>
          <View style={{flex: 1}}>
            <Text style={styles.subHdrText}>{translations.pay_his}</Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            {Icon(images.history1)}
          </View>
        </TouchableOpacity>
        <View style={styles.gap}></View>
        <TouchableOpacity style={styles.subHdr} onPress={() => {}}>
          <View style={{flex: 1}}>
            <Text style={styles.subHdrText}>{translations.pay_policy}</Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            {Icon(images.dollar)}
          </View>
        </TouchableOpacity>
        <View style={styles.gap}></View>

        {/* Legal */}
        <View style={{marginVertical: 8}}>
          <Text style={styles.hdrText}>{translations.legal}</Text>
        </View>
        <TouchableOpacity style={styles.subHdr} onPress={() => {}}>
          <View style={{flex: 1}}>
            <Text style={styles.subHdrText}>{translations.t_c}</Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            {Icon(images.terms)}
          </View>
        </TouchableOpacity>
        <View style={styles.gap}></View>
        <TouchableOpacity style={styles.subHdr} onPress={() => {}}>
          <View style={{flex: 1}}>
            <Text style={styles.subHdrText}>{translations.pp}</Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            {Icon(images.terms)}

            <Image
              style={{width: 16, height: 16}}
              resizeMode="contain"
              source={images.policy}
            />
          </View>
        </TouchableOpacity>
        <View style={styles.gap}></View>
        <TouchableOpacity style={styles.subHdr} onPress={() => {}}>
          <View style={{flex: 1}}>
            <Text style={styles.subHdrText}>{translations.faq}</Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            <Image
              style={{width: 16, height: 16}}
              resizeMode="contain"
              source={images.faq}
            />
          </View>
        </TouchableOpacity>
        <View style={styles.gap}></View>
        <TouchableOpacity style={styles.subHdr} onPress={() => {}}>
          <View style={{flex: 1}}>
            <Text style={styles.subHdrText}>{translations.aboutus}</Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            <Image
              style={{width: 16, height: 16}}
              resizeMode="contain"
              source={images.info}
            />
          </View>
        </TouchableOpacity>
        <View style={styles.gap}></View>
        <TouchableOpacity style={styles.subHdr} onPress={() => {}}>
          <View style={{flex: 1}}>
            <Text style={styles.subHdrText}>{translations.logout}</Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            <Image
              style={{width: 16, height: 16}}
              resizeMode="contain"
              source={images.logout}
            />
          </View>
        </TouchableOpacity>
        <View style={styles.gap}></View>
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
