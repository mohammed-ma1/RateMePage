import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Language } from './language.model';
import { StorageKey } from '../models/storage-key.model';
import { CustomStorageService } from './storage.service';


@Injectable({
  providedIn: 'root'
})
export class CustomTranslateService {

  public _currentLanguage: Language = Language.Arabic;
  public globalDectionary: any = {
    networkLabel: "networkLabel",

  };


  constructor(private translate: TranslateService ,private storageService:CustomStorageService) {
    translate.setDefaultLang('ar');
    translate.use('ar');
  }
  public initService(): void {
    this.translate.currentLang = this.storageService.get(StorageKey.Language);
    if (!this.translate.currentLang) this.translate.currentLang = Language.Arabic;
    this.translate.setDefaultLang(this.translate.currentLang)
  }
  
  changeLanguage(lang: string) {
    this.translate.use(lang); 
    let isEnglishLang: string = lang === 'en' ? 'ltr' : 'rtl';
    document.getElementsByTagName('html')[0].setAttribute('dir', isEnglishLang);
    document.getElementsByTagName('html')[0].setAttribute('lang', lang);
    this.translate.setDefaultLang(lang)
  }

  public isAr(): boolean {
    return Language.Arabic === this.translate.currentLang;
  }

}
