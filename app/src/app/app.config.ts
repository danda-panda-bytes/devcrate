import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter, withHashLocation} from '@angular/router';

import {APP_ROUTES} from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {HttpClient, provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {provideHighlightOptions} from "ngx-highlightjs";
import {provideNgxDcNavbarService} from "@devcrate/ngx-dc-navbar";
import {MARKED_OPTIONS, MarkedOptions, provideMarkdown} from 'ngx-markdown';
import { NgxDcModalService, provideNgxDcModalService } from '@devcrate/ngx-dc-utils';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),

    provideMarkdown({
      loader: HttpClient,
      markedOptions: {
        provide: MARKED_OPTIONS,
        useValue: <MarkedOptions>{
          gfm: true,
          breaks: true,
          pedantic: false,
        },
      },
    }),
    provideNgxDcNavbarService(),
    NgxDcModalService,
    provideNgxDcModalService(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimationsAsync(),
    provideRouter(APP_ROUTES, withHashLocation()),
    provideHighlightOptions({
      fullLibraryLoader: () => import('highlight.js')
    }),
  ]
};
