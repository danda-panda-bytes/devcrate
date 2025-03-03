import { Directive, TemplateRef, ViewContainerRef, inject } from "@angular/core";

@Directive({
  selector: '[ngxDcNavbarRightTopBarContent]',
  standalone: true
})
export class NgxDcNavbarRightTopBarContentDirective {
  templateRef = inject<TemplateRef<any>>(TemplateRef);
  viewContainerRef = inject(ViewContainerRef);

}

@Directive({
  selector: '[ngxDcNavbarLeftTopBarContent]',
  standalone: true
})
export class NgxDcNavbarLeftTopBarContentDirective {
  templateRef = inject<TemplateRef<any>>(TemplateRef);
  viewContainerRef = inject(ViewContainerRef);

}


@Directive({
  selector: '[ngxDcNavbarMainContent]',
  standalone: true
})
export class NgxDcNavbarMainContentDirective {
  templateRef = inject<TemplateRef<any>>(TemplateRef);
  viewContainerRef = inject(ViewContainerRef);

}


@Directive({
  selector: '[ngxDcNavbarSidebarLinks]',
  standalone: true
})
export class NgxDcNavbarSidebarLinksDirective {
  templateRef = inject<TemplateRef<any>>(TemplateRef);
  viewContainerRef = inject(ViewContainerRef);

}

@Directive({
  selector: '[ngxDcNavbarSidebar]',
  standalone: true
})
export class NgxDcNavbarSidebarDirective {
  templateRef = inject<TemplateRef<any>>(TemplateRef);
  viewContainerRef = inject(ViewContainerRef);

}
