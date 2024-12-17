import {Directive, Input, TemplateRef, ViewContainerRef} from "@angular/core";


@Directive({
  selector: '[ngxDcMatSelectOption]',
  standalone: true,
})
export class NgxDcMatSelectOptionDirective {
  constructor(public templateRef: TemplateRef<any>, public viewContainer: ViewContainerRef) {}
}
