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
  FlatList,
} from 'react-native';
import PatientWrapper from '../wrapper';
import {images, colors, routes, fonts} from '../../../config';
import {
  RegularText,
  SemiboldText,
  BoldText,
  GradientText,
} from '../../../components/Text';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {GradientButton} from '../../../components/Button';
import {Calendar} from '../../../modules';
import {useLocale} from '../../../hooks';
import {showDate} from '../../../utils';
//
export default function Department({navigation}) {
  const {translations} = useLocale();
  const [bInit, setBInit] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
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
    <View style={{}}>
      <BoldText style={{fontSize: 16, color: '#282828'}} title={'Department'} />
      <FlatList
        style={{marginLeft: 0}}
        horizontal
        showsHorizontalScrollIndicator={false}
        extraData={[1, 2, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4]}
        data={[1, 2, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4]}
        renderItem={({item}) => {
          return <CategoryCard navigation={navigation} />;
        }}
      />
    </View>
  );
}
//
//CategoryCard
function CategoryCard({navigation}) {
  const {translations} = useLocale();

  return (
    <View style={styles.card}>
      <View style={{flex: 1, alignItems: 'flex-start'}}>
        <Image
          style={{width: 20, height: 20}}
          resizeMode="contain"
          source={images.heart}
        />
      </View>
      <View style={{flex: 1, alignItems: 'center'}}>
        <Text
          style={{
            color: '#404446',
            fontSize: 14,
            fontFamily: fonts.bold,
          }}>
          Cardiologists
        </Text>
      </View>
    </View>
  );
}
//
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
    height: 40,
    flex: 1,
    backgroundColor: '#fff',
    marginHorizontal: 8,
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
  row: {
    flexDirection: 'row',
    marginVertical: 8,
  },
});
