import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxDcDropdownComponent } from './dropdown.component';
import { NgxDcDropdownHeaderDirective, NgxDcDropdownItemDirective, NgxDcDropdownLoadingDirective, NgxDcDropdownNoItemsDirective, NgxDcDropdownOptionsHeaderDirective } from './dropdown.directives';

const declarations = [
  NgxDcDropdownComponent,
  NgxDcDropdownHeaderDirective,
  NgxDcDropdownOptionsHeaderDirective,
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
