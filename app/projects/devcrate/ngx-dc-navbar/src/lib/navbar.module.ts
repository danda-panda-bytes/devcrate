import { ModuleWithProviders, NgModule } from '@angular/core';

import { NgxDcNavbarComponent } from './navbar.component';
import {
  NgxDcNavbarMainContentDirective,
  NgxDcNavbarRightTopBarContentDirective,
  NgxDcNavbarSidebarDirective, NgxDcNavbarSidebarLinksDirective
} from "./navbar.directives";
import { NgxDcNavbarLinkInfo } from "./navbar.model";
import {
  NgxDcNavbarService,
  provideNgxDcNavbarLinksConfig,
  provideNgxDcNavbarService
} from "./navbar.service";

export const IMPORTS = [
  NgxDcNavbarComponent,
  NgxDcNavbarRightTopBarContentDirective,
  NgxDcNavbarMainContentDirective,
  NgxDcNavbarSidebarDirective,
  NgxDcNavbarSidebarLinksDirective,
]

/**
 * Usage:
 *
 * ```typescript
 * @NgModule({
 *   imports: [NgxDcNavbarModule],
 * })
 * export class AppModule {}
 * ```
 *
 * If you want to handle roles in your app, then do this:
 *
 * ```typescript
 * import { Injectable } from '@angular/core'
 * import { NavbarService } from '@devcrate/ngx-dc-navbar'
 *
 * @Injectable()
 * export class MyNavbarService extends NavbarService {
 *   constructor(
 *     public router: Router,
 *     public route: ActivatedRoute,
 *     public userService: UserService
 *   ) {
 *     super()
 *     this.route = route
 *     this.router = router
 *   }
 *
 *   public isAllowed(allowedList: string[]): boolean {
 *     // This function is called whenever a route is navigated. It looks at the route, and checks if the route
 *     // is defined in your links data object. If it has `allowedRoles` array, defined, then it will call this method
 *     // with that list as the param rolesAllowed.
 *     // Implement your logic to return true or false on whether your user has these roles
 *     return allowedList.includes(userService.user.role)
 *   }
 *
 *   public ngOnDestroy() {
 *     this.onDestroy()
 *   }
 * }
 *
 * @NgModule({
 *   imports: [NgxDcNavbarModule.forRoot(MyNavbarService)],
 * })
 * export class AppModule {}
 * ```
 */
@NgModule({
  imports: IMPORTS,
  exports: IMPORTS,
})
export class NgxDcNavbarModule {
  /**
   * Use this when using lazy-loaded modules and routing modules. DO NOT USE FOR STANDALONE apps/components.
   * Only use in the root module. Not in child modules. Wherever you use RouterModule.forChild, use forChild. Same for forRoot.
   * @param links
   * @param ProvidedNavbarService
   */
  public static forRoot(links?: NgxDcNavbarLinkInfo[], ProvidedNavbarService?: new (...args: any[]) => NgxDcNavbarService): ModuleWithProviders<NgxDcNavbarModule> {
    return {
      ngModule: NgxDcNavbarModule,
      providers: [
        provideNgxDcNavbarService(ProvidedNavbarService || NgxDcNavbarService),
        provideNgxDcNavbarLinksConfig(links || []),
      ],
    };
  }

  /**
   * Use this when:
   * State Needs to Be Separate: If each lazy-loaded module should have its own NavbarService instance (for different navbar links, for instance).
   * Configuration is Unique: If you want each module to configure the NavbarService differently, especially if different routes or data properties need to be handled separately.
   */
  static forChild(links?: NgxDcNavbarLinkInfo[], ProvidedNavbarService?: new (...args: any[]) => NgxDcNavbarService): ModuleWithProviders<NgxDcNavbarModule> {
    return {
      ngModule: NgxDcNavbarModule,
      providers: [
        provideNgxDcNavbarService(ProvidedNavbarService || NgxDcNavbarService),
        provideNgxDcNavbarLinksConfig(links || []),
      ],
    };
  }
}
