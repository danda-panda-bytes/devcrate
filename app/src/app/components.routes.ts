import { Routes } from '@angular/router';















export const COMPONENTS_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'side-pane-list',
    pathMatch: 'full',
  },
  {
    path: 'file-viewer',
    loadComponent: () => import('./pages/file-viewer-demo/file-viewer-demo.component').then(m => m.FileViewerDemoComponent),
    data: { title: "File Viewer" },
  },
  {
    path: 'side-pane-list',
    loadComponent: () => import('./pages/side-pane-list-demo/side-pane-list-demo.component').then(m => m.SidePaneListDemoComponent),
    data: { title: "Side Pane List" },
  },
  {
    path: 'dropdown',
    loadComponent: () => import('./pages/dropdown-demo/dropdown-demo.component').then(m => m.DropdownDemoComponent),
    data: { title: "Dropdown" },
  },
  {
    path: 'mat-select-data-source',
    loadComponent: () => import('./pages/mat-select-data-source-demo/mat-select-data-source-demo.component').then(m => m.MatSelectDataSourceDemoComponent),
    data: { title: "Mat Select with Data Sources" },
  },
  {
    path: 'data-sources',
    loadComponent: () => import('./pages/data-sources-demo/data-sources-demo.component').then(m => m.DataSourcesDemoComponent),
    data: { title: "Data Sources" },
  },
  {
    path: 'navbar',
    loadComponent: () => import('./pages/navbar-demo/navbar-demo.component').then(m => m.NavbarDemoComponent),
    data: { title: "Navbar"}
  },
  {
    path: 'destroy-observable',
    loadComponent: () => import('./pages/destroy-observable-demo/destroy-observable-demo.component').then(m => m.DestroyObservableDemoComponent),
    data: { title: "Destroy Observable" },
  },
  {
    path: 'file-service',
    loadComponent: () => import('./pages/file-service-demo/file-service-demo.component').then(m => m.FileServiceDemoComponent),
    data: { title: "File Service" },
  },
  {
    path: 'modal-service',
    loadComponent: () => import('./pages/modal-service-demo/modal-service-demo.component').then(m => m.ModalServiceDemoComponent),
    data: { title: "Modal Service" },
  },
  {
    path: 'material-styling',
    loadComponent: () => import('./pages/material-styling-demo/material-styling-demo.component').then(m => m.MaterialStylingDemoComponent),
    data: { title: "Material Styling" },
  },
  {
    path: 'upload-file-button',
    loadComponent: () => import('./pages/upload-file-button-demo/upload-file-button-demo.component').then(m => m.UploadFileButtonDemoComponent),
    data: { title: "Upload File Button" },
  },
  {
    path: 'role-authorized',
    loadComponent: () => import('./pages/role-authorized-demo/role-authorized-demo.component').then(m => m.RoleAuthorizedDemoComponent),
    data: { title: "Role Authorized" },
  },
  {
    path: 'demo-card',
    loadComponent: () => import('./pages/demo-card-demo/demo-card-demo.component').then(m => m.DemoCardDemoComponent),
    data: { title: "Demo Card" },
  },
  {
    path: 'utils',
    loadComponent: () => import('./pages/utils-demo/utils-demo.component').then(m => m.UtilsDemoComponent),
    data: { title: "Utils" },
  },
]
