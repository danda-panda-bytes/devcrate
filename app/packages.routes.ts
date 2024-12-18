import {Routes} from "@angular/router";
import {UtilsDemoComponent} from "./pages/utils-demo/utils-demo.component";
import {NgxDcNavbarLinkInfo} from "@devcrate/ngx-dc-navbar";
import { EslintConfigDemoComponent } from "./pages/eslint-config-demo/eslint-config-demo.component";
import { PlaywrightUtilsDemoComponent } from "./pages/playwright-utils-demo/playwright-utils-demo.component";
import { NodeUtilsDemoComponent } from "./pages/node-utils-demo/node-utils-demo.component";

export const PACKAGE_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'eslint-config',
    pathMatch: 'full',
  },
  {
    path: 'eslint-config',
    component: EslintConfigDemoComponent,
    data: { title: "ESLint Config" },
  },
  {
    path: 'playwright',
    component: PlaywrightUtilsDemoComponent,
    data: { title: "Playwright Utils" },
  },
  {
    path: 'node-utils',
    component: NodeUtilsDemoComponent,
    data: { title: "Node Utilities" },
  },
  {
    path: 'coming-soon',
    component: UtilsDemoComponent,
    data: { title: "Coming Soon" },
  },
]
