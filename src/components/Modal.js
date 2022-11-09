/*
 * @copyRight by iHealthScreen
 */
import React, {Children, useEffect, useState} from 'react';
import _ from 'lodash';
import {TouchableOpacity, Modal, View} from 'react-native';
import {colors} from '../config';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default function AppModal({
  children,
  navigation,
  closeModal,
  hideClose,
  style,
}) {
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
      {!hideClose && (
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
      )}

      <View style={{flex: 1, backgroundColor: style.backgroundColor}}>
        {children}
      </View>
    </Modal>
  );
}
