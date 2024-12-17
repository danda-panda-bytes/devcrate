# Role Authorized Directive Documentation

The `RoleAuthorizedDirective` is an Angular directive that conditionally displays elements based on user roles. It provides a simple way to manage role-based access control in your Angular templates.

## Key Features

- **Role-Based Access Control**: Show or hide elements based on user roles.
- **Easy Integration**: Use a simple directive syntax to apply role checks.

## Installation

To use `RoleAuthorizedDirective`, install the `ngx-dc-utils` package, run the following command:

```bash
npm i @devcrate/ngx-dc-utils
```

## Usage

### Importing the Directive

To use the `RoleAuthorizedDirective`, import it into your component or module:

```typescript
import { RoleAuthorizedDirective } from '@devcrate/ngx-dc-utils';

@NgModule({
  declarations: [
    // ...
    RoleAuthorizedDirective,
  ],
})
export class AppModule { }
```

### Applying the Directive

Use the `ngxDcRolesAuthorized` directive in your templates to conditionally display elements based on roles:

```html
<div *ngxDcRolesAuthorized="['Admin']">
  This content is only visible to users with the Admin role.
</div>
```

### Providing a Custom Roles Service

The directive uses a `RolesService` to determine if a user has the required roles. You can provide a custom implementation of this service:

```typescript
import { Injectable } from '@angular/core';
import { RolesService } from '@devcrate/ngx-dc-utils';

@Injectable()
export class CustomRolesService extends RolesService {
  public hasRole(rolesAllowed: string[]): boolean {
    // Implement your custom role-checking logic here
    return rolesAllowed.includes('Admin'); // Example logic
  }
}
```

Provide your custom service in your module:

```typescript
import { NgModule } from '@angular/core';
import { RolesServiceToken } from '@devcrate/ngx-dc-utils';

@NgModule({
  providers: [
    { provide: RolesServiceToken, useClass: CustomRolesService },
  ],
})
export class AppModule { }
```

## Example

Here's a simple example of using the `RoleAuthorizedDirective` in a component:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-example',
  template: `
    <div *ngxDcRolesAuthorized="['Admin']">
      Admin-only content
    </div>
  `,
})
export class ExampleComponent { }
```

This documentation provides an overview of the `RoleAuthorizedDirective` and how to use it effectively in your Angular application. Let me know if you need further details or examples!
