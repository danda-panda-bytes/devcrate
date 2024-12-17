import {Injectable, InjectionToken} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {NgxDcNavbarLinkInfo} from "./navbar.model";
import {DestroyObservable} from "@devcrate/ngx-dc-utils";

/**
 * This service is passed in through the `provideNgxDcNavbarService()` method.
 *
 * To override this default service, then do the following:
 *
 * ```typescript
 * import { Injectable } from '@angular/core'
 *
 * @Injectable()
 * export class MyCustomNavbar extends NgxDcNavbarService<string> {
 *   constructor(private userService: UserService) {}
 *
 *   public isAllowed(allowedList: string[]): boolean {
 *     return this.userService.user.roles.find(role => allowedList.includes(role.name))
 *   }
 * }
 * ```
 *
 * Once implemented, you can then provide the NgxDcNavbarService in your bootstrapApplication config in main.ts
 *
 * ```typescript
 * bootstrapApplication(RootComponent, appConfig)
 *   .catch((err) => console.error(err));
 * ```
 *
 * where the `appConfig` is defined here:
 *
 * ```typescript
 * import {ApplicationConfig} from '@angular/core';
 * import {APP_ROUTES} from './app.routes';
 * import {provideNgxDcNavbarService} from "@devcrate/ngx-dc-navbar";
 *
 * export const appConfig: ApplicationConfig = {
 *   providers: [
 *     // ...
 *     provideRouter(APP_ROUTES, withHashLocation()),
 *     // Provide the server here
 *     provideNgxDcNavbarService(MyCustomNavbar),
 *   ]
 * };
 * ```
 */
@Injectable()
export class NgxDcNavbarService<AllowedItemT = string> extends DestroyObservable {
  /**
   * Update this value to open and close the sidebar.
   *
   * To collapsed$, then do `this.navbarService.collapsed$.next(true)`
   * To open, then do `this.navbarService.collapsed$.next(false)`
   */
  public collapsed$ = new BehaviorSubject<boolean>(true);

  /**
   * Override this to hide links based on routes.
   *
   * When you define the allowedList prop in your `NgxDcNavbarLinkInfo`, this function will be called
   * with the `allowedList` when the `path` matches the user's path. (when that link is active).
   *
   * If you don't override this method, then all links will show, no matter what the allowedList shows.
   * Its up to you to implement the logic.
   *
   * @param allowedList The list of items you define in each `NgxDcNavbarLinkInfo` called `allowedList`.
   */
  public isAllowed(allowedList: AllowedItemT[]): boolean {
    return true
  }
}

/**
 * Token used to provide a custom `NgxDcNavbarService`
 */
export const NgxDcNavbarServiceToken = new InjectionToken<NgxDcNavbarService>("NAVBAR_SERVICE_TOKEN")

/**
 * Provides a custom navbar service for ngx-dc-navbar.
 *
 * @param NavbarServiceClass The Class to use when using the ngx-dc-navbar. Mainly used to collapse the navbar and define when a link/header and be shown/hidden.
 * @returns Provider that overrides the `NgxDcNavbarServiceToken`
 */
export function provideNgxDcNavbarService(NavbarServiceClass?: new (...args: any[]) => NgxDcNavbarService) {
  return {
    provide: NgxDcNavbarServiceToken,
    useClass: NavbarServiceClass || NgxDcNavbarService
  }
}

/**
 * Token used to provide a custom list of links to display in the ngx-dc-navbar
 */
export const NgxDcNavbarLinksConfig = new InjectionToken<NgxDcNavbarLinkInfo[]>("NGX_NAVBAR_LINKS_CONFIG")

/**
 * Provides custom config of links to display in the ngx-dc-navbar.
 *
 * @param links List of link info to display in the navbar.
 * @returns Provider that overrides the `NgxDcNavbarLinksConfig`
 */
export function provideNgxDcNavbarLinksConfig(links: NgxDcNavbarLinkInfo[]) {
  return {
    provide: NgxDcNavbarLinksConfig,
    useValue: links || []
  }
}
