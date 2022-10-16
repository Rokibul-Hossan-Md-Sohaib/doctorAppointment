import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {colors, fonts} from '../config';

//RegularText
const RegularText = props => {
  return <Text style={[styles.txtStyle, props.style]}>{props.title}</Text>;
};
//RegularText
const SemiboldText = props => {
  return <Text style={[styles.txtStyle, props.style]}>{props.title}</Text>;
};
//RegularText
const BoldText = props => {
  return <Text style={[styles.txtStyle, props.style]}>{props.title}</Text>;
};
const styles = StyleSheet.create({
  txtStyleRegular: {
    fontFamily: fonts.regular,
  },
  txtStyleSemibold: {
    fontFamily: fonts.regular,
  },
  txtStyleBold: {
    fontFamily: fonts.regular,
  },
});

export {RegularText, SemiboldText, BoldText};
