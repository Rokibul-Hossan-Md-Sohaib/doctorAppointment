import React, {useEffect, useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Image,
} from 'react-native';
import {openSettings, RESULTS} from 'react-native-permissions';
import {useDispatch, useSelector} from 'react-redux';
import {Button, BoxWithShadow} from '../../../../components';
import {colors} from '../config';
import ImagePicker from 'react-native-image-crop-picker';
import Permission from '../config/permission';
import {camera} from '../config/permissionList';
import Icon from 'react-native-vector-icons/FontAwesome5';

const CustomImagePicker = ({modalVisible, setModalVisible, img}) => {
  const dispatch = useDispatch();
  const [image, setImage] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setImage(img);
  }, [img]);

  /**
   */
  const askCameraPermission = () => {
    Alert.alert(
      'Allow app to access your camera to capture photo.',
      'Tap Open Settings and turn on Camera to allow access.',
      [
        {
          text: 'Cancel',
          onPress: () => {},
        },
        {
          text: 'Open Settings',
          onPress: () =>
            openSettings().catch(() => console.warn('cannot open settings')),
        },
      ],
      {cancelable: false},
    );
  };
  /**
   * requestCameraPermission
   */
  const requestCameraPermission = async () => {
    try {
      const result = await Permission.requestPermission(camera);
      if (result !== RESULTS.GRANTED) {
        askCameraPermission();
      }
    } catch (err) {
      console.warn(err);
    }
  };
  /**
   */
  const askGalleryPermission = () => {
    Alert.alert(
      'Allow app to access your Photo Library to capture photo.',
      'Tap Open Settings and turn on Photo/Gallery to allow access.',
      [
        {
          text: 'Cancel',
          onPress: () => {},
        },
        {
          text: 'Open Settings',
          onPress: () =>
            openSettings().catch(() => console.warn('cannot open settings')),
        },
      ],
      {cancelable: false},
    );
  };
  /**
   * requestPhotoPermission
   */
  const requestGalleryPermission = async () => {
    try {
      const result = await Permission.requestPermission(camera);
      console.log(
        'requestGalleryPermissionrequestGalleryPermissionrequestGalleryPermission::',
        result,
      );
      if (result !== RESULTS.GRANTED) {
        askGalleryPermission();
      }
    } catch (err) {
      console.warn(err);
    }
  };
  /**
   */
  const pickImageHandler = async () => {
    try {
      await requestGalleryPermission();

      ImagePicker.openPicker({
        width: 250,
        height: 250,
        mediaType: 'photo',
        cropping: true,
        cropperCircleOverlay: true,
      }).then(image => {
        console.log(image);
        setImage({
          uri: image.path,
        });
      });
    } catch (err) {
      console.warn(err);
    }
  };
  /**
   */
  const pickImageCameraHandler = async () => {
    try {
      await requestCameraPermission();
      ImagePicker.openCamera({
        width: 250,
        height: 250,
        cropping: true,
        cropperCircleOverlay: true,
      }).then(image => {
        setImage({
          uri: image.path,
        });
        l;
      });
    } catch (err) {
      console.warn(err);
    }
  };
  /**
   */
  const submitAvatar = async () => {
    try {
      console.log('asd');
    } catch (error) {
      setModalVisible(false);
    }
  };
  return (
    <Modal
      animationType="slide"
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
      }}>
      <View style={styles.avatarModalContainer}>
        <View style={styles.modalContentContainer}>
          <TouchableHighlight
            style={{marginVertical: 40, alignSelf: 'flex-end'}}
            onPress={() => {
              setModalVisible(!modalVisible);
              setImage({});
            }}>
            <Icon
              name="times-circle"
              type="font-awesome-5"
              color={colors.TOMATO}
              size={25}
              containerStyle={{alignSelf: 'flex-end'}}
            />
          </TouchableHighlight>

          <Image
            source={image}
            style={{
              width: 250,
              height: 250,
              borderRadius: 125,
              resizeMode: 'cover',
            }}
          />
          {loading ? (
            <Text style={styles.uploadButton}>Please wait...</Text>
          ) : (
            <>
              <View
                style={{
                  marginTop: 10,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  // backgroundColor: 'red',
                }}>
                <View>
                  <Text
                    onPress={pickImageCameraHandler}
                    style={styles.uploadButton}>
                    Take Image
                  </Text>
                </View>
                <View
                  style={{
                    alignSelf: 'flex-end',
                    marginTop: 5,
                  }}>
                  <Text onPress={pickImageHandler} style={styles.uploadButton}>
                    Choose from library
                  </Text>
                </View>
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};
//
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatarModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContentContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  uploadButton: {
    color: colors.DARKISH_GREEN,
    fontSize: 20,
  },
});
//
export default CustomImagePicker;
