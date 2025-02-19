import { Directive, ViewContainerRef, TemplateRef, inject } from "@angular/core";

@Directive({
  selector: '[ngxDcFileViewerNotSupportedFile]',
  standalone: true
})
export class NgxDcFileViewerNotSupportedFileDirective {
  public templateRef = inject<TemplateRef<any>>(TemplateRef)
  public viewContainerRef = inject(ViewContainerRef)
}

@Directive({
  selector: '[ngxDcFileViewerError]',
  standalone: true
})
export class NgxDcFileViewerErrorDirective {
  public templateRef = inject<TemplateRef<any>>(TemplateRef)
  public viewContainerRef = inject(ViewContainerRef)
}
