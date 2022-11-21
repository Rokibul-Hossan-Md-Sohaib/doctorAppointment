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
} from 'react-native';
import {images, colors, routes, fonts} from '../../../config';
import {Button, GradientButton} from '../../../components/Button';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ProfileView from '../Profile/ProfileView';
import {AppModal} from '../../../components/Modal';
/*
 */
export default function UpdatePatient({
  navigation,
  modalShow,
  setModalShow,
  route,
  item,
}) {
  //
  useEffect(() => {
    return () => {};
  }, []);
  //
  const onSubmit = () => {
    try {
    } catch (err) {}
  };
  //onSubmit
  return (
    <AppModal
      closeModal={() => setModalShow(false)}
      navigation={navigation}
      hideClose={false}
      style={{backgroundColor: '#EFF4FA'}}>
      <View style={{flex: 1, marginVertical: 16}}>
        <KeyboardAwareScrollView style={{flex: 1}}>
          <ProfileView navigation={navigation} item={item} />
        </KeyboardAwareScrollView>
        {/* Update/Add Button */}
        <GradientButton
          onPress={() => {}}
          cl1={colors.PRIMARY}
          cl2={colors.SECONDARY}
          style={{
            height: 48,
            marginTop: 16,
            right: 20,
            left: 20,
            position: 'absolute',
            bottom: 30,
          }}
          titleStyle={{
            fontSize: 20,
            color: colors.WHITE,
          }}
          text="Update"
        />
      </View>
    </AppModal>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
