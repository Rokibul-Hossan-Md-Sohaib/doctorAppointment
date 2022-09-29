/*
 * @copyRight by iHealthScreen
 */
import React, {useEffect, useState} from 'react';
import {colors, routes} from '../../config';
import {SafeAreaView, Text, ImageBackground, StyleSheet} from 'react-native';
import {images} from '../../config';

export default function PatientWrapper({children}) {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
