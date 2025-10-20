import { Directive, TemplateRef, ViewContainerRef, inject, input } from '@angular/core'

@Directive({
  selector: '[ngxDcDropdownHeader]',
  standalone: true
})
export class NgxDcDropdownHeaderDirective {
  templateRef = inject<TemplateRef<any>>(TemplateRef)
  ViewContainerRef = inject(ViewContainerRef)

  public readonly height = input<string>(null, { alias: "ngxDcDropdownHeaderHeight" });
}

@Directive({
  selector: '[ngxDcDropdownOptionsHeader]',
  standalone: true
})
export class NgxDcDropdownOptionsHeaderDirective {
  templateRef = inject<TemplateRef<any>>(TemplateRef)
  ViewContainerRef = inject(ViewContainerRef)
}

@Directive({
  selector: '[ngxDcDropdownItem]',
  standalone: true
})
export class NgxDcDropdownItemDirective {
  templateRef = inject<TemplateRef<any>>(TemplateRef)
  ViewContainerRef = inject(ViewContainerRef)

  public readonly height = input<string>(null, { alias: "ngxDcDropdownItemHeight" });
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
