import React from 'react';
import { StyleSheet } from 'react-native';
import { FormInput } from '../../../../components';
import { colors } from '../../../../config';

import { Icon } from 'react-native-elements';

const MessageBox = () => {
  return (
    <FormInput
      placeholder="Type message..."
      // containerStyle={{ flex: 1 }}
      rightIcon={
        <Icon name="paperclip" type={'font-awesome-5'} color={colors.CLOUDY_BLUE} size={25} />
      }
      labelStyle={styles.labelStyle}
      inputContainerStyle={styles.inputContainerStyle}
      secureTextEntry
    />
  );
};

export default MessageBox;

const styles = StyleSheet.create({
  labelStyle: {
    color: colors.LIGHT_BLUE_GREY,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
  inputContainerStyle: {
    backgroundColor: colors.WHITE,
    marginVertical: 5,
    borderRadius: 30,
    paddingRight: 20,
    borderColor: colors.LIGHT_BLUE_GREY,
  },
});
