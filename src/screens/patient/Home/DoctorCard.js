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
} from 'react-native';
import {images, colors, routes, fonts} from '../../../config';
import InputField from '../../../components/InputField';
import {Button, GradientButton} from '../../../components/Button';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import {useLocale} from '../../../hooks';
import StarRating from 'react-native-star-rating';

export default function DoctorCard({navigation, cardStyle, fav}) {
  const {translations} = useLocale();
  const [starCount, setStarCount] = useState(4);
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
    <View style={[styles.card, cardStyle]}>
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
        <Text style={{fontSize: 11, fontFamily: fonts.regular}}>General</Text>
        <Text style={{fontSize: 11, fontFamily: fonts.regular}}>Physician</Text>
      </View>
      <View style={{marginLeft: 5}}>
        <Text style={{fontSize: 14, fontFamily: fonts.bold}}>
          Dr. Aticul Islam
        </Text>
        <Text style={styles.textStyle}>MBBS,BCS</Text>
        <Text style={{fontSize: 12, fontFamily: fonts.regular}}>
          Training/Courses: PGT(internal medicine)
        </Text>
        <View
          style={{
            flexDirection: 'row',
            marginVertical: 5,
            alignItems: 'center',
            flex: 1,
          }}>
          <View style={{flex: 1}}>
            <Text style={styles.textStyle}>8 Years</Text>
            <Text style={[styles.labelStyle]}>Expericence</Text>
          </View>
          <View
            style={{
              backgroundColor: '#C2C2C2',
              width: 1,
              height: 30,
              marginLeft: 20,
            }}></View>
          <View style={{flex: 1, marginHorizontal: 10}}>
            <StarRating
              disabled={true}
              fullStarColor={'#5B5B5B'}
              containerStyle={{
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}
              starSize={15}
              buttonStyle={{paddingRight: 2}}
              maxStars={5}
              rating={starCount}
            />
            <Text style={[styles.labelStyle]}>Rating</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginVertical: 5,
            alignItems: 'center',
            flex: 1,
          }}>
          <View style={{flex: 1}}>
            <Text
              numberOfLines={1}
              style={{fontSize: 12, fontFamily: fonts.regular}}>
              My health app
            </Text>
            <Text style={[styles.labelStyle]}>Working</Text>
          </View>
          <View
            style={{
              backgroundColor: '#C2C2C2',
              width: 1,
              height: 30,
            }}></View>
          <View style={{flex: 1, marginHorizontal: 10}}>
            <Text style={styles.textStyle}>BDT 500.00</Text>
            <Text style={[styles.labelStyle]}>Online Fees</Text>
          </View>
        </View>
      </View>
      {fav && (
        <TouchableOpacity
          onPress={() => {}}
          style={{alignItems: 'flex-end', flex: 1}}>
          <MIcon name={'favorite'} size={25} color={colors.TOMATO} />
        </TouchableOpacity>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    flexDirection: 'row',
    height: 171,
    flex: 1,
    backgroundColor: '#fff',
    marginVertical: 16,
    marginRight: 10,
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
  textStyle: {
    fontSize: 14,
    fontFamily: fonts.regular,
  },
  labelStyle: {
    fontSize: 12,
    fontFamily: fonts.regular,
    color: '#222222',
  },
});
