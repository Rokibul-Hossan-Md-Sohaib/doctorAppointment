import React from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';

export default function IconWithRoundedBackground({
  iconName,
  size,
  iconColor,
  backGroundColor,
}) {
  let viewSize = size * 2;
  return (
    <View
      style={{
        height: viewSize,
        width: viewSize,
        borderRadius: viewSize,
        backgroundColor: backGroundColor,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
      }}>
      <Icon
        name={iconName}
        type="font-awesome-5"
        color={iconColor}
        size={size}
      />
    </View>
  );
}
