import {Routes} from "@angular/router";

import {NgxDcNavbarLinkInfo} from "@devcrate/ngx-dc-navbar";




export const PACKAGE_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'eslint-config',
    pathMatch: 'full',
  },
  {
    path: 'eslint-config',
    loadComponent: () => import('./pages/eslint-config-demo/eslint-config-demo.component').then(m => m.EslintConfigDemoComponent),
    data: { title: "ESLint Config" },
  },
  {
    path: 'playwright',
    loadComponent: () => import('./pages/playwright-utils-demo/playwright-utils-demo.component').then(m => m.PlaywrightUtilsDemoComponent),
    data: { title: "Playwright Utils" },
  },
  {
    path: 'node-utils',
    loadComponent: () => import('./pages/node-utils-demo/node-utils-demo.component').then(m => m.NodeUtilsDemoComponent),
    data: { title: "Node Utilities" },
  },
  {
    path: 'coming-soon',
    loadComponent: () => import('./pages/utils-demo/utils-demo.component').then(m => m.UtilsDemoComponent),
    data: { title: "Coming Soon" },
  },
]
