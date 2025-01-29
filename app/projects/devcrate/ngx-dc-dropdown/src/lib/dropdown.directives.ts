import { Directive, Input, TemplateRef, ViewContainerRef, inject } from '@angular/core'

@Directive({
  selector: '[ngxDcDropdownHeader]',
  standalone: true
})
export class NgxDcDropdownHeaderDirective {
  templateRef = inject<TemplateRef<any>>(TemplateRef)
  ViewContainerRef = inject(ViewContainerRef)

  @Input('ngxDcDropdownHeaderHeight') public height: string = null
}

@Directive({
  selector: '[ngxDcDropdownItem]',
  standalone: true
})
export class NgxDcDropdownItemDirective {
  templateRef = inject<TemplateRef<any>>(TemplateRef)
  ViewContainerRef = inject(ViewContainerRef)

  @Input('ngxDcDropdownItemHeight') public height: string = null
}

@Directive({
  selector: '[ngxDcDropdownNoItems]',
  standalone: true
})
export class NgxDcDropdownNoItemsDirective {
  templateRef = inject<TemplateRef<any>>(TemplateRef)
  ViewContainerRef = inject(ViewContainerRef)
}

@Directive({
  selector: '[ngxDcDropdownLoading]',
  standalone: true
})
export class NgxDcDropdownLoadingDirective {
  templateRef = inject<TemplateRef<any>>(TemplateRef)
  ViewContainerRef = inject(ViewContainerRef)
}
