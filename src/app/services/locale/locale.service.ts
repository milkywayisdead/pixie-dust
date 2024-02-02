import { Injectable } from '@angular/core';

import { locales, Locale } from '../../../locales/locales';

@Injectable({
  providedIn: 'root'
})
export class LocaleService {
  currentLocale: Locale = {};

  constructor() { }

  private getLocale(localeName: string): Locale {
    return locales[localeName];
  }

  setLocale(localeName: string): void {
    this.currentLocale = this.getLocale(localeName);
  }
}
