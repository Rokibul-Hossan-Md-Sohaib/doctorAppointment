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
  Modal,
} from 'react-native';
import {images, colors, routes, fonts} from '../../../config';
import {Button, GradientButton} from '../../../components/Button';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ProfileView from '../Profile/ProfileView';

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
  //onSubmit
  const onSubmit = () => {
    try {
    } catch (err) {}
  };
  //
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={true}
      onRequestClose={() => {
        // Alert.alert('Modal has been closed.');
      }}>
      <TouchableOpacity
        style={{
          padding: 15,
          paddingTop: 40,
        }}
        onPress={() => {
          setModalShow(false);
        }}>
        <Icon
          name="times-circle"
          type="font-awesome-5"
          color={colors.TOMATO}
          size={25}
          containerStyle={{alignSelf: 'flex-end'}}
        />
      </TouchableOpacity>
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
    </Modal>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
