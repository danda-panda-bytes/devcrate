import { Routes } from "@angular/router";
import { AngularAdvancedDemoComponent } from "./pages/angular-advanced-demo/angular-advanced-demo.component";
import { AngularBasicsComponent } from "./pages/angular-basics-demo/angular-basics-demo.component";
import { MatTableDemoComponent } from "./pages/mat-table-demo/mat-table-demo.component";

export const TRAINING_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'basics',
    pathMatch: 'full',
  },
  {
    path: 'basics',
    component: AngularBasicsComponent,
    data: { title: "Basic Angular Training" },
  },
  {
    path: 'advanced',
    component: AngularAdvancedDemoComponent,
    data: { title: "Advanced Angular Training" },
  },
  {
    path: 'structural-directives',
    component: MatTableDemoComponent,
    data: { title: "Structural Directives" },
  }
]
