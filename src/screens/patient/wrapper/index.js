/*
 * @copyRight by iHealthScreen
 */
import React, {useEffect, useState} from 'react';
import {colors, routes, fonts} from '../../../config';
import {
  SafeAreaView,
  Text,
  ImageBackground,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function PatientWrapper({
  children,
  hdr,
  hdrText,
  back,
  navigation,
}) {
  return (
    <SafeAreaView style={styles.container}>
      {hdr && (
        <View style={styles.header}>
          {back && (
            <TouchableOpacity
              style={{position: 'absolute', left: 0}}
              onPress={() => navigation?.goBack()}>
              <Icon name={'chevron-left'} size={24} color={'#404446'} />
            </TouchableOpacity>
          )}
          <Text style={styles.hdrText}>{hdrText}</Text>
        </View>
      )}
      {children}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFF4FA',
  },
  header: {
    height: 40,
    marginHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  hdrText: {
    fontSize: 20,
    fontFamily: fonts.semiBold,
  },
});
