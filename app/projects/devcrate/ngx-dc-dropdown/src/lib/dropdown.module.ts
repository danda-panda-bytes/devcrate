import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxDcDropdownComponent } from './dropdown.component';
import { NgxDcDropdownHeaderDirective, NgxDcDropdownItemDirective, NgxDcDropdownLoadingDirective, NgxDcDropdownNoItemsDirective } from './dropdown.directives';

const declarations = [
  NgxDcDropdownComponent,
  NgxDcDropdownHeaderDirective,
  NgxDcDropdownItemDirective,
  NgxDcDropdownLoadingDirective,
  NgxDcDropdownNoItemsDirective,
]

@NgModule({
  imports: [
    CommonModule,
    ...declarations,
  ],
  exports: declarations,
})
export class NgxDcDropdownModule { }
