import {Route} from "@angular/router";

/**
 * Information needed to provide links in the `ngx-dc-navbar` component.
 *
 * @example
 *
 * ```typescript
 *
 * export const SETTING_LINKS = [
 *   {
 *     type: 'heading',
 *     title: 'Settings',
 *   },
 *   {
 *     type: 'link',
 *     path: "/admin/settings",
 *     title: "Admin Settings",
 *     icon: "manage_accounts",
 *     hasDivider: false,
 *     rolesAllowed: ['Admin'],
 *   },
 *   {
 *     type: 'link',
 *     path: "/receiving/pending-chemtrack",
 *     title: "User Settings",
 *     icon: "manage_accounts",
 *     rolesAllowed: ['Basic']
 *     hasDivider: false,
 *   },
 * ]
 * ```
 */

export interface NgxDcNavbarLinkInfo<AllowedItemT = string> {
  /**
   * Defines either a link `'header'` to organize the routes, or a `'link'
   */
  type: 'link' | 'heading'
  /**
   * The relative url path to that link. This can be another link to another url not within the app too.
   */
  path?: string
  /**
   * Name of the link or header
   */
  title: string

  /**
   * The icon to display for the link. This can either be an icon defined in [Material Icons](https://fonts.google.com/icons?selected=Material+Icons+Outlined:autorenew:&icon.query=progress&icon.size=24&icon.color=%23e8eaed&icon.set=Material+Icons) or [Material's Symbols](https://fonts.google.com/icons?selected=Material+Icons+Outlined:autorenew:FILL@0;wght@0;GRAD@0;opsz@NaN&icon.size=24&icon.color=%23e8eaed&icon.set=Material+Symbols). This is determined whether you kept the default (Material Icons) or set your icons to Material Symbols.
   *
   * This supports both svg and non-svg icons.
   *
   * If you use an svg icon that you have added to your iconset, then prefix the icon with `svg:`.
   *
   * This is an example showing different types of icons with svg and non-svg icons:
   *
   * ```typescript
   * {
   *   type: 'link',
   *   path: "/admin/settings",
   *   title: "Admin Settings",
   *
   *   // Custom svg font
   *   icon: "svg:my_custom_1",
   *
   *   children: [],
   *   hasDivider: false,
   *   rolesAllowed: ['Admin'],
   * },
   * {
   *   type: 'link',
   *   path: "/receiving/pending-chemtrack",
   *   title: "User Settings",
   *
   *   // Non-SVG icon found in Material's standard symbols
   *   icon: "manage_accounts",
   *
   *   children: [],
   *   hasDivider: false,
   * },
   * ```
   *
   * Note: to add svg icons to the mat-icon list, do the following:
   *
   * ```typescript
   * constructor(
   *   private matIconRegistry: MatIconRegistry,
   *   private domSanitizer: DomSanitizer,
   * ) {
   *   // If you want to use [Material's Symbols](https://fonts.google.com/icons?selected=Material+Icons+Outlined:autorenew:FILL@0;wght@0;GRAD@0;opsz@NaN&icon.size=24&icon.color=%23e8eaed&icon.set=Material+Symbols) instead of the old material icons, then set that as the default font set.
   *   this.matIconRegistry.setDefaultFontSetClass('material-symbols-outlined');
   *
   *   // Add custom svg icons to use
   *   this.matIconRegistry.addSvgIcon("my_custom_1", this.domSanitizer.bypassSecurityTrustResourceUrl("assets/icons/my_custom_1.svg"))
   *   this.matIconRegistry.addSvgIcon("my_custom_2", this.domSanitizer.bypassSecurityTrustResourceUrl("assets/icons/my_custom_2.svg"))
   *   this.matIconRegistry.addSvgIcon("my_custom_3", this.domSanitizer.bypassSecurityTrustResourceUrl("assets/icons/my_custom_3.svg"))
   * }
   * ```
   */
  icon?: string

  /**
   * TODO: Coming soon - At some point, we will want collapsible headings with child links
   */
  children?: NgxDcNavbarLinkInfo<AllowedItemT>[]

  /**
   * Whether to put a divider below this link/header
   */
  hasDivider?: boolean

  /**
   * This is meant to show/hide links/headers based on this list. In most cases, this will be allowed roles that can see this.
   *
   * If you don't define this prop, then it will always show the link. If you show this, it will call the function in the
   * `NgxDcNavbarService` class called `isAllowed` with this `allowedList` when the `path` matches.
   *
   * It is up to you to provide a different [`NgxDcNavbarService`](./navbar.service.ts) if you want to handle `allowedList`
   */
  allowedList?: AllowedItemT[]
}
