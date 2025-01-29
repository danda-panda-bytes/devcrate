import { Directive, HostBinding, inject, TemplateRef } from '@angular/core';

@Directive({
  selector: '[ngx-dc-demo-tabs]',
  standalone: true,
  exportAs: 'ngx-dc-demo-tabs'
})
export class NgxDcDemoTabsDirective {
  private _showCode = false
  public get showCode(): boolean {
    return this._showCode
  }
  public set showCode(c: boolean) {
    this._showCode = c
    if (this.showCode) {
      this.display = 'initial'
    } else {
      this.display = 'none'
    }
  }
  @HostBinding('class.code') private _code = true

  @HostBinding('style.display')
  private display = 'none'
}

@Directive({
  selector: '[ngxDcDemoCardExample]',
  standalone: true,
})
export class NgxDcDemoCardExampleDirective {
  templateRef = inject<TemplateRef<any>>(TemplateRef)
}

@Directive({
  selector: '[ngxDcDemoCardButtons]',
  standalone: true,
})
export class NgxDcDemoCardButtonsDirective {
  templateRef = inject<TemplateRef<any>>(TemplateRef)
}

@Directive({
  selector: '[ngxDcDemoCardSubtitle]',
  standalone: true,
})
export class NgxDcDemoCardSubtitleDirective {
  templateRef = inject<TemplateRef<any>>(TemplateRef)
}

@Directive({
  selector: '[ngxDcDemoCardTitle]',
  standalone: true,
})
export class NgxDcDemoCardTitleDirective {
  templateRef = inject<TemplateRef<any>>(TemplateRef)
}

@Directive({
  selector: '[ngxDcDemoCardExampleTitle]',
  standalone: true,
})
export class NgxDcDemoCardExampleTitleDirective {
  templateRef = inject<TemplateRef<any>>(TemplateRef);
}

