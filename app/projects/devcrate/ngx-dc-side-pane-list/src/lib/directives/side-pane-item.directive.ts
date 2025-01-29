import { Directive, TemplateRef, ViewContainerRef, inject } from '@angular/core';

@Directive({
  selector: '[ngxDcSidePaneItemLineNumber]',
  standalone: true
})
export class NgxDcSidePaneItemLineNumberDirective {
  templateRef = inject<TemplateRef<any>>(TemplateRef);
  viewContainerRef = inject(ViewContainerRef);

}

@Directive({
  selector: '[ngxDcSidePaneItem]',
  standalone: true
})
export class NgxDcSidePaneItemDirective {
  templateRef = inject<TemplateRef<any>>(TemplateRef);
  viewContainerRef = inject(ViewContainerRef);

}

@Directive({
  selector: '[ngxDcSidePaneFooter]',
  standalone: true
})
export class NgxDcSidePaneFooterDirective {
  templateRef = inject<TemplateRef<any>>(TemplateRef);
  viewContainerRef = inject(ViewContainerRef);

}

@Directive({
  selector: '[ngxDcSidePaneLoadingItem]',
  standalone: true
})
export class NgxDcSidePaneLoadingItemDirective {
  templateRef = inject<TemplateRef<any>>(TemplateRef);
  viewContainerRef = inject(ViewContainerRef);

}

@Directive({
  selector: '[ngxDcSidePaneItemSubtitle]',
  standalone: true
})
export class NgxDcSidePaneItemSubtitleDirective {
  templateRef = inject<TemplateRef<any>>(TemplateRef);
  viewContainerRef = inject(ViewContainerRef);

}

@Directive({
  selector: '[ngxDcSidePaneItemText]',
  standalone: true
})
export class NgxDcSidePaneItemTextDirective {
  templateRef = inject<TemplateRef<any>>(TemplateRef);
  viewContainerRef = inject(ViewContainerRef);

}

@Directive({
  selector: '[ngxDcSidePaneItemRightText]',
  standalone: true
})
export class NgxDcSidePaneItemRightTextDirective {
  templateRef = inject<TemplateRef<any>>(TemplateRef);
  viewContainerRef = inject(ViewContainerRef);

}

@Directive({
  selector: '[ngxDcSidePaneItemIcon]',
  standalone: true
})
export class NgxDcSidePaneItemIconDirective {
  templateRef = inject<TemplateRef<any>>(TemplateRef);
  viewContainerRef = inject(ViewContainerRef);

}
