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
import {images, colors, routes, fonts} from '../../../config';
import InputField from '../../../components/InputField';
import {Button} from '../../../components/Button';
import {genderList} from '../../../utils';
import CustomImagePicker from '../../../components/ImagePicker';
export default function ProfileView({navigation, item}) {
  const [bInit, setBInit] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [age, setAge] = useState(item?.age || '');
  const [name, setName] = useState(item?.name || '');
  const [gender, setGender] = useState(item?.gender || 'male');
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
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={{flex: 1, alignItems: 'center', marginTop: 60}}>
        <Image
          style={styles.imgStyle}
          resizeMode="contain"
          source={images.profile_demo}
        />
      </TouchableOpacity>
      <View style={{flex: 1, marginTop: 16}}>
        <InputField
          placeholder={'Name'}
          value={name}
          style={styles.inputFieldStyle}
          onChangeText={text => {
            setName(text);
          }}
          containerStyle={[styles.inputContainerStyle]}
          returnKeyType="next"
        />
        <InputField
          placeholder={'Age'}
          value={age}
          style={styles.inputFieldStyle}
          onChangeText={text => {
            setAge(text);
          }}
          keyboardType={'number-pad'}
          containerStyle={[styles.inputContainerStyle]}
          returnKeyType="next"
        />
        <View style={{flexDirection: 'row'}}>
          {genderList.map(item => (
            <Button
              onPress={() => {
                setGender(item.val);
              }}
              key={item.id}
              style={{
                flex: 1,
                marginTop: 16,
                height: 48,
                borderRadius: 8,
                borderWidth: 1,
                borderColor:
                  gender === item.val ? colors.PRIMARY : colors.LIGHT_GRAY,
                backgroundColor: '#fff',
              }}
              titleStyle={{
                fontSize: 20,
                color: '#0098DA',
                alignItems: 'flex-start',
                fontFamily: fonts.regular,
                textAlign: 'left',
              }}
              title={item.name}
              leftIconStyle={{
                width: 24,
                height: 24,
                marginHorizontal: 16,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              leftIcon={item.img}
            />
          ))}
        </View>
        <CustomImagePicker
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          img={images.profile_demo}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainerStyle: {
    marginTop: 16,
    marginHorizontal: 8,
  },
  inputFieldStyle: {
    borderWidth: 1,
    borderColor: colors.LIGHT_GRAY,
    borderRadius: 8,
  },
  imgStyle: {
    height: 200,
    width: 200,
    borderRadius: 100,
    backgroundColor: '#00CACE',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
