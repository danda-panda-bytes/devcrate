import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[ngxDcSidePaneItemLineNumber]',
  standalone: true
})
export class NgxDcSidePaneItemLineNumberDirective {
  constructor(
    public templateRef: TemplateRef<any>,
    public viewContainerRef: ViewContainerRef,
  ) {}
}

@Directive({
  selector: '[ngxDcSidePaneItem]',
  standalone: true
})
export class NgxDcSidePaneItemDirective {
  constructor(
    public templateRef: TemplateRef<any>,
    public viewContainerRef: ViewContainerRef,
  ) {}
}

@Directive({
  selector: '[ngxDcSidePaneFooter]',
  standalone: true
})
export class NgxDcSidePaneFooterDirective {
  constructor(
    public templateRef: TemplateRef<any>,
    public viewContainerRef: ViewContainerRef,
  ) {}
}

@Directive({
  selector: '[ngxDcSidePaneLoadingItem]',
  standalone: true
})
export class NgxDcSidePaneLoadingItemDirective {
  constructor(
    public templateRef: TemplateRef<any>,
    public viewContainerRef: ViewContainerRef,
  ) {}
}

@Directive({
  selector: '[ngxDcSidePaneItemSubtitle]',
  standalone: true
})
export class NgxDcSidePaneItemSubtitleDirective {
  constructor(
    public templateRef: TemplateRef<any>,
    public viewContainerRef: ViewContainerRef,
  ) {}
}

@Directive({
  selector: '[ngxDcSidePaneItemText]',
  standalone: true
})
export class NgxDcSidePaneItemTextDirective {
  constructor(
    public templateRef: TemplateRef<any>,
    public viewContainerRef: ViewContainerRef,
  ) {}
}

@Directive({
  selector: '[ngxDcSidePaneItemRightText]',
  standalone: true
})
export class NgxDcSidePaneItemRightTextDirective {
  constructor(
    public templateRef: TemplateRef<any>,
    public viewContainerRef: ViewContainerRef,
  ) {}
}

@Directive({
  selector: '[ngxDcSidePaneItemIcon]',
  standalone: true
})
export class NgxDcSidePaneItemIconDirective {
  constructor(
    public templateRef: TemplateRef<any>,
    public viewContainerRef: ViewContainerRef,
  ) {}
}
