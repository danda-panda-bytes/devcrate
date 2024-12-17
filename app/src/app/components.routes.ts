import { Routes } from '@angular/router';
import { DataSourcesDemoComponent } from "./pages/data-sources-demo/data-sources-demo.component";
import { DemoCardDemoComponent } from './pages/demo-card-demo/demo-card-demo.component';
import { DestroyObservableDemoComponent } from './pages/destroy-observable-demo/destroy-observable-demo.component';
import { DropdownDemoComponent } from "./pages/dropdown-demo/dropdown-demo.component";
import { FileServiceDemoComponent } from './pages/file-service-demo/file-service-demo.component';
import { FileViewerDemoComponent } from "./pages/file-viewer-demo/file-viewer-demo.component";
import {
  MatSelectDataSourceDemoComponent
} from "./pages/mat-select-data-source-demo/mat-select-data-source-demo.component";
import { MaterialStylingDemoComponent } from './pages/material-styling-demo/material-styling-demo.component';
import { ModalServiceDemoComponent } from './pages/modal-service-demo/modal-service-demo.component';
import { NavbarDemoComponent } from './pages/navbar-demo/navbar-demo.component';
import { RoleAuthorizedDemoComponent } from './pages/role-authorized-demo/role-authorized-demo.component';
import { SidePaneListDemoComponent } from "./pages/side-pane-list-demo/side-pane-list-demo.component";
import { UploadFileButtonDemoComponent } from './pages/upload-file-button-demo/upload-file-button-demo.component';
import { UtilsDemoComponent } from "./pages/utils-demo/utils-demo.component";

export const COMPONENTS_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'side-pane-list',
    pathMatch: 'full',
  },
  {
    path: 'file-viewer',
    component: FileViewerDemoComponent,
    data: { title: "File Viewer" },
  },
  {
    path: 'side-pane-list',
    component: SidePaneListDemoComponent,
    data: { title: "Side Pane List" },
  },
  {
    path: 'dropdown',
    component: DropdownDemoComponent,
    data: { title: "Dropdown" },
  },
  {
    path: 'mat-select-data-source',
    component: MatSelectDataSourceDemoComponent,
    data: { title: "Mat Select with Data Sources" },
  },
  {
    path: 'data-sources',
    component: DataSourcesDemoComponent,
    data: { title: "Data Sources" },
  },
  {
    path: 'navbar',
    component: NavbarDemoComponent,
    data: { title: "Navbar"}
  },
  {
    path: 'destroy-observable',
    component: DestroyObservableDemoComponent,
    data: { title: "Destroy Observable" },
  },
  {
    path: 'file-service',
    component: FileServiceDemoComponent,
    data: { title: "File Service" },
  },
  {
    path: 'modal-service',
    component: ModalServiceDemoComponent,
    data: { title: "Modal Service" },
  },
  {
    path: 'material-styling',
    component: MaterialStylingDemoComponent,
    data: { title: "Material Styling" },
  },
  {
    path: 'upload-file-button',
    component: UploadFileButtonDemoComponent,
    data: { title: "Upload File Button" },
  },
  {
    path: 'role-authorized',
    component: RoleAuthorizedDemoComponent,
    data: { title: "Role Authorized" },
  },
  {
    path: 'demo-card',
    component: DemoCardDemoComponent,
    data: { title: "Demo Card" },
  },
  {
    path: 'utils',
    component: UtilsDemoComponent,
    data: { title: "Utils" },
  },
]
