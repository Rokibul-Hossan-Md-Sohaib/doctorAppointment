import React, {useRef, useEffect, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableHighlight,
  DeviceEventEmitter,
  TouchableWithoutFeedback,
  Alert,
  BackHandler,
} from 'react-native';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView,
  MediaStream,
  MediaStreamTrack,
  mediaDevices,
  registerGlobals,
} from 'react-native-webrtc';

import {useSelector, useDispatch} from 'react-redux';
import InCallManager from 'react-native-incall-manager';

import io from 'socket.io-client';
import Receiver from './components/receiver';
import Caller from './components/caller';
import CallActions from './components/call-actions';
import CallOptions from './components/call-options';
import MessageBox from './components/message-box';
import IconButton from './components/iconButton';
import {colors} from '../../config';
//import { socket } from './socket';
import styles from './styles';
// import PrescriptionModal from './components/prescriptionModal';
// import FilesModal from './components/filesModal';

const dimensions = Dimensions.get('window');
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
// import { setMediaBitrate } from './bandwidth';
//import { connectionStatusSet } from '../Appointment/appointmentReducers';
import NavigationService from '../../../services/NavigationService';
import {routes, api} from '../../../config';
import {
  setCallStateStore,
  setLocalStreamStore,
  setRemoteStreamStore,
  setRemoteURLStore,
  setLocalURLStore,
} from './callReducer';
// import FileModal from '../Patient/Profile/components/uploadFileModal';
import ReactNativeForegroundService from '@supersami/rn-foreground-service';
import {Platform} from 'react-native';
import axios from 'axios';
// import RecordScreen from 'react-native-record-screen';
import {ShowAlert} from '../../../components/ShowAlert';
import RNCallKeep from 'react-native-callkeep';

let pc;
let sum = 0;
let MediaStreams;

let callingTimeCount = 0;
let callingTimeMinuteCount = 0;
let timeoutId;

function App({route, navigation}) {
  const {item, socket, callerType, callType, callLogInfoId, callUUID} =
    route.params;
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  let {medicineState} = useSelector(state => state.prescription);
  const callStateFromStore = useSelector(state => state.call.callState);
  const [filesModalVisible, setFilesModalVisible] = useState(false);
  const [uploadFilesModalVisible, setUploadFilesModalVisible] = useState(false);
  const userId = state.login.data.user._id;
  const userType = state.login.data.user.userType;
  let callerId;
  let receiverId;
  let receiverName;
  let receiverImage;
  // console.log('callType:::', callType);
  if (userType === 'DOCTOR') {
    callerId = item.doctors._id;
    receiverId = item.patient._id;
    receiverName = item.patient.firstName;
    receiverImage = item.patient.profileImageURL;
  }
  if (userType === 'PATIENT') {
    callerId = item.patient._id;
    receiverId = item.doctors._id;
    receiverName = item.doctors.firstName;
    receiverImage = item.doctors.profileImageURL;
  }

  const [localVideo, setLocalVideo] = useState('');
  const [remoteVideo, setRemoteVideo] = useState('');
  const [callState, setCallState] = useState('');
  const [buttonState, setButtonState] = useState(true);
  const [offerOrAns, setOfferOrAns] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('');
  const [offerArrival, setOfferArrivl] = useState(true);
  const [speaker, setSpeaker] = useState(true);
  const [micOnOff, setMicOnOff] = useState(false);
  const [forceSpeaker, setForceSpeaker] = useState(true);
  const [video, setVideo] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [callDeclined, setIsCallDeclined] = useState(false);
  const [showVieoScreen, setShowVieoScreen] = useState(true);
  const [offerSend, setOfferSend] = useState(false);
  const [toggleVideo, setToggleVideo] = useState(true);
  const [toggleAudio, setToggleAudio] = useState(true);
  const [showCallOptions, setshowCallOptions] = useState(true);
  const [secondCount, setSecondCount] = useState('0');
  const [minutesCount, setMinutesCount] = useState('0');
  // const [recording, setRecording] = useState(false);
  // const [manualRecording, setManualRecording] = useState(false);
  const [callLogInfo, setCallLogInfo] = useState({});
  // const [recordedFile, setRecordedFile] = useState('');
  let [candidateValue, setCandidateValue] = useState('');

  //set call loginfo id from doctor
  useEffect(() => {
    if (userType !== 'DOCTOR') {
      setCallLogInfo({_id: callLogInfoId});
      if (Platform.OS === 'android') {
        PushNotification.removeAllDeliveredNotifications();
      } else {
        PushNotificationIOS.removeAllDeliveredNotifications();
      }
    }
  }, [callLogInfoId]);
  //set call loginfo id from doctor

  let userInfo = {
    _id: userId,
    userType: userType,
  };
  let dat = {
    app: item._id,
    user: userInfo,
    callType: callType,
  };
  //initiate call
  let appointmentId = item._id;
  useEffect(() => {
    userType === 'DOCTOR' && sendInitiatedCallInfo();
  }, []);

  //ask InCallManager reacord permission
  // useEffect(() => {
  //   if (InCallManager.recordPermission !== 'granted') {
  //     InCallManager.requestRecordPermission()
  //       .then(requestedRecordPermissionResult => {
  //         console.log(
  //           'InCallManager.requestRecordPermission() requestedRecordPermissionResult: ',
  //           requestedRecordPermissionResult,
  //         );
  //       })
  //       .catch(err => {
  //         console.log('InCallManager.requestRecordPermission() catch: ', err);
  //       });
  //   }
  // }, []);

  //send InitiatedCallInfo data to server
  const sendInitiatedCallInfo = () => {
    var data = JSON.stringify({
      sender: item.doctors._id,
      receiver: item.patient._id,
      appointmentId: item._id,
    });
    axios({
      method: 'post',
      url: `${api.SERVER}/common/initiateCall`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    })
      .then(function (response) {
        if (response.data.success) {
          setCallLogInfo(response.data.data.callInfo);
          if (callerType !== 'receiver') {
            createOffer(response.data.data.callInfo);
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  //send call to patient
  const createOffer = callInfo => {
    if (Platform.OS === 'android') {
      onStartForegroundTask().catch();
    }
    setConnectionStatus('Calling');
    dispatch(setCallStateStore('Calling'));
    InCallManager.start({media: 'audio/video', ringback: '_BUNDLE_'});
    InCallManager.setForceSpeakerphoneOn(true);

    setButtonState(false);
    const callInitiateTime = Date.now().toString();
    const notifyCallData = {
      type: 'notifyCall',
      callType: callType,
      callInitiateTime: callInitiateTime,
      callLogInfoId: callInfo._id,
    };
    sendToPeer('notifyCall', notifyCallData);
  };
  //////////////////
  //patient accept call
  const createAnswer = () => {
    if (Platform.OS === 'android') {
      onStartForegroundTask().catch();
    }
    InCallManager.stopRingtone();
    InCallManager.setForceSpeakerphoneOn(true);
    console.log('create answer');
    setButtonState(false);
    pc.createAnswer({offerToReceiveVideo: callType === 'Video' ? 1 : 0})
      .then(answer => {
        pc.setLocalDescription(answer)
          .then(success => {})
          .catch(err => {
            console.log('Error setting local Description');
            console.log(err);
          });
        sendToPeer('offerOrAnswer', answer);
      })
      .catch(e => {
        console.log(e);
      });
  };

  //webrtc and socket handler
  useEffect(() => {
    // const pc_config = {
    //   iceServers: [
    //     {
    //       urls: 'turn:52.88.28.2:3478',
    //       username: 'scholars1',
    //       credential: 'scholars1@!',
    //     },
    //     {
    //       urls: 'stun:stun.l.google.com:19302',
    //     },
    //   ],
    // };
    const pc_config = {
      iceServers: [
        {
          urls: 'turn:18.138.233.194:3478',
          username: 'jakirheath',
          credential: 'jakir@123456',
        },
        {
          urls: 'stun:stun.l.google.com:19302',
        },
      ],
    };

    pc = new RTCPeerConnection(pc_config);

    socket.emit('joinAppointment', dat);
    //
    socket.once('receiverJoiningNotification', async data => {
      console.log('========receiverJoiningNotification=======');
      console.log(data);
      console.log(sum);
      dispatch(setCallStateStore('Connecting'));
      InCallManager.stopRingback();
      if (data.userId === receiverId && sum === 0) {
        console.log('asdasdasdasdasdasdasdasdasdasdasddasdasd', data.callType);
        setConnectionStatus('Ringing');
        pc.createOffer({offerToReceiveVideo: data.callType === 'Video' ? 1 : 0})
          .then(offer => {
            console.log('Offer created!', offer);
            // Bandwidthhandling
            // here is how to use it

            // let newOffer = { ...offer, sdp };
            // console.log(newOffer);

            // set offer sdp as local description
            //  console.log('offer created!!!!!!!');
            pc.setLocalDescription(offer);

            //  console.log(JSON.stringify(offer));

            // Controlling Bandwidth

            //const newSdp = setMediaBitrate(offer.sdp, 'video', 32);

            //  let newSdp = setMediaBitrate(setMediaBitrate(offer.sdp, 'video', 64), 'audio', 32);

            //  console.log('offer middle: \n' + newSdp);

            // offer.sdp = newSdp;

            // console.log('offer after: \n' + offer.sdp);
            sendToPeer('offerOrAnswer', offer);
            console.log('sum : ' + sum);

            // socket.emit('offerOrAnswer', {
            //   socketID: socket.id,
            //   payload: offer,
            //   friendsId,
            //   userId,
            // });
          })
          .catch(e => {
            console.log(e);
          });
        //  //for not receiving receiverJoiningNotification more than once
        sum++;
      }
    });
    // socket.on('videoConnected', success => {
    //   console.log(success);
    // });
    socket.once('hi', user => {
      console.log('hi ' + user);
    });
    socket.once(dat.app + 'declineCall', data => {
      console.log('userTypeuserTypeuserTypeuserTypeuserType', data);
      console.log('userTypeuserTypeuserTypeuserTypeuserType', userType);
      if (userType === 'DOCTOR') {
        // cancelButtonHandler();
        // socket.emit('unsubscribe', { room: dat.app, userId });
        ShowAlert({
          title: 'Call Info!',
          msg: data.msg,
          OnOK: () => {},
        });
      }
    });
    //
    socket.once('roomLeaveNotification', data => {
      console.log('roomLeaveNotification===========');
      console.log(data);
      console.log('roomLeaveNotification==================');

      setConnectionStatus('Declined');
      dispatch(setCallStateStore('Declined'));
      /*  */
      pc.removeStream(MediaStream);
      pc.close();
      callingTimeCount = 0;
      sum = 0;
      callingTimeMinuteCount = 0;
      setLocalVideo('');
      setRemoteVideo('');
      InCallManager.stop();
      // onStopForegroundTask();
      // InCallManager.stopRingtone();
      // InCallManager.stopRingtone();

      // dispatch(setLocalStreamStore(''));
      // dispatch(setRemoteStreamStore(''));
      // dispatch(setCallStateStore(''));
      if (callUUID && Platform.OS === 'ios') {
        RNCallKeep.endCall(callUUID);
      }
      if (callUUID && Platform.OS === 'android') {
        onStopForegroundTask();
      }
      if (route.name === 'Video') {
        try {
          //navigation.goBack();
          if (userType === 'DOCTOR') {
            callLogInfo._id && sendFinalCallInfo();
            // recording && _toggleVideoRecording();
            setShowVieoScreen(false);
            NavigationService.navigate(routes.PATIENT_APPOINTMENT);
          } else {
            setShowVieoScreen(false);
            NavigationService.navigate(routes.TAB_NAVIGATION);
          }
          // NavigationService.navigate(routes.TAB_NAVIGATION);
        } catch (error) {
          console.log('===============NavigationError=====================');
          console.log(error);
          console.log('================NavigationError====================');
        }
      }
    });

    socket.once('offerOrAnswerReceived', data => {
      console.log(
        'offerOrAnswerReceivedofferOrAnswerReceivedofferOrAnswerReceivedofferOrAnswerReceived',
        data,
      );
      console.log('userIduserId', userId);
      InCallManager.start({media: 'audio/video'});
      InCallManager.setForceSpeakerphoneOn(true);

      if (data.data.type === 'offer') {
        setButtonState(false);
      }
      setCallState(data.data.type);
      if (data.data.type === 'answer') {
        InCallManager.stopRingback();
        setButtonState(false);
      }
      if (data.userId !== userId) {
        if (data.data.type === 'offer') {
          pc.setRemoteDescription(new RTCSessionDescription(data.data))
            .then(success => {
              console.log(
                'remote desription setted sucessfully and setted data type: ',
                data.data.type,
              );
              setCallState('');
              setTimeout(() => {
                if (callerType === 'receiver') createAnswer();
              }, 500);
            })
            .catch(err => {
              console.log('Error from offerOrAnsReceived: ');
              console.log(err);
              console.log('Error from offerOrAnsReceived: ');
            });

          setOfferOrAns(true);
        }
        if (data.data.type === 'answer') {
          pc.setRemoteDescription(new RTCSessionDescription(data.data))
            .then(success => {
              console.log(
                'remote desription setted sucessfully and setted data type: ',
                data.data.type,
              );
            })
            .catch(err => {
              console.log('Error from offerOrAnsReceived: ');
              console.log(err);
              console.log('Error from offerOrAnsReceived: ');
            });

          setOfferOrAns(true);
        }
      } else {
        console.log('user ID same!!');
      }
    });

    socket.on('candidateReceived', data => {
      // console.log('From Peer... ', JSON.stringify(candidate))
      // this.candidates = [...this.candidates, candidate]
      if (data) {
        if (data.userId !== userId) {
          pc.addIceCandidate(new RTCIceCandidate(data.data))
            .then(success => {
              console.log('candiadate setted.........');
            })
            .catch(error => {
              console.log('Candidate setting Error!!!!' + error);
            });
        } else {
          console.log('candidate Matches');
        }
      }
    });

    pc.onicecandidate = e => {
      // send the candidates to the remote peer
      // see addCandidate below to be triggered on the remote peer
      if (e.candidate) {
        // console.log(JSON.stringify(e.candidate))
        setCandidateValue(e.candidate);
      }
    };
    // pc.onnegotiationneeded = async () => {
    //   createOffer;
    // };
    // triggered when there is a change in connection state
    pc.oniceconnectionstatechange = e => {
      console.log('soniceconnectionstatechangetate');
      console.log(pc.iceConnectionState);
      if (pc.iceConnectionState === 'connected') {
        console.log('call connected!!'); //from this end
        setConnectionStatus('connected');
        dispatch(setCallStateStore('connected'));
        // axios({
        //   method: 'post',
        //   url: `${api.SERVER}/common/UpdateCallInfo`,
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   data: { callId: callLogInfo._id },
        // })
        //   .then(function(response) {
        //     console.log('response', response);
        //   })
        //   .catch(function(error) {
        //     console.log(error);
        //   });
        callingTimeCount = 0;
        setSecondCount(0);
      }
      if (pc.iceConnectionState === 'failed') {
        console.log('connection failed!!');
        // pc.restartIce();
        setConnectionStatus('failed');
        dispatch(setCallStateStore('failed'));
      }
      if (pc.iceConnectionState === 'disconnected') {
        console.log('connection disconnected!!'); //from other end
        setConnectionStatus('disconnected');
        // cancelButtonHandler();
        dispatch(setCallStateStore('disconnected'));
      }
      if (pc.iceConnectionState === 'closed') {
        console.log('connection closed!!'); //from this end
        setConnectionStatus('closed');
        // cancelButtonHandler();
        dispatch(setCallStateStore('closed'));
      }
      if (pc.iceConnectionState === 'checking') {
        console.log('connection checking..'); //from this end
        setConnectionStatus('checking');
        dispatch(setCallStateStore('checking'));
      }
      //  dispatch(connectionStatusSet(pc.iceConnectionState));
      // Handle the failure
    };

    pc.onaddstream = e => {
      console.log('eeeeeeeeeeeeeeeeeee', e);
      console.log('eeeeeeeeeeeeeeeeeeestream', e.stream);
      // debugger;
      // this.remoteVideoref.current.srcObject = e.streams[0]
      setRemoteVideo(e.stream);
      // setTimeout(() => {
      //   setRemoteVideo(e.stream);
      //   // remoteVideoGlobal = e.stream;
      //   // dispatch(setRemoteStreamStore(JSON.stringify(e.stream)));
      //   // dispatch(setRemoteURLStore(e.stream.toURL()));
      // }, 500);
    };

    const success = stream => {
      // console.log(stream.toURL());
      MediaStreams = stream;
      console.log('localstreamlocalstreamlocalstreamlocalstream', stream);
      setLocalVideo(stream);
      //setLocalURLStore(stream.toURL());
      // var jsonObj = JSON.stringify(stream, function(key, value) {
      //   if (typeof value === 'function') {
      //     return value.toString();
      //   } else {
      //     return value;
      //   }
      // });
      // dispatch(setLocalStreamStore(jsonObj));
      pc.addStream(stream);
    };
    const failure = e => {
      console.log('getUserMedia Error: ', e);
    };
    let isFront = true;
    mediaDevices.enumerateDevices().then(sourceInfos => {
      //  console.log(sourceInfos);
      let videoSourceId;
      for (let i = 0; i < sourceInfos.length; i++) {
        const sourceInfo = sourceInfos[i];
        if (
          sourceInfo.kind == 'videoinput' &&
          sourceInfo.facing == (isFront ? 'front' : 'environment')
        ) {
          videoSourceId = sourceInfo.deviceId;
        }
      }
      let videoConstraints = {
        mandatory: {
          minWidth: 320, // Provide your own width, height and frame rate here
          minHeight: 180,
          minFrameRate: 5,
        },
        // width: { min: 640, ideal: 1280, max: 1920 },
        // height: { min: 480, ideal: 720, max: 1080 },
        // minFrameRate: 30,
        facingMode: isFront ? 'user' : 'environment',
        optional: videoSourceId ? [{sourceId: videoSourceId}] : [],
      };

      const constraints = {
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          googEchoCancellation: true,
          googAutoGainControl: true,
          googNoiseSuppression: true,
          googHighpassFilter: true,
          googTypingNoiseDetection: true,
          googNoiseReduction: true,
        },
        video:
          callType === 'Video'
            ? {
                facingMode: 'user',
                frameRate: 5,
                height: 720,
                width: 1280,
              }
            : false,
        //  video: false,
        // video: callType === 'Video' ? videoConstraints : false,
      };
      console.log(
        'constraintsconstraintsconstraintsconstraintsconstraints',
        constraints,
      );
      mediaDevices.getUserMedia(constraints).then(success).catch(failure);
    });
    return () => {
      try {
        pc.removeStream(MediaStream);
        pc.close();
        //socket.close();
        socket.emit('unsubscribe', {room: dat.app, userId});
        // socket.emit('disconnect');
        //socket.disconnect();
        setLocalVideo('');
        setRemoteVideo('');
        InCallManager.stop();
        onStopForegroundTask();
        // InCallManager.stopRingtone();
        //for not receiving receiverJoiningNotification more than once
        sum = 0;
      } catch (error) {
        console.log('====================================');
        console.log(error);
        console.log('====================================');
      }
    };
  }, []);
  //handle receiveer join
  // useEffect(() => {
  //   socket.once('receiverJoiningNotification', async data => {
  //     console.log('========receiverJoiningNotification=======');
  //     console.log(data);
  //     console.log(sum);
  //     dispatch(setCallStateStore('Connecting'));
  //     InCallManager.stopRingback();
  //     if (data.userId === receiverId && sum === 0) {
  //       console.log('asdasdasdasdasdasdasdasdasdasdasddasdasd', callType);
  //       setConnectionStatus('Ringing');
  //       pc.createOffer({ offerToReceiveVideo: callType === 'Video' ? 1 : 0 })
  //         .then(offer => {
  //           console.log('Offer created!', offer);
  //           // Bandwidthhandling
  //           // here is how to use it

  //           // let newOffer = { ...offer, sdp };
  //           // console.log(newOffer);

  //           // set offer sdp as local description
  //           //  console.log('offer created!!!!!!!');
  //           pc.setLocalDescription(offer);

  //           //  console.log(JSON.stringify(offer));

  //           // Controlling Bandwidth

  //           //const newSdp = setMediaBitrate(offer.sdp, 'video', 32);

  //           //  let newSdp = setMediaBitrate(setMediaBitrate(offer.sdp, 'video', 64), 'audio', 32);

  //           //  console.log('offer middle: \n' + newSdp);

  //           // offer.sdp = newSdp;

  //           // console.log('offer after: \n' + offer.sdp);
  //           sendToPeer('offerOrAnswer', offer);
  //           console.log('sum : ' + sum);

  //           // socket.emit('offerOrAnswer', {
  //           //   socketID: socket.id,
  //           //   payload: offer,
  //           //   friendsId,
  //           //   userId,
  //           // });
  //         })
  //         .catch(e => {
  //           console.log(e);
  //         });
  //       //  //for not receiving receiverJoiningNotification more than once
  //       sum++;
  //     }
  //   });
  // }, []);
  //send to server by socket
  const sendToPeer = (messageType, payload) => {
    // console.log('====================================');
    // console.log('send to peer executed');
    // console.log(messageType);
    // console.log('====================================');
    socket.emit(
      messageType,
      {appointmentId: item._id, data: payload, userId, receiverId},
      response => {
        //ackknolegement
        console.log(messageType, response);
      },
    );
  };
  //send candidate to server
  useEffect(() => {
    if (!!candidateValue) {
      setTimeout(() => {
        sendToPeer('candidate', candidateValue);
      }, 500);
    }
  }, [candidateValue]);
  //call cancel handler
  const cancelButtonHandler = e => {
    try {
      console.log('called pcpcpcpcpcpc', pc);
      pc.removeStream(MediaStream);
      pc.close();
      if (callUUID && Platform.OS === 'ios') {
        RNCallKeep.endCall(callUUID);
      }
      if (callUUID && Platform.OS === 'android') {
        onStopForegroundTask();
      }
      //socket.close();
      // if (connectionStatus === 'Calling') {
      //   socket.emit(
      //     'notifyCancelCall',
      //     { receiverId, appointmentId: item._id, userId,data:{callType: callType} },
      //     response => {
      //       //ackknolegement
      //       console.log(messageType, response);
      //     },
      //   );
      // }

      socket.emit('unsubscribe', {room: dat.app, userId});

      // socket.emit('disconnect');
      //socket.disconnect();
      // callingTimeCount = 0;
      // callingTimeMinuteCount = 0;
      // sum = 0;
      // setLocalVideo('');
      // setRemoteVideo('');
      // InCallManager.stop();
      // // InCallManager.stopRingtone();
      // // InCallManager.stopRingtone();

      // // dispatch(setLocalStreamStore(''));
      // // dispatch(setRemoteStreamStore(''));
      // // dispatch(setCallStateStore(''));
      // callLogInfo._id && sendFinalCallInfo();

      if (route.name === 'Video') {
        try {
          //navigation.goBack();

          if (userType === 'DOCTOR') {
            // recording && _toggleVideoRecording();
            setShowVieoScreen(false);
            NavigationService.navigate(routes.TAB_NAVIGATION);
          } else {
            setShowVieoScreen(false);
            NavigationService.navigate(routes.TAB_NAVIGATION);
          }
          console.log('Go back called');
          // NavigationService.navigate(routes.TAB_NAVIGATION);
        } catch (error) {
          console.log('===============NavigationError=====================');
          console.log(error);
          console.log('================NavigationError====================');
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  //video record
  // useEffect(() => {
  //   if (!manualRecording) {
  //     if (
  //       connectionStatus === 'connected' &&
  //       (secondCount == 0 || secondCount == 30) &&
  //       minutesCount == 0
  //     ) {
  //       _toggleVideoRecording().catch();
  //     }
  //   }
  // }, [secondCount, minutesCount]);
  //video record
  useEffect(() => {
    if (userType === 'DOCTOR' && connectionStatus === 'connected') {
      axios({
        method: 'post',
        url: `${api.SERVER}/common/UpdateCallInfo`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: {callId: callLogInfo._id},
      })
        .then(function (response) {
          console.log('response', response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [connectionStatus]);
  //android notification show in display
  useEffect(() => {
    let subscription = DeviceEventEmitter.addListener(
      'notificationClickHandle',
      function (e) {},
    );
    return function cleanup() {
      subscription.remove();
    };
  }, []);
  //call time duration calculate
  useEffect(() => {
    var intervalID = setInterval(() => {
      callingTimeCount++;
      setSecondCount(callingTimeCount);
      if (callingTimeCount === 60) {
        callingTimeCount = 0;
        callingTimeMinuteCount++;
        setMinutesCount(callingTimeMinuteCount);
      }
      if (callStateFromStore === 'Calling' && callingTimeCount >= 40) {
        clearInterval(intervalID);
        cancelButtonHandler();
      }
      if (callStateFromStore === 'disconnected') {
        clearInterval(intervalID);
        cancelButtonHandler();
      }
    }, 1000);
    return () => {
      clearInterval(intervalID);
    };
  }, [callStateFromStore, callLogInfo]);
  //upload function for recording
  // const uploadRecording = res => {
  //   const data = new FormData();
  //   let file = {
  //     uri:
  //       Platform.OS === 'android'
  //         ? `file:///${res.result.outputURL}`
  //         : `${res.result.outputURL.replace('file://', '')}`,
  //     type: 'video/mp4',
  //     name: res.result.outputURL,
  //   };
  //   data.append('file', file);
  //   data.append('connectedAt', Date.now());
  //   data.append('callId', callLogInfo._id);
  //   axios({
  //     method: 'post',
  //     url: `${api.SERVER}/common/uploadRecording`,
  //     data: data,
  //   })
  //     .then(response => {
  //       setRecordedFile('');
  //       Toast.show({
  //         message: response.data.message,
  //         type: 'positive',
  //       });
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
  // };
  //send final callinfo/end callinfo in server
  const sendFinalCallInfo = () => {
    console.warn('callLog', callLogInfo);
    var data = {
      callId: callLogInfo._id,
      abortedAt: Date.now(),
      duration: `${minutesCount}m : ${secondCount}s`,
    };
    axios({
      method: 'post',
      url: `${api.SERVER}/common/abortCallInfo`,
      data: data,
    })
      .then(function (response) {
        console.warn('final', response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  // const _toggleVideoRecording = async () => {
  //   if (userType === 'DOCTOR') {
  //     if (recording) {
  //       setRecording(false);
  //       const res = await RecordScreen.stopRecording().catch(error => alert(JSON.stringify(error)));
  //       if (res) {
  //         uploadRecording(res);
  //       }
  //     } else {
  //       setRecording(true);
  //       RecordScreen.startRecording({ mic: callType === 'Video' ? false : true })
  //         .then(data => {
  //           console.log('RecordScreen data', data);
  //           if (data && data === 'error') {
  //             setRecording(false);
  //           }
  //           if (data && data === 'started') {
  //             setRecording(true);
  //           }
  //         })
  //         .catch(error => {
  //           console.log('RecordScreen errorerrorerrorerrorerror', error);
  //           setRecording(false);
  //         });
  //     }
  //   }
  //   return;
  // };
  const onStartForegroundTask = () => {
    // Checking if the task i am going to create already exist and running, which means that the foreground is also running.
    if (ReactNativeForegroundService.is_task_running('taskid')) return;
    // Creating a task.
    ReactNativeForegroundService.add_task(() => {}, {
      delay: 100,
      onLoop: true,
      taskId: 'taskid',
      onError: e => console.log(`Error logging:`, e),
    });

    let obj = {routeName: 'mainActivity', routeParams: {data: ''}};
    let obj1 = {routeName: 'mainActivity 1', routeParams: {data: ''}};
    let obj3 = {routeName: 'mainActivity 2', routeParams: {data: ''}};

    //Notification Config

    let notificationConfig = {
      id: 144,
      title: `myHealth`,
      message: `Ongoing call with ${receiverName}....`,
      // playSound: false,
      vibration: true,
      visibility: 'public',
      icon: 'ic_launcher',
      importance: 'max',
      number: String(1),
      button: false,
      buttonText: 'Back to Call',
      buttonOnPress: JSON.stringify(obj),
      mainOnPress: JSON.stringify(obj1),
    };
    // starting  foreground service.
    return ReactNativeForegroundService.start(notificationConfig);
  };
  const onStopForegroundTask = () => {
    // Make always sure to remove the task before stoping the service. and instead of re-adding the task you can always update the task.
    if (ReactNativeForegroundService.is_task_running('taskid')) {
      ReactNativeForegroundService.remove_task('taskid');
    }
    // Stoping Foreground service.
    return ReactNativeForegroundService.stop();
  };
  //speaker handler
  useEffect(() => {
    // if (Platform.OS === 'android') {
    //   InCallManager.setSpeakerphoneOn(speaker);
    // }
    //
    InCallManager.setForceSpeakerphoneOn(forceSpeaker);
  }, [forceSpeaker]);
  //mic mute handler
  useEffect(() => {
    if (Platform.OS === 'android') {
      InCallManager.setMicrophoneMute(micOnOff);
    }

    if (Platform.OS === 'ios' && MediaStreams !== undefined) {
      if (micOnOff) {
        MediaStreams.getAudioTracks()[0].enabled = false;
        // setToggleAudio(false);
      } else {
        MediaStreams.getAudioTracks()[0].enabled = true;
        //setToggleAudio(true);
      }
    }
  }, [micOnOff]);
  //video toggle
  const toggleVideoHandler = () => {
    if (localVideo != '') {
      if (toggleVideo) {
        MediaStreams.getVideoTracks()[0].enabled = false;
        setToggleVideo(false);
      } else {
        MediaStreams.getVideoTracks()[0].enabled = true;
        setToggleVideo(true);
      }
    }
  };
  useEffect(() => {
    if (
      connectionStatus === 'connected' &&
      callType === 'Video' &&
      !filesModalVisible &&
      !uploadFilesModalVisible &&
      !modalVisible
    ) {
      timeoutId = setTimeout(() => {
        setshowCallOptions(false);
      }, 10000);
    } else {
      // console.log('====================================');
      // console.log('Inside clear Timout');
      // console.log('====================================');
      clearTimeout(timeoutId);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [
    showCallOptions,
    connectionStatus,
    modalVisible,
    filesModalVisible,
    uploadFilesModalVisible,
  ]);
  //android backbutton handler
  useEffect(() => {
    const backAction = () => {
      Alert.alert(
        'Warning!',
        'Call will be disconnected if you go back, try press home button for minimize the app',
        [
          {
            text: 'Continue Call',
            onPress: () => null,
            style: 'cancel',
          },
          {text: 'End Call', onPress: () => BackHandler.exitApp()},
        ],
      );
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
  useEffect(() => {
    //send call record notification to patient
    socket.on(dat.app + 'sendRecordCallInvitation', data => {
      if (userType === 'PATIENT') {
        Alert.alert(
          'Doctor wants to record the call!',
          'Do you allow this?',
          [
            {
              text: 'Yes',
              onPress: () => {
                socket.emit(
                  'sendRecordCallResponse',
                  {
                    appointmentId: dat.app,
                    opt: 'accept',
                  },
                  response => {
                    console.log('recordCall response', response);
                  },
                );
                socket.removeAllListeners('sendRecordCallInvitation');
              },
            },
            {
              text: 'N0',
              onPress: () => {
                socket.emit(
                  'sendRecordCallResponse',
                  {
                    appointmentId: dat.app,
                    opt: 'decline',
                  },
                  response => {
                    console.log('recordCall response', response);
                  },
                );
                socket.removeAllListeners('sendRecordCallInvitation');
              },
            },
          ],
          {cancelable: false},
        );
      }
    });
    //send call record response to doctor
    // socket.on(dat.app + 'sendRecordCallResponse', data => {
    //   // console.log('sendRecordCallResponse', data);
    //   if (userType === 'DOCTOR') {
    //     if (data.opt === 'accept') {
    //       setRecording(true);
    //       _toggleVideoRecording();
    //     } else {
    //       Alert.alert(
    //         'Call Record',
    //         'Patient has declined the call record option.',
    //         [
    //           {
    //             text: 'Ok',
    //             onPress: () => {},
    //           },
    //         ],
    //         { cancelable: false },
    //       );
    //     }
    //     socket.removeAllListeners('sendRecordCallResponse');
    //   }
    // });
  }, [socket]);
  return (
    <>
      {showVieoScreen ? (
        <TouchableWithoutFeedback onPress={() => setshowCallOptions(true)}>
          <View
            style={{
              flex: 1,
              justifyContent: 'space-between',
              padding: 10,
              backgroundColor: '#004081',
            }}>
            <Caller
              //streamURL={LocalVideoGlobal && LocalVideoGlobal.toURL()}
              streamURL={localVideo}
              connectionStatus={connectionStatus}
              callType={callType}
            />

            <Receiver
              streamURL={remoteVideo}
              callState={callState}
              buttonState={buttonState}
              receiverName={receiverName}
              connectionStatus={connectionStatus}
              callDeclined={callDeclined}
              receiverImage={receiverImage}
              callType={callType}
            />

            {callerType !== 'receiver' ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  // backgroundColor: 'red',
                  // zIndex: 1111,
                }}>
                {(!buttonState && connectionStatus === 'Calling') ||
                connectionStatus === 'Declined' ||
                connectionStatus === 'Ringing' ? (
                  <>
                    <Text
                      style={{
                        color: colors.WHITE,
                        fontSize: 24,
                      }}>
                      {callerType !== 'receiver' ? receiverName : null}
                    </Text>
                    <Text
                      style={{
                        color:
                          connectionStatus === 'Declined'
                            ? colors.TOMATO
                            : colors.WHITE,
                        fontSize: 14,
                      }}>
                      {connectionStatus}
                    </Text>
                  </>
                ) : null}
              </View>
            ) : null}
            {showCallOptions ? (
              <View
                style={{
                  alignSelf: 'center',
                  marginVertical: 30,
                  width: '100%',
                }}>
                <CallActions
                  createOffer={createOffer}
                  createAnswer={createAnswer}
                  callState={callState}
                  buttonState={buttonState}
                  navigation={navigation}
                  callerType={callerType}
                  cancelButtonHandler={cancelButtonHandler}
                />

                <CallOptions
                  localVideo={localVideo}
                  setSpeaker={setSpeaker}
                  speaker={speaker}
                  forceSpeaker={forceSpeaker}
                  setForceSpeaker={setForceSpeaker}
                  micOnOff={micOnOff}
                  setMicOnOff={setMicOnOff}
                  // MediaStreamTrack={MediaStreamTrack}
                  // MediaStream={MediaStream}
                  setLocalVideo={setLocalVideo}
                  callType={callType}
                  toggleVideoHandler={toggleVideoHandler}
                  toggleVideo={toggleVideo}
                />

                <View
                  style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    flexDirection: 'row',
                    paddingTop: 5,
                  }}>
                  {/* {state.login.data.user.userType === 'DOCTOR' ? (
                    <TouchableHighlight
                      style={{
                        ...styles.openButton,
                        backgroundColor: recording ? 'red' : colors.CHARCOAL_GREY,
                      }}
                      onPress={() => {
                        // _toggleVideoRecording().catch();
                        // setManualRecording(!manualRecording);
                        if (recording) {
                          _toggleVideoRecording();
                        } else {
                          socket.emit(
                            'sendRecordCallInvitation',
                            {
                              appointmentId: item._id,
                            },
                            response => {
                              console.log('recordCall response', response);
                            },
                          );
                          Alert.alert(
                            'Patient will get a notification of record call.',
                            'If patient allows then the record will be started',
                            [
                              {
                                text: 'OK',
                                onPress: () => {},
                              },
                            ],
                            { cancelable: false },
                          );
                        }
                      }}>
                      <Text style={styles.textStyle}>{recording ? 'Recording' : 'Record'}</Text>
                    </TouchableHighlight>
                  ) : null} */}
                  {/* {state.login.data.user.userType === 'DOCTOR' ? (
                    <View>
                      <PrescriptionModal
                        modalVisible={modalVisible}
                        setModalVisible={setModalVisible}
                        route={route}
                        medicineState={medicineState}
                        // streamURL={localVideo && localVideo.toURL()}
                        streamURL={remoteVideo && remoteVideo.toURL()}
                      />

                      <TouchableHighlight
                        style={styles.openButton}
                        onPress={() => {
                          setModalVisible(true);
                        }}>
                        <Text style={styles.textStyle}>Create Prescription</Text>
                      </TouchableHighlight>
                    </View>
                  ) : null} */}

                  <View>
                    {/* <FilesModal
                      modalVisible={filesModalVisible}
                      setModalVisible={setFilesModalVisible}
                      route={route}
                      medicineState={medicineState}
                      // streamURL={localVideo && localVideo.toURL()}
                      streamURL={remoteVideo && remoteVideo.toURL()}
                    /> */}

                    <TouchableHighlight
                      style={styles.openButton}
                      onPress={() => {
                        setFilesModalVisible(true);
                      }}>
                      <Text style={styles.textStyle}>View Files</Text>
                    </TouchableHighlight>
                  </View>
                  <View>
                    {/* <FileModal
                      modalVisible={uploadFilesModalVisible}
                      setModalVisible={setUploadFilesModalVisible}
                      appointmentId={appointmentId}
                    /> */}

                    <TouchableHighlight
                      style={{...styles.openButton, marginTop: -20}}
                      onPress={() => {
                        setUploadFilesModalVisible(true);
                      }}>
                      <Text style={styles.textStyle}>Upload file</Text>
                    </TouchableHighlight>
                  </View>
                </View>
                {connectionStatus === 'connected' ? (
                  <View
                    style={{
                      alignSelf: 'center',
                      marginBottom: -25,
                    }}>
                    <Text style={{color: colors.TOMATO, fontSize: 15}}>
                      {minutesCount} : {secondCount}
                    </Text>
                  </View>
                ) : null}

                {/**
                 * <MessageBox />
                 */}
              </View>
            ) : null}
          </View>
        </TouchableWithoutFeedback>
      ) : null}
    </>
  );
}

export default App;
