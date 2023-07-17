import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function storeData(
   key: string,
   value: string | Record<string, any>,
   isObject = false,
) {
   let valueToStore: string;
   if (isObject) valueToStore = JSON.stringify(value);
   else valueToStore = value as string;

   await AsyncStorage.setItem(key, valueToStore).catch((e) => {
      // eslint-disable-next-line no-console
      console.error('Something went wrong: storeData', e);
   });
}

export async function getData(key: string, isObject = false) {
   return AsyncStorage.getItem(key)
      .then((value) => {
         if (!value) return '';

         if (isObject) return JSON.parse(value);

         return value;
      })
      .catch((e) => {
         // eslint-disable-next-line no-console
         console.error('Something went wrong: getData', e);
         return '';
      });
}

type LocalStorageValue = string | Record<string, any>;
type LocalStorageSetValue = Dispatch<
   SetStateAction<Promise<string | Record<string, any>>>
>;

export default function useLocalStorage(
   key: string,
   isObject = false,
): [LocalStorageValue, LocalStorageSetValue] {
   const [value, setValue] = useState<LocalStorageValue>(() =>
      getData(key, isObject),
   );

   useEffect(() => {
      storeData(key, value, isObject);
   }, [value]);

   return [value, setValue];
}
