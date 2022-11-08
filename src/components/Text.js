import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {colors, fonts} from '../config';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-community/masked-view';
//RegularText
const RegularText = props => {
  return (
    <Text
      style={[styles.txtStyle, props.style]}
      adjustsFontSizeToFit={props.adjustsFontSizeToFit}
    >
      {props.title}
    </Text>
  );
};
//RegularText
const SemiboldText = props => {
  return (
    <Text style={[styles.txtStyleSemibold, props.style]} adjustsFontSizeToFit={props.adjustsFontSizeToFit}>{props.title}</Text>
  );
};
//RegularText
const BoldText = props => {
  return <Text style={[styles.txtStyleBold, props.style]} adjustsFontSizeToFit={props.adjustsFontSizeToFit}>{props.title}</Text>;
};
//Gradient Text
const GradientText = props => {
  return (
    <MaskedView maskElement={<Text {...props} />}>
      <LinearGradient
        colors={[props.cl1, props.cl2]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <Text {...props} style={[props.style, {opacity: 0}]} />
      </LinearGradient>
    </MaskedView>
  );
};
const styles = StyleSheet.create({
  txtStyleRegular: {
    fontFamily: fonts.regular,
  },
  txtStyleSemibold: {
    fontFamily: fonts.semiBold,
  },
  txtStyleBold: {
    fontFamily: fonts.bold,
  },
});

export {RegularText, SemiboldText, BoldText, GradientText};
