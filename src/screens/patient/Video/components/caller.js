import React from 'react';
import { View, Text, Image } from 'react-native';
import { RTCView } from 'react-native-webrtc';

const Caller = ({ streamURL, callType }) => {
  return (
    <>
      {callType === 'Video' ? (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            zIndex: 1,
          }}>
          {/**
        * <View style={{ shadowCss }}>
        <Text>1.17</Text>
      </View>
        * 
        */}

          <RTCView
            key={1}
            zOrder={1}
            objectFit="contain"
            streamURL={streamURL && streamURL.toURL()}
            style={{ height: 120, width: 100, backgroundColor: 'transparent' }}
          />
        </View>
      ) : null}
    </>
  );
};

export default Caller;
