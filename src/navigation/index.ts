import { NavigationContainerRefWithCurrent } from '@react-navigation/native';

let navigationRefCopy: NavigationContainerRefWithCurrent<any>;

export function setNavigationRef(navigationRef: any) {
   navigationRefCopy = navigationRef;
}

export function navigate(name: string, params?: any) {
   if (navigationRefCopy.isReady()) {
      navigationRefCopy.navigate(name, params);
   }
}
