import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[ngxDcDropdownHeader]',
  standalone: true
})
export class NgxDcDropdownHeaderDirective {
  @Input('ngxDcDropdownHeaderHeight') public height: string = null

  constructor(
    public templateRef: TemplateRef<any>,
    public ViewContainerRef: ViewContainerRef,
  ) { }
}

@Directive({
  selector: '[ngxDcDropdownItem]',
  standalone: true
})
export class NgxDcDropdownItemDirective {
  @Input('ngxDcDropdownItemHeight') public height: string = null

  constructor(
    public templateRef: TemplateRef<any>,
    public ViewContainerRef: ViewContainerRef,
  ) { }
}

@Directive({
  selector: '[ngxDcDropdownNoItems]',
  standalone: true
})
export class NgxDcDropdownNoItemsDirective {
  constructor(
    public templateRef: TemplateRef<any>,
    public ViewContainerRef: ViewContainerRef,
  ) { }
}

@Directive({
  selector: '[ngxDcDropdownLoading]',
  standalone: true
})
export class NgxDcDropdownLoadingDirective {
  constructor(
    public templateRef: TemplateRef<any>,
    public ViewContainerRef: ViewContainerRef,
  ) { }
}
