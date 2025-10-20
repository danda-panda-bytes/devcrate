# NgxDcNavbar

The `NgxDcNavbarComponent` is an Angular component designed to create a responsive and customizable navigation bar with Material Design integration like `MatList` and `MatListItem`s.

## Key Features

1. **Top Bar**:
   - Displays title and logo
   - Customizable right-side content
   - Optional background image
   - Responsive design

2. **Sidebar**:
   - Collapsible/expandable functionality
   - Role-based link visibility
   - Support for lazy-loaded routes
   - Dynamic link management

3. **Main Content Area**:
   - Flexible content display
   - Router outlet integration
   - Responsive layout

## Installation

```bash
npm i @devcrate/ngx-dc-navbar
```

## Setup

1. Import the module in your component or module:

```typescript
import { NgxDcNavbarModule } from '@devcrate/ngx-dc-navbar'

@Component({
  // ...
  imports: [NgxDcNavbarModule]
})
```

2. Add the component to your template:

```html
<ngx-dc-navbar
  [mainTitle]="'My Application'"
  [appLogo]="'assets/logo.png'"
  [topBarBackgroundImage]="'assets/top-bar-bg.jpg'"
  [collapseButtonText]="'Collapse'"
>
  <!-- Custom top bar content -->
  <ng-container *ngxDcNavbarRightTopBarContent>
    <button mat-icon-button (click)="someAction()">
      <mat-icon>settings</mat-icon>
    </button>
  </ng-container>

  <!-- Main content -->
  <ng-container *ngxDcNavbarMainContent>
    <router-outlet />
  </ng-container>
</ngx-dc-navbar>
```

## Additional Scenarios

In certain scenarios, you may want your `AppComponent` to serve as the primary component. However, in other cases, you might prefer to use different components, such as a `LoggedInLayoutComponent` for authenticated users and a `LoggedOutLayoutComponent` for unauthenticated users. If you choose this approach, you can tailor the navigation bar to suit the specific needs of each user group.

For a single type of navigation bar, whether it features dynamic or static links, it is recommended to use the `AppComponent`.

Below is an example of how to add the HTML for your navbar component:

## Component Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| mainTitle | string | '' | The main title displayed in the top bar |
| appLogo | string | null | URL path to the application logo |
| topBarBackgroundImage | string | null | URL path to the top bar background image |
| collapseButtonText | string | 'Collapse' | Text displayed on the collapse button |
| collapsed | boolean | false | Initial collapsed state of the sidebar |
| showCollapseButton | boolean | true | Whether to show the collapse button |
| sidebarWidth | string | '250px' | Width of the expanded sidebar |
| collapsedSidebarWidth | string | '65px' | Width of the collapsed sidebar |

## Content Directives

### ngxDcNavbarRightTopBarContent

Content to be displayed on the right side of the top bar.

```html
<ng-container *ngxDcNavbarRightTopBarContent>
  <!-- Your custom top bar content -->
</ng-container>
```

### ngxDcNavbarMainContent

The main content area of your application.

```html
<ng-container *ngxDcNavbarMainContent>
  <!-- Your main content -->
</ng-container>
```

## Navigation Configuration

The navbar requires a configuration for navigation links. Create a provider for `NgxDcNavbarLinksConfig` in your `app.config.ts`:

```typescript
import { provideNgxDcNavbarService } from "@devcrate/ngx-dc-navbar";

export const appConfig: ApplicationConfig = {
  providers: [
    provideNgxDcNavbarService(),
    // ... other providers
  ]
}
```

### Overriding the Navbar Configuration

The navbar service can be extended to implement custom logic for showing/hiding links based on user roles or other conditions. To create a custom navbar service:

1. Create a custom service that extends `NgxDcNavbarService`:

```typescript
import { Injectable } from '@angular/core';
import { NgxDcNavbarService } from '@devcrate/ngx-dc-navbar';

@Injectable()
export class MyCustomNavbar extends NgxDcNavbarService<string> {
  constructor(private userService: UserService) {
    super();
  }

  public isAllowed(info: NgxDcNavbarLinkInfo): boolean {
    // Implement your custom logic here
    // For example, check if user has required roles
    return this.userService.user.roles.some(role => 
      info.allowedList.includes(role.name)
    );
  }
}
```

2. Provide your custom service in your app.config.ts:

```typescript
import { ApplicationConfig } from '@angular/core';
import { provideNgxDcNavbarService } from '@devcrate/ngx-dc-navbar';

export const appConfig: ApplicationConfig = {
  providers: [
    // ... other providers
    provideNgxDcNavbarService(MyCustomNavbar),
  ]
};
```

3. Define allowed roles in your navigation links:

```typescript
export const NAV_LINKS: NgxDcNavbarLinkInfo[] = [
  {
    type: 'link',
    path: '/admin',
    title: 'Admin Dashboard',
    icon: 'admin_panel_settings',
    allowedList: ['ADMIN'] // Only users with ADMIN role can see this
  },
  {
    type: 'link',
    path: '/reports',
    title: 'Reports',
    icon: 'assessment',
    allowedList: ['ADMIN', 'ANALYST'] // Users with either role can see this
  }
];
```

The `isAllowed` method will be called whenever a route is active to determine if the current user has permission to see that link. If you don't override this method, all links will be visible by default.

You can also control the collapsed state of the navbar using the `collapsed$` BehaviorSubject:

```typescript
// To collapse the sidebar
this.navbarService.collapsed$.next(true);

// To expand the sidebar
this.navbarService.collapsed$.next(false);
```

## Styling

The component uses CSS variables for customization. Apply these variables makes it easily customizable:

```scss
  --ngx-dc-navbar-sidebar-border-width
  --ngx-dc-navbar-sidebar-background
  --ngx-dc-navbar-sidebar-active-text-color
  --ngx-dc-navbar-sidebar-text-color
  --ngx-dc-navbar-side-bar-height
  --ngx-dc-navbar-sidebar-border-color
  
  --ngx-dc-navbar-top-bar-height
  --ngx-dc-navbar-topbar-background
  --ngx-dc-navbar-topbar-text-color
  
  --ngx-dc-navbar-content-bg-color
  --ngx-dc-navbar-content-text-color

  --ngx-dc-navbar-main-content-padding
  --ngx-dc-navbar-collapse-width
  --ngx-dc-navbar-active-bg-link-color
  --ngx-dc-navbar-logo-img
  --ngx-dc-navbar-heading-bg-color
  --ngx-dc-navbar-heading-text-color
```

#### Full Example of navbar working in DevCrate

- [main.ts](../../../src/main.ts#modal)
- [app.config.ts](../../../src/app/app.config.ts#modal)
- [app.routes.ts](../../../src/app/app.routes.ts#modal)
- [app.component.ts](../../../src/app/app.component.ts#modal)
- [app.component.html](../../../src/app/app.component.html#modal)
- [app.component.scss](../../../src/app/app.component.scss#modal)
- [links.ts](../../../src/app/links.ts#modal)
