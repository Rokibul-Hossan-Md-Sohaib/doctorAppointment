/*
 * @copyRight by iHealthScreen
 */
import React, {Children, useEffect, useState} from 'react';
import _ from 'lodash';
import {TouchableOpacity, Modal} from 'react-native';
import {colors} from '../config';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default function AppModal({children, navigation, closeModal}) {
  //
  useEffect(() => {
    return () => {};
  }, []);
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
          alignItems: 'flex-end',
        }}
        onPress={() => {
          closeModal();
        }}>
        <MIcon
          name="close"
          color={colors.GRAY}
          size={25}
          containerStyle={{alignSelf: 'flex-end'}}
        />
      </TouchableOpacity>
      <KeyboardAwareScrollView style={{flex: 1}}>
        {children}
      </KeyboardAwareScrollView>
    </Modal>
  );
}
