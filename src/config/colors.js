/*
 * @copyRight by iHealthScreen
 */
const colors = {
  WHITE: '#ffffff',
  BLACK: '#2c2c2c',
  TOMATO: '#eb3e32',
  PALE_GREY: '#f8f8fa',
  LIGHT_BLUE_GREY: '#aeb6c1',
  DARKISH_GREEN: '#004994',
  DARKISH_GREEN_STATUS: '#00590e',
  CHARCOAL_GREY: '#363f4d',
  CLOUDY_BLUE: '#b7c1cf',
  DODGER_BLUE: '#43acff',
  CORN_FLOWER: '#6c63ff',
  SUCCESS: '#42ba96',
  PRIMARY: '#43acff',
  SECONDARY: '#004994',
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
