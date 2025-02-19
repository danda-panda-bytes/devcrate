import { Directive, TemplateRef, ViewContainerRef, inject } from '@angular/core';

@Directive({
  selector: '[ngxDcPanePageInfo]',
  standalone: true
})
export class NgxDcPanePageInfoDirective {
  templateRef = inject<TemplateRef<any>>(TemplateRef);
  ViewContainerRef = inject(ViewContainerRef);
}
