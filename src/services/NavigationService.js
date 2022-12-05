/*
 * @copyRight by iHealthScreen
 */
import * as React from 'react';
import {
  createNavigationContainerRef,
  CommonActions,
} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}
export function dispatch(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.navigate({
        name: name,
        params: params,
      }),
    );
  }
}
export function replace(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.replace(name);
  }
}

export default {
  navigate,
  dispatch,
  replace,
};
