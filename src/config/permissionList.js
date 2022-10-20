import {Platform} from 'react-native';
import {PERMISSIONS} from 'react-native-permissions';

exports.camera = {
  permission:
    Platform.OS === 'android'
      ? PERMISSIONS.ANDROID.CAMERA
      : PERMISSIONS.IOS.CAMERA,
  rationale: {
    title: 'Camera Permission',
    message: 'myHealth need to access your camera to capture image',
    buttonPositive: 'Ok',
    buttonNegative: 'Cancel',
  },
};
exports.gallery = {
  permission:
    Platform.OS === 'android'
      ? PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
      : PERMISSIONS.IOS.MEDIA_LIBRARY,
  rationale: {
    title: 'Photo Library Permission',
    message: 'myHealth need to access your Photo Library to use image',
    buttonPositive: 'Ok',
    buttonNegative: 'Cancel',
  },
};

exports.GetPermission = name => {
  switch (name) {
    case Platform.OS === 'android'
      ? PERMISSIONS.ANDROID.CAMERA
      : PERMISSIONS.IOS.CAMERA:
      return this.camera;
    default:
      return {error: 'Permission Not Found'};
  }
};
