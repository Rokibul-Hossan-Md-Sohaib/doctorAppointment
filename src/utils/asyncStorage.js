/*
 * @copyRight by iHealthScreen
 */
import AsyncStorage from '@react-native-async-storage/async-storage';

//Auth user token save
export const setToken = async value => {
  try {
    await AsyncStorage.setItem('token', JSON.stringify(value));
  } catch (e) {
    //
  }
};
//Auth user token get
export const getToken = async () => {
  try {
    return JSON.parse(await AsyncStorage.getItem('token'));
  } catch (e) {
    return null;
  }
};
//setItem
export const setItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    //
  }
};
//getItem
export const getItem = async key => {
  try {
    return JSON.parse(await AsyncStorage.getItem(key));
  } catch (e) {
    return null;
  }
};
