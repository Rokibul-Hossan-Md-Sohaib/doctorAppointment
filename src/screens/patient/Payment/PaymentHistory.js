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
import {useLocale} from '../../../hooks';
//
export default function PatientPaymentHistory({navigation}) {
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
        hdrText={'Payment History'}
        back={true}
        navigation={navigation}>
        <KeyboardAwareScrollView style={{flex: 1}}>
          <HistoryCard navigation={navigation} />
        </KeyboardAwareScrollView>
      </PatientWrapper>
    );
  }
}
//HistoryCard
function HistoryCard({navigation}) {
  const {translations} = useLocale();

  return (
    <View
      style={{
        flexDirection: 'row',
        marginHorizontal: 8,
      }}>
      <View>
        <View style={{alignItems: 'center', marginRight: 16}}>
          <Image
            style={{
              width: 44,
              height: 44,
              marginVertical: 8,
              justifyContent: 'flex-start',
              marginHorizontal: 5,
            }}
            resizeMode="contain"
            source={images.profile_demo}
          />
          <View>
            <RegularText
              style={{fontSize: 12, color: '#282828'}}
              adjustsFontSizeToFit={true}
              title={'20 Sept, 2022'}
            />
          </View>
        </View>
      </View>

      <View style={{flex: 1, marginTop: 10}}>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <RegularText
              style={{fontSize: 12, color: '#282828'}}
              adjustsFontSizeToFit={true}
              title={'Appointment fee paid to'}
            />
          </View>
          <View style={{flex: 1}}>
            <BoldText
              style={{fontSize: 12, color: '#282828'}}
              adjustsFontSizeToFit={true}
              title={'Dr. Rahmat Uddin Khan'}
            />
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <RegularText
              style={{fontSize: 12, color: '#282828'}}
              adjustsFontSizeToFit={true}
              title={'Payment Method: '}
            />
          </View>
          <View style={{flex: 1}}>
            <BoldText
              style={{fontSize: 12, color: '#282828'}}
              adjustsFontSizeToFit={true}
              title={'Cash'}
            />
          </View>
        </View>
        <View style={{flex: 1, alignItems: 'flex-end'}}>
          <BoldText
            style={{fontSize: 12, color: '#282828'}}
            adjustsFontSizeToFit={true}
            title={'BDT 550'}
          />
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  circleView: {
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});