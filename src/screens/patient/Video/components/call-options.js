import React, { useState, useEffect } from 'react';
import { View, Button } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { colors } from '../../../../config';
import { IconWithRoundedBackground } from '../../../../components';

let localStream = [];

const CallOptions = ({
  localVideo,
  setSpeaker,
  speaker,
  forceSpeaker,
  setForceSpeaker,
  setMicOnOff,
  micOnOff,
  MediaStream,
  setLocalVideo,
  callType,
  toggleVideo,
  toggleVideoHandler,
}) => {
  const [videoState, setVideoState] = useState(true);
  // const videoState
  // console.log('==============localvide======================');
  // console.log(localVideo);
  // console.log('===============localvideo=====================');

  useEffect(() => {
    localStream.push(localVideo);
  }, []);

  // useEffect(() => {
  //   if (localVideo) {
  //     const videos = localVideo.getVideoTracks();

  //     // console.log('==============video======================');
  //     // console.log(videos);
  //     // console.log('===============video=====================');
  //     if (videoState) {
  //       // localVideo._tracks[1]._enabled = false;
  //       //  localVideo.getVideoTracks()[0].stop()
  //       // localVideo.getTracks().forEach(track => {
  //       //   if (track.kind === 'video') {
  //       //     track._enabled = false;
  //       //     track.muted = false;
  //       //   }
  //       // });
  //     } else {
  //       //console.log(localVideo.getVideoTracks()[0]);
  //       // localVideo.getVideoTracks()[0].stop();
  //       //localVideo._tracks[1]._enabled = true;
  //       // localVideo.getTracks().forEach(track => {
  //       //   if (track.kind === 'video') {
  //       //     track._enabled = true;
  //       //     track.muted = true;
  //       //   }
  //       // });
  //     }
  //     console.log('==============localvide======================');
  //     console.log(localVideo._tracks[1]._enabled);
  //     console.log('===============localvideo=====================');
  //   }
  // }, [videoState]);
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {callType === 'Video' ? (
        <>
          <TouchableOpacity
            onPress={() => {
              if (localVideo != '') {
                localVideo._tracks[1]._switchCamera();
              }
            }}>
            <IconWithRoundedBackground
              iconName="sync"
              size={30}
              iconColor={colors.DARKISH_GREEN}
              backGroundColor={colors.CLOUDY_BLUE}
            />
          </TouchableOpacity>

          {toggleVideo ? (
            <TouchableOpacity onPress={toggleVideoHandler}>
              <IconWithRoundedBackground
                iconName="video"
                size={30}
                iconColor={colors.DARKISH_GREEN}
                backGroundColor={colors.CLOUDY_BLUE}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={toggleVideoHandler}>
              <IconWithRoundedBackground
                iconName="video-slash"
                size={30}
                iconColor={colors.DARKISH_GREEN}
                backGroundColor={colors.CLOUDY_BLUE}
              />
            </TouchableOpacity>
          )}
        </>
      ) : null}

      {micOnOff ? (
        <TouchableOpacity onPress={() => setMicOnOff(!micOnOff)}>
          <IconWithRoundedBackground
            iconName="microphone-slash"
            size={30}
            iconColor={colors.DARKISH_GREEN}
            backGroundColor={colors.CLOUDY_BLUE}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => setMicOnOff(!micOnOff)}>
          <IconWithRoundedBackground
            iconName="microphone"
            size={30}
            iconColor={colors.DARKISH_GREEN}
            backGroundColor={colors.CLOUDY_BLUE}
          />
        </TouchableOpacity>
      )}

      {forceSpeaker ? (
        <TouchableOpacity onPress={() => setForceSpeaker(!forceSpeaker)}>
          <IconWithRoundedBackground
            iconName="volume-up"
            size={30}
            iconColor={colors.DARKISH_GREEN}
            backGroundColor={colors.CLOUDY_BLUE}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => setForceSpeaker(!forceSpeaker)}>
          <IconWithRoundedBackground
            iconName="volume-down"
            size={30}
            iconColor={colors.DARKISH_GREEN}
            backGroundColor={colors.CLOUDY_BLUE}
          />
        </TouchableOpacity>
      )}

      {/**
       *  <TouchableOpacity>
        {forceSpeaker ? (
          <Button title="Speaker Off" onPress={() => setForceSpeaker(!forceSpeaker)} />
        ) : (
          <Button title="speaker On" onPress={() => setForceSpeaker(!forceSpeaker)} />
        )}
      </TouchableOpacity>
       *
       */}
    </View>
  );
};

export default CallOptions;
