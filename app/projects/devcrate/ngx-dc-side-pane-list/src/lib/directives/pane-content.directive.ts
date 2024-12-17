import {Directive, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[ngxDcPaneContent]',
  standalone: true
})
export class NgxDcPaneContentDirective {
  constructor(
    public templateRef: TemplateRef<any>,
    public ViewContainerRef: ViewContainerRef,
  ) {}

}
