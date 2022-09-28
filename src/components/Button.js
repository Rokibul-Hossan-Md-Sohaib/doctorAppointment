import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {colors, fonts} from '../config';
import LinearGradient from 'react-native-linear-gradient';

//normal TouchableOpacity
const Button = ({
  title,
  disabled,
  titleColor,
  titleStyle,
  active,
  icon,
  rightIcon,
  rightIconStyle,
  leftIcon,
  leftIconStyle,
  style,
  ...rest
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[styles.container, style]}
      {...rest}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {leftIcon && (
          <Image style={[styles.rightIcon, leftIconStyle]} source={leftIcon} />
        )}
        <Text
          style={{
            ...styles.title,
            ...{color: titleColor !== undefined ? titleColor : '#ffffff'},
            ...titleStyle,
          }}>
          {title}
        </Text>
        {rightIcon && (
          <Image
            style={[styles.rightIcon, rightIconStyle]}
            source={rightIcon}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};
//Gradient TouchableOpacity
const GradientButton = props => {
  return (
    <TouchableOpacity
      disabled={props?.disabled}
      style={[
        {
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.35,
          shadowRadius: 3.84,
          elevation: 5,
        },
        props.style,
      ]}
      onPress={() => props.onPress()}>
      <LinearGradient
        locations={[0.5, 1]}
        colors={
          props?.disabled
            ? [colors.GRAY, colors.LIGHT_GRAY]
            : [props.cl1, props.cl2]
        }
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          borderRadius: 8,
          borderStyle: 'solid',
        }}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 1}}>
        <Text style={props?.titleStyle}>{props.text}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    height: 48,
    marginHorizontal: 20,
  },
  title: {
    fontFamily: fonts.bold,
    flex: 1, //new
    fontSize: 16,
    letterSpacing: 0.41,
    textAlign: 'center',
    color: '#ffffff',
  },
  icon: {
    width: 24,
    height: 24,
    marginLeft: 12,
    marginRight: 10,
  },
  rightIcon: {
    marginHorizontal: 4,
    width: 16,
    height: 16,
    marginRight: 16,
  },
});

export {Button, GradientButton};
