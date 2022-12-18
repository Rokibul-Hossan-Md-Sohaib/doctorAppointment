import { DeviceEventEmitter, Platform, PermissionsAndroid, AppState } from 'react-native';
import IncomingCall from 'react-native-incoming-call';
import RNCallKeep from 'react-native-callkeep';
// import messaging from '@react-native-firebase/messaging';
// import uuid from 'uid';
import NavigationService from '../../../../services/NavigationService';
import { routes } from '../../../../config';
import { socket } from '../../Video/socket';
// import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
var uuidrfc = require('react-native-uuid');
export const USE_CALLKEEP = true;
export function setupCallKeep() {
  const options = {
    ios: {
      appName: 'myHealth',
    },
    android: {
      alertTitle: 'Permissions required',
      alertDescription: 'This application needs to access your phone accounts',
      cancelButton: 'Cancel',
      okButton: 'ok',
      imageName: 'phone_account_icon',
      additionalPermissions: [PermissionsAndroid.PERMISSIONS.READ_CONTACTS],
      // Required to get audio in background when using Android 11
      foregroundService: {
        // channelId: 'com.ihs.myhealth',
        channelId: 'com.ihs.myhealth',
        channelName: 'Foreground service for my app',
        notificationTitle: 'Call On Going',
        notificationIcon: '../../../../src/images/logo.png',
      },
    },
  };

  try {
    RNCallKeep.setup(options)
      .then(accepted => {
        console.log('RNCallKeep setup', accepted);
      })
      .catch();
  } catch (err) {
    console.error('initializeCallKeep error:', err.message);
  }
}
USE_CALLKEEP && setupCallKeep();
export function HandleRemoteMessage(remoteMessage, isHeadless) {
  // let itemsList = [];
  // let itemCount = 0;
  console.log('============remoteMessage========================');
  console.log(remoteMessage.data);
  console.log('===============remoteMessage=====================');
  // itemCount++;
  let items = {
    _id: remoteMessage.data.appointmentId, ////Fix speelling  ./////////////////////////
    doctors: {
      _id: remoteMessage.data.doctorId,
      firstName: remoteMessage.data.doctorName,
      profileImageURL: remoteMessage.data.docImageURL,
    },
    patient: {
      _id: remoteMessage.data.patientId,
      firstName: remoteMessage.data.patientName,
    },
  };
  // let newItem = {
  //   itemId: itemCount,
  //   item: items,
  // };
  // itemsList.push(newItem);

  let callerName = remoteMessage.data.callerName;
  let callType = remoteMessage.data.callType;
  let intervalID;
  if (remoteMessage.data.title === 'Calling' && Platform.OS === 'android') {
    // const callExpireTime = parseInt(remoteMessage.data.callInitiateTime, 10) + 20000;
    // const currentTime = Date.now();
    console.log('items::::', items);
    const callUUID = uuidrfc.v1(); //uuid(14);
    let curId = callUUID;
    intervalID = setTimeout(() => {
      // console.log('RNCallKeepRNCallKeepRNCallKeepRNCallKeepRNCallKeepRNCallKeep', RNCallKeep);
      if (RNCallKeep.isCallActive && RNCallKeep.isCallActive(callUUID)) {
        curId = '1';
        RNCallKeep.endCall(callUUID);
      }
    }, 38000);
    if (USE_CALLKEEP) {
      //
      // setupCallKeep();
      //
      if (isHeadless) {
        console.log('aaaaaaaaa');
        RNCallKeep.backToForeground();

        IncomingCall.display(
          callUUID, // Call UUID v4
          callerName, // Username
          items.doctors.profileImageURL, // Avatar URL
          `Incomming ${callType} call`, // Info text
          34000, // Timeout for end call after 20s
        );

        // RNCallKeep.displayIncomingCall(callUUID, `${callType} call`, callerName, 'generic', true);
      } else {
        // RNCallKeep.displayIncomingCall(callUUID, `${callType} call`, callerName, 'generic', true);
        console.log('bbbbbbbb');
        IncomingCall.display(
          callUUID, // Call UUID v4
          callerName, // Username
          items.doctors.profileImageURL, // Avatar URL
          `Incomming ${callType} call`, // Info text
          34000, // Timeout for end call after 20s
        );

        // RNCallKeep.displayIncomingCall(
        //   callUUID,
        //   callerName,
        //   (localizedCallerName = `${callType} call`),
        //   (handleType = 'number'),
        //   (hasVideo = true),
        //   (options = null),
        // );

        // RNCallKeep.backToForeground();
      }
      DeviceEventEmitter.addListener('endCall', payload => {
        // End call action here
        console.log('endCallendCallendCallendCallendCallendCallendCall');
        socket.emit(
          'declineCall',
          {
            appointmentId: remoteMessage.data.appointmentId,
            callUUID: payload.uuid,
            callType: callType,
            msg:
              curId === '1' ? 'patient did not answer the call' : 'patient has declined the call',
            receiverId: remoteMessage.data.doctorId,
            userId: remoteMessage.data.patientId,
          },
          response => {
            console.log('end call response', response);
          },
        );
      });
      DeviceEventEmitter.addListener('answerCall', payload => {
        console.log('answerCall', payload);
        if (isHeadless) {
          console.log('1111');
          IncomingCall.openAppFromHeadlessMode(payload.uuid);
          NavigationService.navigate(routes.VIDEO, {
            item: items,
            socket,
            callerType: 'receiver',
            callType,
            callUUID,
            callLogInfoId: remoteMessage.data.callLogInfoId ? remoteMessage.data.callLogInfoId : '',
          });
        } else {
          console.log('2222');
          IncomingCall.backToForeground();
          NavigationService.navigate(routes.VIDEO, {
            item: items,
            socket,
            callerType: 'receiver',
            callType,
            callUUID,
            callLogInfoId: remoteMessage.data.callLogInfoId ? remoteMessage.data.callLogInfoId : '',
          });
        }
      });
      //
      // RNCallKeep.addEventListener('answerCall', ({ callUUID: callUUID }) => {
      //   console.log('asd:::::');
      //   if (isHeadless) {
      //     curId = null;
      //     RNCallKeep.endCall(callUUID);
      //     // const item = itemsList[itemsList.length - 1].item;
      //     setTimeout(() => {
      //       // RNCallKeep.removeEventListener('answerCall');
      //       RNCallKeep.startCall(callUUID);
      //       NavigationService.navigate(routes.VIDEO, {
      //         item: items,
      //         socket,
      //         callerType: 'receiver',
      //         callType,
      //         callUUID,
      //         callLogInfoId: remoteMessage.data.callLogInfoId
      //           ? remoteMessage.data.callLogInfoId
      //           : '',
      //       });
      //     }, 500);
      //   } else {
      //     curId = null;
      //     RNCallKeep.endCall(callUUID);
      //     // const item = itemsList[itemsList.length - 1].item;
      //     setTimeout(() => {
      //       // RNCallKeep.removeEventListener('answerCall');
      //       RNCallKeep.startCall(callUUID);

      //       NavigationService.navigate(routes.VIDEO, {
      //         item: items,
      //         socket,
      //         callerType: 'receiver',
      //         callType,
      //         callUUID,
      //         callLogInfoId: remoteMessage.data.callLogInfoId
      //           ? remoteMessage.data.callLogInfoId
      //           : '',
      //       });
      //     }, 500);
      //   }
      // });
      // //
      // RNCallKeep.addEventListener('endCall', callUUID => {
      //   try {
      //     clearInterval(intervalID);
      //     console.log('curIdcurIdcurIdcurIdcurId', curId);
      //     RNCallKeep.removeEventListener('answerCall');
      //     RNCallKeep.removeEventListener('endCall');
      //     if (curId) {
      //       socket.emit(
      //         'declineCall',
      //         {
      //           appointmentId: remoteMessage.data.appointmentId,
      //           callUUID: curId,
      //           callType: callType,
      //           msg:
      //             curId === '1'
      //               ? 'patient did not answer the call'
      //               : 'patient has declined the call',
      //           receiverId: remoteMessage.data.doctorId,
      //           userId: remoteMessage.data.patientId,
      //         },
      //         response => {
      //           console.log('end call response', response);
      //         },
      //       );
      //       curId = null;
      //     }
      //   } catch (err) {
      //     //err
      //   }
      // });
    }
    // Could also persist data here for later uses
  } else if (remoteMessage.notification.title === 'Missed call') {
    console.log('dismiss goes here');
    IncomingCall.dismiss();
  }
  // item = {};
}
/* Handle Ios Apn Push */
export function HandleIosRemoteMessage(notification) {
  let itemsList = [];
  let items = {
    callType: notification.callType,
    _id: notification.appointmentId, ////Fix speelling  ./////////////////////////
    doctors: {
      _id: notification.doctorId,
      firstName: notification.doctorName,
      profileImageURL: notification.docImageURL,
    },
    patient: {
      _id: notification.patientId,
      firstName: notification.patientName,
    },
  };
  // let newItem = {
  //   item: items
  // };
  // itemsList.push(newItem);
  console.log('HandleIosRemoteMessage: notification::', notification);
  console.log('HandleIosRemoteMessage: items::', items);
  let intervalID;
  // useEffect(() => {
  //   return () => {
  //     clearInterval(intervalID);
  //   };
  // }, []);
  // let item = {
  //   _id: notification.appointmentId, ////Fix speelling  ./////////////////////////
  //   doctors: {
  //     _id: notification.doctorId,
  //     firstName: notification.doctorName,
  //   },
  //   patient: {
  //     _id: notification.patientId,
  //     firstName: notification.patientName,
  //   },
  // };
  if (notification.title === 'calling') {
    let callType = notification.callType;
    const callUUID = notification.uuid ? notification.uuid : uuidrfc.v1(); //uuid(14);
    let curId = callUUID;
    intervalID = setTimeout(() => {
      if (RNCallKeep.isCallActive(callUUID)) {
        curId = '1';
        RNCallKeep.endCall(callUUID);
      }
    }, 38000);

    // setupCallKeep();`
    // RNCallKeep.displayIncomingCall(
    //   callUUID || '12345',
    //   `${callType} call`,
    //   callerName,
    //   'generic',
    //   true,
    // );
    /* Answer call */
    RNCallKeep.addEventListener('answerCall', ({ callUUID: callUUID }) => {
      // const item = itemsList[itemsList.length - 1].item;
      // RNCallKeep.endCall(callUUID);
      console.log('asdasddfg');
      curId = null;
      clearInterval(intervalID);
      RNCallKeep.removeEventListener('answerCall');
      setTimeout(() => {
        NavigationService.navigate(routes.VIDEO, {
          item: items,
          socket,
          callerType: 'receiver',
          callType,
          callUUID,
          callLogInfoId: notification.callLogInfoId,
        });
        PushNotificationIOS.removeAllDeliveredNotifications();
      }, 500);
    });
    /* Decline Call */
    RNCallKeep.addEventListener('endCall', ({ callUUID: callUUID }) => {
      // RNCallKeep.endCall(callUUID);
      try {
        clearInterval(intervalID);
        console.log('curIdcurIdcurIdcurIdcurIdcurIdcurId', curId);
        RNCallKeep.removeEventListener('endCall');
        RNCallKeep.removeEventListener('answerCall');

        if (curId) {
          socket.emit(
            'declineCall',
            {
              appointmentId: notification.appointmentId,
              callUUID,
              callType: callType,
              msg:
                curId === '1' ? 'patient did not answer the call' : 'patient has declined the call',
              receiverId: notification.doctorId,
              userId: notification.patientId,
            },
            response => {
              console.log('end call response', response);
            },
          );
          curId = null;
          PushNotificationIOS.removeAllDeliveredNotifications();
        }
      } catch (err) {
        //err
      }
    });
  } else if (notification.title === 'end-call') {
    console.log('endcall notification', notification);
    RNCallKeep.endAllCalls();
    clearInterval(intervalID);
  } else {
  }
}
