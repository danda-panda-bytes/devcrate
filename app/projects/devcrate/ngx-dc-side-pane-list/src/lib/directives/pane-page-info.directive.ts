import {Directive, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[ngxDcPanePageInfo]',
  standalone: true
})
export class NgxDcPanePageInfoDirective {

  constructor(
    public templateRef: TemplateRef<any>,
    public ViewContainerRef: ViewContainerRef,
  ) {}

}
