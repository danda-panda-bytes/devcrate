import { Directive, TemplateRef, ViewContainerRef, inject } from '@angular/core';

@Directive({
  selector: '[ngxDcPaneContent]',
  standalone: true
})
export class NgxDcPaneContentDirective {
  templateRef = inject<TemplateRef<any>>(TemplateRef);
  ViewContainerRef = inject(ViewContainerRef);


}
