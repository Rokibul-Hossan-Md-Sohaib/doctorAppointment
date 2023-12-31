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
import SpecialitiesService from '../../../services/SpecialitiesService';
import CategoryCard from './CategoryCard';

//
export default function DoctorCategory({navigation}) {
  const {translations} = useLocale();
  const [bInit, setBInit] = useState(false);
  const [allSpecialities, setAllSpecialities] = useState([]);
  const [searchDoc, setSearchDoc] = useState('');
  //
  useEffect(() => {
    getSpecialities().catch();
    return () => {};
  }, []);
  //onSubmit
  const getSpecialities = async () => {
    try {
      const resp = await SpecialitiesService.getAllSpecialities();
      console.log('resp:::', resp);
      if (resp?.status === 200) {
        setAllSpecialities(resp?.data);
      }
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
          <FlatList
            showsVerticalScrollIndicator={false}
            extraData={allSpecialities}
            data={allSpecialities}
            renderItem={({item, index}) => {
              return (
                <CategoryCard
                  navigation={navigation}
                  item={item}
                  index={index}
                />
              );
            }}
          />
        </KeyboardAwareScrollView>
      </PatientWrapper>
    );
  }
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
});
