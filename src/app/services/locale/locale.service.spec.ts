import { TestBed } from '@angular/core/testing';

import { LocaleService } from './locale.service';
import { locales } from '../../../locales/locales';

function compareLocales(localeToCompareAgainst: any, localeToCompare: any, groupName: string): string {
  let result = '';
  for(let [key, value] of Object.entries(localeToCompareAgainst)){
    if(!(key in localeToCompare)){
      result = `Key "${key}" is missing in group/locale "${groupName}"`;
      break;
    } else {
      if(typeof value === 'object'){
        let possibleMessage = compareLocales(value, localeToCompare[key], `${groupName}.${key}`);
        if(possibleMessage){
          result = possibleMessage;
          break;
        }
      }
    }
  }
  return result;
}

describe('LocaleService', () => {
  let service: LocaleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocaleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#locales should contain same keys', () => {
    const baseLocale = service.getLocale('ru');
    for(let [localeName, localeObject] of Object.entries(locales)){
      const possibleMessage = compareLocales(baseLocale, localeObject, localeName);
      if(possibleMessage){
        fail(possibleMessage);
      }
    }
  });
});
