import { en } from './en';
import { bn } from './bn';

export const translations = {
  en,
  bn,
};

export type SupportedLang = keyof typeof translations;