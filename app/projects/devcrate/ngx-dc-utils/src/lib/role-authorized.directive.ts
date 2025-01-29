import { Directive, InjectionToken, OnChanges, OnInit, TemplateRef, ViewContainerRef, inject, input } from '@angular/core'

export class NgxDcRolesService {
  public hasRole(rolesAllowed: string[]): boolean {
    return true
  }
}

export const NgxDcRolesServiceToken = new InjectionToken<NgxDcRolesService>("NgxDcRolesServiceToken")

/**
 * Usage: <div *ngxDcRolesAuthorized="['Admin']"></div>
 * Only the admin role will see the div.
 */
@Directive({
  selector: '[ngxDcRolesAuthorized]',
  standalone: true,
})
export class NgxDcRoleAuthorizedDirective implements OnInit, OnChanges {
  private templateRef = inject<TemplateRef<any>>(TemplateRef);
  private viewContainerRef = inject(ViewContainerRef);
  private rolesService = inject<NgxDcRolesService>(NgxDcRolesServiceToken);

  public readonly ngxDcRolesAuthorized = input<string[]>();
  private hasView = false

  public ngOnInit() {
    this.configureView()
  }

  public ngOnChanges() {
    this.configureView()
  }

  public configureView(): void {
    const roleAuthorized = this.rolesService.hasRole(this.ngxDcRolesAuthorized())
    if (roleAuthorized && !this.hasView) {
      this.viewContainerRef.createEmbeddedView(this.templateRef)
      this.hasView = true
    } else if (!roleAuthorized && this.hasView) {
      this.viewContainerRef.clear()
      this.hasView = false
    }
  }
}
