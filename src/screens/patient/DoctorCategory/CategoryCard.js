/*
 * @copyRight by iHealthScreen
 */
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import NavigationService from '../../../services/NavigationService';
import _ from 'lodash';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {images, colors, routes, fonts} from '../../../config';
import {useLocale} from '../../../hooks';
import Icon from 'react-native-vector-icons/FontAwesome5';

//CategoryCard
export default function CategoryCard({navigation, item, index}) {
  const {translations} = useLocale();
  return (
    <TouchableOpacity style={styles.card} onPress={() => {}}>
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
            fontSize: 14,
            fontFamily: fonts.bold,
          }}>
          {item.name}
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
      <View style={{flex: 1, alignItems: 'flex-end', paddingRight: 10}}>
        <Icon name={'chevron-right'} size={18} color={colors.GRAY} />
      </View>
    </TouchableOpacity>
  );
}
//
const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    height: 100,
    flex: 1,
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginVertical: 8,
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
