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
import PatientWrapper from '../wrapper';
import {images, colors, routes, fonts} from '../../../config';
import InputField from '../../../components/InputField';
import {Button, GradientButton} from '../../../components/Button';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
const win = Dimensions.get('window');
import {useLocale} from '../../../hooks';
import StarRating from 'react-native-star-rating';

export default function PopularDoctorsList({navigation}) {
  const {translations} = useLocale();
  const [bInit, setBInit] = useState(false);
  const [starCount, setStarCount] = useState(4);
  const popularDoctors = ['a', 'b'];
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
    <View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          marginHorizontal: 16,
        }}>
        <View>
          <Text
            style={{
              fontFamily: fonts.semiBold,
              fontSize: 16,
              color: '#474747',
            }}>
            Popular Doctors
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'flex-end',
          }}>
          <Image
            style={{width: 20, height: 20}}
            resizeMode="contain"
            source={images.filter1}
          />
        </View>
        <View
          style={{
            alignItems: 'flex-start',
            marginRight: 10,
            marginHorizontal: 10,
          }}>
          <Image
            style={{width: 20, height: 20}}
            resizeMode="contain"
            source={images.filter2}
          />
        </View>
      </View>
      {/* doctor card */}
      <View style={{marginHorizontal: 16}}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          extraData={popularDoctors}
          data={popularDoctors}
          renderItem={({item}) => {
            return (
              <View style={styles.card}>
                <View style={{alignItems: 'center', marginRight: 16}}>
                  <Image
                    style={{
                      width: 44,
                      height: 44,
                      justifyContent: 'flex-start',
                      marginHorizontal: 5,
                    }}
                    resizeMode="contain"
                    source={images.profile_demo}
                  />
                  <Text style={{fontSize: 11, fontFamily: fonts.regular}}>
                    General
                  </Text>
                  <Text style={{fontSize: 11, fontFamily: fonts.regular}}>
                    Physician
                  </Text>
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
                        marginLeft: 20,
                      }}></View>
                    <View style={{flex: 1, marginHorizontal: 10}}>
                      <Text style={styles.textStyle}>BDT 500.00</Text>
                      <Text style={[styles.labelStyle]}>Online Fees</Text>
                    </View>
                  </View>
                </View>
              </View>
            );
          }}
        />
      </View>

      <TouchableOpacity style={{marginHorizontal: 16}} onPress={() => {}}>
        <Text style={[styles.textStyle, {color: '#484848', fontSize: 16}]}>
          See all doctors
        </Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  card: {
    flexDirection: 'row',
    height: 171,
    width: 330,
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
