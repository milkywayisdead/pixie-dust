import { Injectable } from '@angular/core';

import { locales, Locale } from '../../../locales/locales';

const DEFAULT_LOCALE = 'ru';
const LOCALE_KEY_IN_STORAGE = 'pixie_dust_locale';

@Injectable({
  providedIn: 'root'
})
export class LocaleService {
  currentLocale: Locale = {};

  constructor() {
    const storageLocale = this.getLocaleFromStorage();
    this.setLocale(storageLocale || DEFAULT_LOCALE);
  }

  private getLocale(localeName: string): Locale {
    return locales[localeName];
  }

  private getLocaleFromStorage(): string {
    const storageLocale = localStorage.getItem(LOCALE_KEY_IN_STORAGE);
    return storageLocale || '';
  }

  setLocale(localeName: string = DEFAULT_LOCALE): void {
    this.currentLocale = this.getLocale(localeName);
  }
}
