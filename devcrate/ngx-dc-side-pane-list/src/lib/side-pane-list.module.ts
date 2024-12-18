import { NgModule } from '@angular/core';

import { NgxDcSidePaneListComponent } from './side-pane-list.component';
import { NgxDcPaneContentDirective } from './directives/pane-content.directive';
import { NgxDcPanePageInfoDirective } from './directives/pane-page-info.directive';
import { NgxDcSidePaneFooterDirective, NgxDcSidePaneItemDirective, NgxDcSidePaneItemIconDirective, NgxDcSidePaneItemLineNumberDirective, NgxDcSidePaneItemRightTextDirective, NgxDcSidePaneItemSubtitleDirective, NgxDcSidePaneItemTextDirective, NgxDcSidePaneLoadingItemDirective } from './directives/side-pane-item.directive';

const imports = [
  NgxDcSidePaneListComponent,
  NgxDcPanePageInfoDirective,
  NgxDcPaneContentDirective,
  NgxDcSidePaneItemDirective,
  NgxDcSidePaneFooterDirective,
  NgxDcSidePaneItemIconDirective,
  NgxDcSidePaneItemLineNumberDirective,
  NgxDcSidePaneItemSubtitleDirective,
  NgxDcSidePaneItemRightTextDirective,
  NgxDcSidePaneItemTextDirective,
  NgxDcSidePaneLoadingItemDirective,
]

@NgModule({
  imports: [imports],
  exports: [imports],
})
export class NgxDcSidePaneListModule { }
