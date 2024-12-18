import {NgModule} from '@angular/core';

import {NgxDcMatSelectDataSourceDirective} from './mat-select-data-source.directive';
import {NgxDcMatSelectOptionDirective} from "./mat-select-option.directive";

const IMPORTS = [NgxDcMatSelectDataSourceDirective, NgxDcMatSelectOptionDirective]
@NgModule({
  imports: IMPORTS,
  exports: IMPORTS,
  declarations: [],
  providers: [],
})
export class NgxDcMatSelectDataSourceModule {
}
