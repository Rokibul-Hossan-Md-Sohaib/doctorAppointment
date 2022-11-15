/*
 * @copyRight by iHealthScreen
 */
import React, {Children, useEffect, useState} from 'react';
import _ from 'lodash';
import {
  TouchableOpacity,
  Modal,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import {colors} from '../config';
import MIcon from 'react-native-vector-icons/MaterialIcons';
/*
 */
const AppModal = ({children, navigation, closeModal, hideClose, style}) => {
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
}; //AppModal
/*
 */
const AlertModal = ({children, hideModal, style}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      onRequestClose={() => {
        hideModal();
      }}>
      <TouchableWithoutFeedback onPress={() => hideModal()}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <View style={[styles.endView, style.position]}>
            <View style={styles.modalView}>{children}</View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}; //AlertModal
/*
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  endView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    height: 200,
    width: '90%',
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
export {AppModal, AlertModal};
