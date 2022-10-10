/*
 * @copyRight by iHealthScreen
 */
const colors = {
  WHITE: '#ffffff',
  BLACK: '#2c2c2c',
  TOMATO: '#eb3e32',
  LIGHT_GRAY: '#e0e0e0',
  GRAY: '#818181',
  SUCCESS: '#42ba96',
  PRIMARY: '#0095D9',
  SECONDARY: '#00B3E9',
  INFO: '#FAAC58',
  ICON_COLOR: '#595F65',
  getRandomColor: () => {
    var letters = '012345'.split('');
    var color = '#';
    color += letters[Math.round(Math.random() * 5)];
    letters = '0123456789ABCDEF'.split('');
    for (var i = 0; i < 5; i++) {
      color += letters[Math.round(Math.random() * 15)];
    }
    return color;
  },
};
export default colors;
