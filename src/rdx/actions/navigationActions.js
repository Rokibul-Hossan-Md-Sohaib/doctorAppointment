/*
 * Reducer actions related with navigation
 */
import NavigationService from 'src/navigation/NavigationService';

export function navigateToHome(params) {
  NavigationService.navigate('Home', params);
}
