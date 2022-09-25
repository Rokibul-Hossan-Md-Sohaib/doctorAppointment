/*
 * @copyRight by iHealthScreen
 */
import { Dimensions, Platform } from 'react-native';
const { width, height } = Dimensions.get('screen');

const metrics = {
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  navBarHeight: Platform.OS === 'ios' ? 54 : 66,
};

export default metrics;
