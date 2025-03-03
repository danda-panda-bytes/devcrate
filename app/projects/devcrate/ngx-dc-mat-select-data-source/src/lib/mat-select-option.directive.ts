import { Directive, TemplateRef, ViewContainerRef, inject } from "@angular/core";


@Directive({
  selector: '[ngxDcMatSelectOption]',
  standalone: true,
})
export class NgxDcMatSelectOptionDirective {
  templateRef = inject<TemplateRef<any>>(TemplateRef);
  viewContainer = inject(ViewContainerRef);
}
