import {Injectable} from '@angular/core';
import ISO6391 from 'iso-639-1'

interface Language {
  englishName: string;
  nativeName: string;
  code: string;
}

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  static allLanguages: Language[];

  constructor() {

  }

  getAllLanguages(): Language[] {
    if (!LanguageService.allLanguages) {
      LanguageService.allLanguages = ISO6391.getAllCodes().map(code => {
        return {
          englishName: ISO6391.getName(code),
          nativeName: ISO6391.getNativeName(code),
          code: code
        }
      }).sort((a, b) => {
        return a.englishName.localeCompare(b.englishName)
      })
    }
    return LanguageService.allLanguages;
  }
}
