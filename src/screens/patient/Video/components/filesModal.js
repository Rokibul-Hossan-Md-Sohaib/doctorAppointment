// import React, { useState } from 'react';
// import { Alert, Modal, StyleSheet, Text, TouchableHighlight, View, Platform } from 'react-native';
// import styles from '../styles';
// import AppointmentDetails from '../../Doctor/Dashboard/AppointmentDetails';
// import DeviceInfo from 'react-native-device-info';

// const hasNotch = DeviceInfo.hasNotch();

// const FilesModal = ({ modalVisible, setModalVisible, route, medicineState, streamURL }) => {
//   return (
//     <Modal
//       animationType="slide"
//       transparent={false}
//       visible={modalVisible}
//       onRequestClose={() => {
//         // Alert.alert('Modal has been closed.');
//       }}>
//       <View style={{ paddingTop: Platform.OS === 'ios' ? 35 : null }}>
//         <TouchableHighlight
//           style={{ ...styles.closeButton }}
//           onPress={() => {
//             setModalVisible(!modalVisible);
//           }}>
//           <Text style={styles.backText}> Back to Call</Text>
//         </TouchableHighlight>
//       </View>
//       <AppointmentDetails route={route} />
//     </Modal>
//   );
// };

// export default FilesModal;
