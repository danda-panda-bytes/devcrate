import {NgxDcNavbarLinksConfig, provideNgxDcNavbarLinksConfig} from "@devcrate/ngx-dc-navbar";
import {AppComponent} from "./app.component";
import {Routes} from "@angular/router";
import {COMPONENTS_LINKS, PACKAGE_LINKS, TRAINING_LINKS} from "./links";
import { TRAINING_ROUTES } from "./training.routes";


export const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'components',
    pathMatch: 'full',
  },
  {
    path: 'components',
    component: AppComponent,
    providers: [provideNgxDcNavbarLinksConfig(COMPONENTS_LINKS)],
    canActivate: [],
    children: [
      {
        path: '',
        loadChildren: () => import('./components.routes').then(m => m.COMPONENTS_ROUTES),
      },
    ],
  },
  {
    path: 'packages',
    component: AppComponent,
    providers: [provideNgxDcNavbarLinksConfig(PACKAGE_LINKS)],
    canActivate: [],
    loadChildren: () => import('./packages.routes').then(p => p.PACKAGE_ROUTES),
  },
  {
    path: 'training',
    component: AppComponent,
    providers: [provideNgxDcNavbarLinksConfig(TRAINING_LINKS)],
    canActivate: [],
    loadChildren: () => import('./training.routes').then(p => p.TRAINING_ROUTES),
  },
]
