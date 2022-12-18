import React from 'react';
import { TouchableOpacity } from 'react-native';
import { colors } from '../../../../config';
import { IconWithRoundedBackground } from '../../../../components';

import { useSelector } from 'react-redux';

const IconButton = ({ navigation, createOfferAnswer, buttonType, ...props }) => {
  const state = useSelector(state => state);

  // const doctorId =
  const userType = state.login.data.user.userType;
  let navigateTo;
  if (userType === 'DOCTOR') {
    navigateTo = 'Patient Appointment';
  } else {
    navigateTo = 'Doctor Appointment';
  }
  return (
    <TouchableOpacity onPress={createOfferAnswer}>
      <IconWithRoundedBackground
        iconName="phone-slash"
        size={30}
        iconColor={colors.CHARCOAL_GREY}
        backGroundColor={colors.WHITE}
        {...props}
      />
    </TouchableOpacity>
  );
};

export default IconButton;
