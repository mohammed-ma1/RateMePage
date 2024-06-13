import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, HttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { RouterModule, Routes } from '@angular/router';
import 'zone.js';
import { AppComponent } from './app/app.component';
import { ChttpService } from './app/services/chttp.service';
import { MainComponent } from './app/pages/main/main.component';
import { BillereService } from './app/pages/main/main.service';

// Define your routes
const routes: Routes = [
  { path: 'home/:id', component: MainComponent },
];

// Factory function for the translation loader
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

// Bootstrap the application
bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    importProvidersFrom(
      RouterModule.forRoot(routes), // Include routing configuration
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      }),
    ),
    provideAnimations(),
    BillereService
  ],
});
