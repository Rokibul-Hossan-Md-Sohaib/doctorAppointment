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
export default function PatientHistory({navigation}) {
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
      <PatientWrapper hdr={true} hdrText={'History'}>
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
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View style={{marginLeft: 16}}>
          <View style={styles.circleView}>
            <SemiboldText style={{fontSize: 14}} title={'3'} />
          </View>
        </View>
        <View style={styles.card}>
          <View style={{flex: 3, marginHorizontal: 8}}>
            <View style={{marginVertical: 4}}>
              <RegularText
                style={{fontSize: 14, color: '#282828'}}
                title={'At 08.30 PM Sat , 14 September'}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View style={{flex: 1}}>
                <BoldText style={{fontSize: 16}} title={'Dr. Sadia Jahan'} />
              </View>
              <View style={{alignItems: 'flex-end'}}>
                <RegularText
                  style={{fontSize: 12, color: '#282828'}}
                  title={'General Physician'}
                />
              </View>
            </View>
          </View>
          <View style={{flex: 1, alignItems: 'flex-end', paddingRight: 10}}>
            <Icon name={'chevron-right'} size={18} color={'#D8D8D8'} />
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View style={{marginLeft: 16}}>
          <View style={styles.circleView}>
            <SemiboldText style={{fontSize: 14}} title={'3'} />
          </View>
        </View>
        <View style={styles.card}>
          <View style={{flex: 3, marginHorizontal: 8}}>
            <View style={{marginVertical: 4}}>
              <RegularText
                style={{fontSize: 14, color: '#282828'}}
                title={'At 08.30 PM Sat , 14 September'}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View style={{flex: 1}}>
                <BoldText style={{fontSize: 16}} title={'Dr. Sadia Jahan'} />
              </View>
              <View style={{alignItems: 'flex-end'}}>
                <RegularText
                  style={{fontSize: 12, color: '#282828'}}
                  title={'General Physician'}
                />
              </View>
            </View>
          </View>
          <View style={{flex: 1, alignItems: 'flex-end', paddingRight: 10}}>
            <Icon name={'chevron-right'} size={18} color={'#D8D8D8'} />
          </View>
        </View>
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
    height: 60,
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
    alignItems: 'center',
    justifyContent: 'center',
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
