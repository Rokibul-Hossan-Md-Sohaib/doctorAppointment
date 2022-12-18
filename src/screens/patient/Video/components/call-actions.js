import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {colors} from '../../../../config';
import IconButton from './iconButton';
import {IconWithRoundedBackground} from '../../../../components';

const CallActions = ({
  createOffer,
  createAnswer,
  callState,
  buttonState,
  navigation,
  buttonType,
  callerType,
  cancelButtonHandler,
}) => {
  const [callAnsButtonState, setCallAnsButtonState] = useState(true);

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
      }}>
      <TouchableOpacity onPress={() => cancelButtonHandler()}>
        <IconWithRoundedBackground
          iconName="phone-slash"
          size={30}
          iconColor={colors.WHITE}
          backGroundColor={colors.TOMATO}
        />
      </TouchableOpacity>

      {buttonState && (callState !== '' || callerType !== 'receiver') ? (
        <IconButton
          createOfferAnswer={callState === '' ? createOffer : createAnswer}
          iconName="phone-volume"
          iconColor={colors.WHITE}
          backGroundColor={colors.DARKISH_GREEN}
          navigation={navigation}
        />
      ) : null}
    </View>
  );
};

export default CallActions;
