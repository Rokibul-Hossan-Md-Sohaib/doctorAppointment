import LocalizedStrings from 'react-native-localization';
import bn from './bn';
import en from './en';
export const DEFAULT_LANGUAGE = 'en';

const translations = {
  en,
  bn,
};

export default new LocalizedStrings(translations);
