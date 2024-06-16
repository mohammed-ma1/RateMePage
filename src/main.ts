import { HttpClient, HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient } from "@angular/common/http";
import { enableProdMode, importProvidersFrom } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import { RouteReuseStrategy, provideRouter } from "@angular/router";
import { TranslateService, TranslateStore, TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { AppComponent } from "./app/app.component";
import { routes } from "./app/app.routes";
import { CustomStorageService } from "./app/services/storage.service";
import { CustomTranslateService } from "./app/services/translate.service";
import { BillereService } from "./app/pages/main/main.service";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NotificationService } from "./app/services/Notification.service";


enableProdMode();

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}



bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    TranslateService,
    TranslateStore,
    CustomStorageService,
    CustomTranslateService,
    importProvidersFrom(
      TranslateModule.forRoot({
        defaultLanguage: 'ar',
        loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient],

        }
      }),
    ),
    BillereService,
    provideRouter(routes), provideAnimationsAsync(),
    NotificationService
  ],
});
