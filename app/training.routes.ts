import { Routes } from "@angular/router";




export const TRAINING_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'basics',
    pathMatch: 'full',
  },
  {
    path: 'basics',
    loadComponent: () => import('./pages/angular-basics-demo/angular-basics-demo.component').then(m => m.AngularBasicsComponent),
    data: { title: "Basic Angular Training" },
  },
  {
    path: 'advanced',
    loadComponent: () => import('./pages/angular-advanced-demo/angular-advanced-demo.component').then(m => m.AngularAdvancedDemoComponent),
    data: { title: "Advanced Angular Training" },
  },
  {
    path: 'structural-directives',
    loadComponent: () => import('./pages/mat-table-demo/mat-table-demo.component').then(m => m.MatTableDemoComponent),
    data: { title: "Structural Directives" },
  }
]
