// import React, { useState } from 'react';
// import {
//   Alert,
//   Modal,
//   StyleSheet,
//   Text,
//   TouchableHighlight,
//   View,
//   SafeAreaView,
// } from 'react-native';
// import styles from '../styles';
// import CreatePrescription from '../../Prescription/createPrescription/index';

// const PrescriptionModal = ({ modalVisible, setModalVisible, route, medicineState, streamURL }) => {
//   return (
//     <Modal
//       animationType="slide"
//       transparent={true}
//       visible={modalVisible}
//       onRequestClose={() => {
//         // Alert.alert('Modal has been closed.');
//       }}>
//       <SafeAreaView>
//         <TouchableHighlight
//           style={{ ...styles.closeButton }}
//           onPress={() => {
//             setModalVisible(!modalVisible);
//           }}>
//           <Text style={styles.backText}> Back to Call</Text>
//         </TouchableHighlight>
//       </SafeAreaView>
//       <CreatePrescription route={route} medicineState={medicineState} streamURL={streamURL} />
//     </Modal>
//   );
// };

// export default PrescriptionModal;
