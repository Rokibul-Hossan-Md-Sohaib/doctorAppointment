import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {fonts, colors} from '../config';

export default React.forwardRef((props, ref) => {
  return (
    <View
      style={[
        styles.container,
        {flexDirection: props?.rightIcon ? 'row' : 'column'},
      ]}>
      <TextInput
        ref={ref}
        onSubmitEditing={props?.onSubmitEditing}
        returnKeyType={props?.returnKeyType}
        keyboardType={props?.keyboardType}
        secureTextEntry={props?.secureTextEntry}
        style={[
          styles.textInput,
          {
            flex: 1,
            textAlignVertical: props?.numberOfLines > 0 ? 'top' : 'center',
          },
          props.style,
        ]}
        placeholder={props?.placeholder}
        placeholderTextColor={'#72777A'}
        onChangeText={props?.onChangeText}
        value={props?.value}
        maxLength={props?.maxLength}
        numberOfLines={props?.numberOfLines}
        multiline={props?.numberOfLines > 0}
        editable={props?.editable}
      />
      {props?.rightIcon && props?.rightIcon()}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    height: 48,
    marginHorizontal: 20,
    marginTop: 12,
    backgroundColor: colors.WHITE,
    borderStyle: 'solid',
    borderRadius: 8,
  },
  title: {
    fontFamily: fonts.regular,
    marginHorizontal: 16,
    fontSize: 16,
    textAlign: 'left',
    color: '#000000',
  },
  placeholder: {
    fontSize: 13,
    fontWeight: '500',
    fontStyle: 'normal',
    marginTop: 8,
    letterSpacing: 0.21,
    color: '#3abfac',
  },
  textInput: {
    padding: 0,
    paddingLeft: 16,
    fontFamily: fonts.regular,
    fontSize: 16,
    letterSpacing: 0.26,
    color: '#373737',
    paddingTop: 12,
    paddingBottom: 12,
  },
});
