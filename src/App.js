/*
 * @copyRight by iHealthScreen
 */
import React, {useEffect} from 'react';
import {
  StatusBar,
  SafeAreaView,
  Platform,
  Modal,
  StyleSheet,
} from 'react-native';
import {Provider} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
Icon.loadFont();
import 'react-native-gesture-handler';
import {enableScreens} from 'react-native-screens';
import {ProvideLocalization} from './hooks/use-locale';

//
import AppNavigator from './navigation';
import store from './rdx/reducers';
import {colors} from './config';
import {routes} from './config';
enableScreens();

const theme = {
  colors: {
    primary: colors.DARKISH_GREEN,
    secondary: colors.LIGHT_BLUE_GREY,
  },
};

export default function App() {
  if (Platform.OS === 'ios') {
    return (
      <ProvideLocalization>
        <Provider store={store}>
          <AppNavigator />
        </Provider>
      </ProvideLocalization>
    );
  } else {
    return (
      <Provider store={store}>
        <StatusBar
          backgroundColor={colors.DARKISH_GREEN}
          barStyle="light-content"
        />
        <ProvideLocalization>
          <AppNavigator />
        </ProvideLocalization>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  topSafeArea: {
    flex: 0,
    backgroundColor: colors.DARKISH_GREEN,
  },
  bottomSafeArea: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
});
