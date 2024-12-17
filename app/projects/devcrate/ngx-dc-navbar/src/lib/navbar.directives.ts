import {Directive, TemplateRef, ViewContainerRef} from "@angular/core";

@Directive({
  selector: '[ngxDcNavbarRightTopBarContent]',
  standalone: true
})
export class NgxDcNavbarRightTopBarContentDirective {
  constructor(
    public templateRef: TemplateRef<any>,
    public viewContainerRef: ViewContainerRef,
  ) {}
}


@Directive({
  selector: '[ngxDcNavbarMainContent]',
  standalone: true
})
export class NgxDcNavbarMainContentDirective {
  constructor(
    public templateRef: TemplateRef<any>,
    public viewContainerRef: ViewContainerRef,
  ) {}
}


@Directive({
  selector: '[ngxDcNavbarSidebarLinks]',
  standalone: true
})
export class NgxDcNavbarSidebarLinksDirective {
  constructor(
    public templateRef: TemplateRef<any>,
    public viewContainerRef: ViewContainerRef,
  ) {}
}

@Directive({
  selector: '[ngxDcNavbarSidebar]',
  standalone: true
})
export class NgxDcNavbarSidebarDirective {
  constructor(
    public templateRef: TemplateRef<any>,
    public viewContainerRef: ViewContainerRef,
  ) {}
}
