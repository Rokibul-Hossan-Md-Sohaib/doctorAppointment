/*
 * @copyRight by iHealthScreen
 */
import React, {useEffect, useState} from 'react';
import {colors, routes} from '../../config';
import {
  SafeAreaView,
  Text,
  ImageBackground,
  StyleSheet,
  View,
} from 'react-native';
import {images} from '../../config';

export default function AuthWrapper({children}) {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground
        style={{
          // flex: 1,
          height: '100%',
          width: '100%',
          position: 'absolute',
        }}
        opacity={0.4}
        resizeMode="cover"
        source={images.auth_background}></ImageBackground>
      {children}
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
