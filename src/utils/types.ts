import { TFunctionDetailedResult } from 'i18next';

export type TranslationFunctionType = (
   key: string,
   options?: Record<string, any>,
) => string | TFunctionDetailedResult<string>;
