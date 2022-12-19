import React from 'react';
import {Dimensions} from 'react-native';
import {View, Text, Image} from 'react-native';
// import { metrics } from '../../../config';
import {RTCView} from 'react-native-webrtc';
import {colors} from '../../../config';
const {width, height} = Dimensions.get('screen');

// let seconds = 0;
// let minutes = 0;
const Receiver = ({
  streamURL,
  buttonState,
  callState,
  receiverName,
  connectionStatus,
  callDeclined,
  receiverImage,
  callType,
}) => {
  // console.log('==========callState=========');
  // console.log('streamURL', streamURL);
  const renderRemote = () => {
    if (streamURL && connectionStatus === 'connected' && !buttonState) {
      return (
        <>
          {callType === 'Video' ? (
            <RTCView
              objectFit={'cover'}
              zOrder={20}
              // key={2}
              mirror={true}
              streamURL={streamURL && streamURL.toURL()}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: width ? width : '100%',
                height: height ? height : '100%',
                // width: 400,
                // height: 500,
                flex: 1,
              }}
            />
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 100,
              }}>
              {/* <Avatar
                size={150}
                rounded
                source={{uri: `${receiverImage}`}}
                // title="MT"
                activeOpacity={0.9}
              /> */}
            </View>
          )}
        </>
      );
    } else {
      return (
        <>
          {callState === 'offer' ? (
            <View
              style={{
                backgroundColor: 'transparent',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: colors.WHITE, fontSize: 25}}>
                connecting
              </Text>
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 100,
              }}>
              {/* <Avatar
                size={150}
                rounded
                source={{uri: `${receiverImage}`}}
                // title="MT"
                activeOpacity={0.9}
              /> */}
            </View>
          )}
        </>
      );
    }
  };
  return <>{renderRemote()}</>;
};

export default Receiver;

/***
 *
 *
 *
 *   <Image
 style={{
                   position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  width: metrics.screenWidth,
                  height: metrics.screenHeight ,
                }}
 source={{ uri: `data:image/gif;base64,${receiverImage}` }}
 />
 else {
      return (
        <>
          {callState === 'offer' ? (
            <View
              style={{
                backgroundColor: 'transparent',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{ color: colors.WHITE, fontSize: 25 }}>
                {receiverName} is calling...
              </Text>
            </View>
          ) : (
            <View
              style={{
                backgroundColor: '#34b7f1',
                position: 'absolute',
                top: 0,
                left: 0,
                width: metrics.screenWidth,
                height: metrics.screenHeight,
              }}
            />
          )}
        </>
      );
    }
 */
