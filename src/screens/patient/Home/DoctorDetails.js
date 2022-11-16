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
import {AppModal} from '../../../components/Modal';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import {useLocale} from '../../../hooks';
import StarRating from 'react-native-star-rating';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import PatientWrapper from '../wrapper';
import DoctorCard from './DoctorCard';
import {RegularText, SemiboldText, BoldText} from '../../../components/Text';

const option = [
  {label: 'Appointment', key: 1},
  {label: 'Expericences', key: 2},
  {label: 'Reviews', key: 3},
];
export default function DoctorDetails({navigation, closeModal}) {
  const {translations} = useLocale();
  const [starCount, setStarCount] = useState(4);
  const [selectedTab, setSelectedTab] = useState(1);
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
    <PatientWrapper
      hdr={true}
      hdrText={'Doctor Profile'}
      back={true}
      navigation={navigation}>
      <KeyboardAwareScrollView style={{flex: 1}}>
        <DoctorCard cardStyle={styles.card} fromDetails={true} />
        <View style={{marginHorizontal: 16, flex: 1, flexDirection: 'row'}}>
          {option.map(item => (
            <>
              <TouchableOpacity
                style={styles.tabBar}
                key={item.key}
                onPress={() => {
                  setSelectedTab(item.key);
                }}>
                <Text
                  style={
                    selectedTab === item.key ? styles.actText : styles.disText
                  }>
                  {item.label}
                </Text>
              </TouchableOpacity>
              {item.key !== 3 && <View style={styles.lineGap}></View>}
            </>
          ))}
        </View>
        <View style={{flex: 1, marginHorizontal: 16, marginVertical: 16}}>
          {selectedTab === 1 ? (
            <Appointment />
          ) : selectedTab === 2 ? (
            <Expericences />
          ) : selectedTab === 3 ? (
            <Reviews />
          ) : null}
        </View>
      </KeyboardAwareScrollView>
    </PatientWrapper>
  );
}
//
const Appointment = () => {
  return (
    <>
      {/* Online Slot */}
      <View style={{marginHorizontal: 20, marginVertical: 10}}>
        <BoldText
          style={{fontSize: 14, color: '#282828'}}
          title={'Get an Online Appointment'}
        />
      </View>
      <AppointmentCardView />
      {/* Physical Slot */}
      <View style={{marginHorizontal: 20, marginVertical: 10}}>
        <BoldText
          style={{fontSize: 14, color: '#282828'}}
          title={'Get a Physical Appointment'}
        />
      </View>
      <AppointmentCardView />
    </>
  );
};
//appointment card view
const AppointmentCardView = () => {
  return (
    <View style={[styles.smallCard, {flexDirection: 'row'}]}>
      <View style={{padding: 5, flex: 1, alignItems: 'flex-start'}}>
        <SemiboldText
          style={{fontSize: 12, color: '#282828'}}
          title={'MyHealth Online'}
        />
        <View style={{marginVertical: 20}}>
          <RegularText
            style={{fontSize: 12, color: '#282828'}}
            title={'Sat - Thus'}
          />
          <RegularText
            style={{fontSize: 12, color: '#282828'}}
            title={'4.00 PM to 11 PM'}
          />
        </View>
      </View>
      <View style={{padding: 5, flex: 1, alignItems: 'flex-end'}}>
        <SemiboldText
          style={{fontSize: 12, color: '#282828'}}
          title={'BDT 150.00'}
        />
        <RegularText
          style={{fontSize: 11, color: '#282828'}}
          title={'Follow up fee BDT 150.00'}
        />
        <View style={{marginVertical: 10}}>
          <GradientButton
            onPress={() => {}}
            cl1={colors.PRIMARY}
            cl2={colors.SECONDARY}
            style={{
              height: 25,
              width: 170,
            }}
            titleStyle={{
              fontSize: 12,
              color: colors.WHITE,
            }}
            text={'Get an online appointment'}
            rightIcon={
              <MIcon name={'arrow-forward-ios'} size={14} color={'#fff'} />
            }
            rightIconStyle={{
              alignItems: 'flex-end',
            }}
          />
        </View>
      </View>
    </View>
  );
};
//
const Expericences = () => {
  return (
    <View>
      <ExpericenceCardView />
    </View>
  );
};
//appointment card view
const ExpericenceCardView = () => {
  return (
    <View style={[styles.smallCard, {height: 100}]}>
      <View style={{paddingLeft: 5}}>
        <BoldText
          style={{fontSize: 12, color: '#282828'}}
          title={'Islami Bank Hospital'}
        />
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{padding: 5, flex: 1, alignItems: 'flex-start'}}>
          <View style={{marginVertical: 2}}>
            <RegularText
              style={{fontSize: 12, color: '#787878'}}
              title={'Designation'}
            />
            <RegularText
              style={{fontSize: 12, color: '#282828'}}
              title={'Assistant doctor'}
            />
          </View>
          <View style={{marginVertical: 2}}>
            <RegularText
              style={{fontSize: 12, color: '#787878'}}
              title={'Time period '}
            />
            <RegularText
              style={{fontSize: 12, color: '#282828'}}
              title={'4.00 PM to 11 PM'}
            />
          </View>
        </View>
        <View style={{padding: 5, flex: 1}}>
          <View style={{marginVertical: 2}}>
            <RegularText
              style={{
                fontSize: 12,
                color: '#787878',
                textAlign: 'left',
              }}
              title={'Department'}
            />
            <RegularText
              style={{
                fontSize: 12,
                color: '#282828',
              }}
              title={'Head Surgery'}
            />
          </View>
          <View style={{marginVertical: 2}}>
            <RegularText
              style={{
                fontSize: 12,
                color: '#787878',
                textAlign: 'left',
              }}
              title={'Period'}
            />
            <RegularText
              style={{
                fontSize: 12,
                color: '#282828',
              }}
              title={'3 years 8 months'}
            />
          </View>
        </View>
      </View>
    </View>
  );
};
//
const Reviews = () => {
  return (
    <>
      <ReviewCardView />
    </>
  );
};
//Review card view
const ReviewCardView = () => {
  return (
    <View style={{flex: 1, marginHorizontal: 12}}>
      <View style={{flexDirection: 'row'}}>
        <View>
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
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <BoldText
            style={{
              fontSize: 12,
            }}
            title={'Eleanor Pena'}
          />
          <StarRating
            disabled={true}
            fullStarColor={'#FFB700'}
            starSize={13}
            buttonStyle={{paddingRight: 2}}
            maxStars={5}
            rating={4}
          />
        </View>
      </View>
      <View
        style={{
          marginHorizontal: 5,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <RegularText
          style={{
            fontSize: 12,
            color: '#686868',
            textAlign: 'justify',
          }}
          adjustsFontSizeToFit={true}
          title={
            "You got your heavy coat out yet? It's getting colder. Only God can make a tree - but you can paint one. I will take some magic white, and a little bit of Vandyke brown and a little touch of yellow. That's why I paint - because I can create the kind of world I want - and I can make this world as happy as I want it."
          }
        />
      </View>
    </View>
  );
};
//
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    flexDirection: 'row',
    height: 110,
    marginVertical: 16,
    marginHorizontal: 16,
    backgroundColor: '#EFF4FA',
    marginRight: 0,
    borderRadius: 0,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
    padding: 8,
    justifyContent: 'center',
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
  tabBar: {
    flex: 1,
    alignItems: 'center',
  },
  lineGap: {
    backgroundColor: '#C2C2C2',
    width: 1,
    height: 20,
  },
  disText: {
    color: '#A1A1A1',
    fontFamily: fonts.semiBold,
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  actText: {
    color: colors.PRIMARY,
    fontFamily: fonts.semiBold,
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  smallCard: {
    height: 90,
    flex: 1,
    backgroundColor: '#fff',
    marginHorizontal: 16,
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
});
