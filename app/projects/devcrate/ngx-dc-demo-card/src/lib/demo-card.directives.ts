import {
  Directive,
  TemplateRef,
  Input,
  ViewContainerRef, OnInit, ElementRef, HostBinding
} from '@angular/core';

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
  constructor(public templateRef: TemplateRef<any>) {}
}

@Directive({
  selector: '[ngxDcDemoCardButtons]',
  standalone: true,
})
export class NgxDcDemoCardButtonsDirective {
  constructor(public templateRef: TemplateRef<any>) {}
}

@Directive({
  selector: '[ngxDcDemoCardSubtitle]',
  standalone: true,
})
export class NgxDcDemoCardSubtitleDirective {
  constructor(public templateRef: TemplateRef<any>) {}
}

@Directive({
  selector: '[ngxDcDemoCardTitle]',
  standalone: true,
})
export class NgxDcDemoCardTitleDirective {
  constructor(public templateRef: TemplateRef<any>) {}
}

@Directive({
  selector: '[ngxDcDemoCardExampleTitle]',
  standalone: true,
})
export class NgxDcDemoCardExampleTitleDirective {
  constructor(public templateRef: TemplateRef<any>) {}
}

