import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {fonts, colors} from '../config';
import {useLocale} from '../hooks';
import InputField from './InputField';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Password = ({
  props,
  passwordRef,
  cnfPasswordRef,
  password,
  confPassword,
  setPassword,
  setConfPassword,
}) => {
  const {translations} = useLocale();
  const [pShow, setPshow] = useState(false);
  //
  const rightIcon = () => {
    return (
      <TouchableOpacity
        style={{position: 'absolute', right: 15, marginTop: 14}}
        onPress={() => setPshow(!pShow)}>
        <Icon
          name={pShow ? 'eye' : 'eye-slash'}
          size={22}
          color={colors.GRAY}
        />
      </TouchableOpacity>
    );
  };
  //
  const rightIconCnfPass = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          ShowAlert({
            title: 'info!',
            msg: 'Passwords do NOT match',
            OnOK: () => {},
          });
        }}
        style={{position: 'absolute', right: 15, marginTop: 14}}>
        <Icon
          name={
            password.length && password === confPassword
              ? 'check-circle'
              : confPassword.length && confPassword.length
              ? 'info-circle'
              : null
          }
          size={22}
          color={password === confPassword ? colors.SUCCESS : colors.INFO}
        />
      </TouchableOpacity>
    );
  };
  return (
    <View>
      <InputField
        ref={passwordRef}
        value={password}
        placeholder={translations.auth.pass}
        errorStyle={{color: 'red'}}
        errorMessage=""
        onChangeText={text => {
          setPassword(text);
        }}
        onSubmitEditing={() => cnfPasswordRef.current.focus()}
        style={styles.inputFieldStyle}
        secureTextEntry={pShow ? false : true}
        containerStyle={[styles.inputContainerStyle]}
        returnKeyType="done"
        rightIcon={rightIcon}
      />
      <InputField
        ref={cnfPasswordRef}
        value={confPassword}
        placeholder={translations.auth.cnfpass}
        errorStyle={{color: 'red'}}
        errorMessage=""
        onChangeText={text => {
          setConfPassword(text);
        }}
        style={styles.inputFieldStyle}
        secureTextEntry={pShow ? false : true}
        containerStyle={[styles.inputContainerStyle]}
        returnKeyType="done"
        rightIcon={rightIconCnfPass}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 48,
    marginHorizontal: 20,
    marginTop: 12,
    backgroundColor: colors.WHITE,
    borderStyle: 'solid',
    borderRadius: 8,
  },
  inputContainerStyle: {
    marginTop: 16,
    marginHorizontal: 8,
  },
  inputFieldStyle: {
    borderWidth: 1,
    borderColor: colors.LIGHT_GRAY,
    borderRadius: 8,
  },
});

export default Password;
