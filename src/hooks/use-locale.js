/*
 * @copyRight by iHealthScreen
 */
import React, {createContext, useContext, useState, useEffect} from 'react';
import translations, {DEFAULT_LANGUAGE} from '../translations';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RNLocalize from 'react-native-localize';

const APP_LANGUAGE = 'appLanguage';

const localizationContext = createContext();
export const ProvideLocalization = ({children}) => {
  const localizationProvider = useLocalizationProvider();
  return (
    <localizationContext.Provider value={localizationProvider}>
      {children}
    </localizationContext.Provider>
  );
};
export const useLocale = () => {
  return useContext(localizationContext);
};
//
const useLocalizationProvider = () => {
  const [appLanguage, setAppLanguage] = useState(DEFAULT_LANGUAGE);
  //setLanguage
  const setLanguage = language => {
    translations.setLanguage(language);
    setAppLanguage(language);
    AsyncStorage.setItem(APP_LANGUAGE, language);
  };
  //initializeAppLanguage
  useEffect(() => {
    initializeAppLanguage();
  }, []);
  //initializeAppLanguage
  const initializeAppLanguage = async () => {
    const currentLanguage = await AsyncStorage.getItem(APP_LANGUAGE);
    if (!currentLanguage) {
      let localeCode = DEFAULT_LANGUAGE;
      const supportedLocaleCodes = translations.getAvailableLanguages();
      const phoneLocaleCodes = RNLocalize.getLocales().map(
        locale => locale.languageCode,
      );
      phoneLocaleCodes.some(code => {
        if (supportedLocaleCodes.includes(code)) {
          localeCode = code;
          return true;
        }
      });
      setLanguage(localeCode);
    } else {
      setLanguage(currentLanguage);
    }
  };
  return {translations, setLanguage, appLanguage, initializeAppLanguage};
};
