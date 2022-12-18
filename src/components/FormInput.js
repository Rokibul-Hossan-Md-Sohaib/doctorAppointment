import React from 'react';
import { StyleSheet } from 'react-native';
import { Input, Icon } from 'react-native-elements';
import { colors } from '../config';

export default (FormInput = props => {
  const {
    icon,
    refInput,
    iconColor,
    inputContainerStyle,
    containerStyle,
    labelStyle,
    onChange,
    onFocusPass,
    onBlurPass,
    ...otherProps
  } = props;
  return (
    <Input
      // ref={refInput}
      onFocus={() => (onFocusPass ? onFocusPass() : null)}
      // onBlur={onBlurPass ? onBlurPass() : null}
      containerStyle={{ paddingHorizontal: 0, ...containerStyle }}
      inputContainerStyle={{ ...styles.inputContainer, ...inputContainerStyle }}
      leftIcon={
        <Icon
          name={icon}
          type={'font-awesome-5'}
          color={iconColor ? iconColor : colors.LIGHT_BLUE_GREY}
          size={18}
        />
      }
      inputStyle={styles.inputStyle}
      autoFocus={false}
      autoCapitalize="none"
      keyboardAppearance="dark"
      errorStyle={styles.errorInputStyle}
      autoCorrect={false}
      blurOnSubmit={false}
      labelStyle={labelStyle}
      placeholderTextColor={colors.LIGHT_BLUE_GREY}
      onChangeText={text => onChange(text)}
      {...otherProps}
    />
  );
});

const styles = StyleSheet.create({
  inputContainer: {
    borderWidth: 1,
    borderColor: 'transparent',
    height: 55,
    borderRadius: 5,
    marginVertical: 6,
    backgroundColor: colors.PALE_GREY,
  },
  inputStyle: {
    marginLeft: 5,
    color: colors.CHARCOAL_GREY,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
  errorInputStyle: {
    marginTop: 0,
    textAlign: 'left',
    color: colors.TOMATO,
  },
});
