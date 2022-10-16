/*
 * @copyRight by iHealthScreen
 */
import React, {useEffect, useState} from 'react';
import _ from 'lodash';
import {ActivityIndicator, View, Text, Image, StyleSheet} from 'react-native';
import {images, colors, routes, fonts} from '../../../config';
import {Button, GradientButton} from '../../../components/Button';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useLocale} from '../../../hooks';

export default function PatientPackage({navigation}) {
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
  return (
    <View style={styles.container}>
      <View style={{flex: 1, alignItems: 'center', marginTop: 16}}>
        <View style={styles.circleView}>
          <Text style={styles.circleViewtxt}>3</Text>
        </View>
        <View style={{marginVertical: 8}}>
          <Text style={styles.txtStyle}>Reamaining consultancy</Text>
        </View>
        <View>
          <Text style={styles.txtStyle}>Details</Text>
        </View>
      </View>
      <View style={{flex: 1}}>
        <View style={styles.row}>
          <View style={{alignItems: 'flex-start'}}>
            <Text style={[styles.txtStyle, {fontSize: 14}]}>Reamaining</Text>
          </View>
          <View style={styles.rightView}>
            <Text style={[styles.txtStyle, {fontSize: 14}]}>28 Days</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View>
            <Text style={[styles.txtStyle, {fontSize: 14}]}>Expire Date</Text>
          </View>
          <View style={styles.rightView}>
            <Text style={[styles.txtStyle, {fontSize: 14}]}>20 Nov 2022</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View>
            <Text style={[styles.txtStyle, {fontSize: 14}]}>Speciality</Text>
          </View>
          <View style={styles.rightView}>
            <Text style={[styles.txtStyle, {fontSize: 14}]}>Gynochologist</Text>
          </View>
        </View>
        {/* Button */}
        <GradientButton
          onPress={() => {}}
          cl1={colors.PRIMARY}
          cl2={colors.SECONDARY}
          style={{
            height: 48,
            marginTop: 16,
          }}
          titleStyle={{
            fontSize: 14,
            color: colors.WHITE,
          }}
          text={'Purchase a pack'}
          rightIcon={<Icon name={'arrow-right'} size={16} color={'#fff'} />}
          rightIconStyle={{
            flex: 1,
            alignItems: 'flex-end',
            marginRight: 10,
            justifyContent: 'center',
          }}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 16,
  },
  circleView: {
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: '#00CACE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleViewtxt: {color: '#fff', fontFamily: fonts.bold, fontSize: 20},
  txtStyle: {fontFamily: fonts.regular, fontSize: 12},
  row: {
    flexDirection: 'row',
    marginVertical: 2,
  },
  rightView: {flex: 1, alignItems: 'flex-end'},
});
