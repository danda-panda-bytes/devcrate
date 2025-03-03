import { Routes } from "@angular/router";
import { provideNgxDcNavbarLinksConfig } from "@devcrate/ngx-dc-navbar";

import { COMPONENTS_LINKS, PACKAGE_LINKS, TRAINING_LINKS } from "./links";


export const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'components',
    pathMatch: 'full',
  },
  {
    path: 'components',
    loadComponent: () => import('./app.component').then(m => m.AppComponent),
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
    loadComponent: () => import('./app.component').then(m => m.AppComponent),
    providers: [provideNgxDcNavbarLinksConfig(PACKAGE_LINKS)],
    canActivate: [],
    loadChildren: () => import('./packages.routes').then(p => p.PACKAGE_ROUTES),
  },
  {
    path: 'training',
    loadComponent: () => import('./app.component').then(m => m.AppComponent),
    providers: [provideNgxDcNavbarLinksConfig(TRAINING_LINKS)],
    canActivate: [],
    loadChildren: () => import('./training.routes').then(p => p.TRAINING_ROUTES),
  },
]
