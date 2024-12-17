import {Directive, ViewContainerRef, TemplateRef} from "@angular/core";

@Directive({
  selector: '[ngxDcFileViewerNotSupportedFile]',
  standalone: true
})
export class NgxDcFileViewerNotSupportedFileDirective {
  constructor(
    public templateRef: TemplateRef<any>,
    public viewContainerRef: ViewContainerRef,
  ) { }
}

@Directive({
  selector: '[ngxDcFileViewerError]',
  standalone: true
})
export class NgxDcFileViewerErrorDirective {
  constructor(
    public templateRef: TemplateRef<any>,
    public viewContainerRef: ViewContainerRef,
  ) { }
}
