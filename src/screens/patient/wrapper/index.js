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
} from 'react-native';

export default function PatientWrapper({children, hdr, hdrText}) {
  return (
    <SafeAreaView style={styles.container}>
      {hdr && (
        <View style={styles.header}>
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
  },
  hdrText: {
    fontSize: 20,
    fontFamily: fonts.semiBold,
  },
});
