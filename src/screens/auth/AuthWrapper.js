/*
 * @copyRight by iHealthScreen
 */
import React, {useEffect, useState} from 'react';
import {colors, routes} from '../../config';
import {SafeAreaView, Text, ImageBackground, StyleSheet} from 'react-native';
import {images} from '../../config';

export default function AuthWrapper({children}) {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground
        style={{flex: 1}}
        resizeMode="cover"
        source={images.auth_background}>
        {children}
      </ImageBackground>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 25,
    padding: 15,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  contentCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    color: 'white',
    padding: 10,
  },
});
