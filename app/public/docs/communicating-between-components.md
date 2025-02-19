# Communicating between sibling components

Sometimes, you need to communicate between sibling components. For example, you have a panel that opens when a button is clicked. If another panel is already open, you want to close the other panel.

There are a few ways to do this.

2. [Use a service to communicate between components.](#using-a-service)
3. [Use a shared parent component to communicate between components.](#using-a-shared-parent-component)
1. [Use a directive to manage the state communication.](#using-a-directive)

## Using a service

> The downside of this method is that you need an extra service to manage the state communication. We can do better. See [Using a shared parent component](#using-a-shared-parent-component)

In this example, we will use a service and an observable to communicate between components, specifically a `BehaviorSubject`.

> Note: If you are using Angular 17+, you can use `signal` instead of `BehaviorSubject`.

**The Service**

```ts
@Injectable({ providedIn: 'root' })
export class PanelService {
  public panelIdOpened = new BehaviorSubject<string | null>(null);

  public openPanel(id: string) {
    this.panelIdOpened.next(id);
  }
}
```

**sibling.component.ts**

```ts
import { v4 as uuid } from 'uuid';

private panelId = uuid();

constructor(private panelService: PanelService) {}
```

**sibling.component.html**

```html
<mat-expansion-panel [expanded]="panelService.panelIdOpened.value === panelId">
  <mat-expansion-panel-header>
    <mat-panel-title>
      Panel {{ panelId }}
    </mat-panel-title>
    <button mat-button (click)="panelService.openPanel(panelId)">Open Panel</button>
  </mat-expansion-panel-header>
  <p>Content of the panel goes here.</p>
</mat-expansion-panel>
```

**parent.component.ts**

```ts
<sibling-component [panelId]="panelService.panelIdOpened"></sibling-component>
<sibling-component [panelId]="panelService.panelIdOpened"></sibling-component>
```

## Using a shared parent component

In this example, we will add a `BehaviorSubject` to the parent component and pass it down to the sibling components.

> The downside of this method is that you are now managing state in the parent to manage the sibling components. We can do better. See [Using a directive](#using-a-directive)

## Using a directive

In this example, we will use a directive to manage the state communication.

> Though this still has a problem that the html of the parent's component has to use this directive, its a LOT easier to manage because its creating the communication only when its needed, and you can reuse this in any other component.

```ts
@Directive({
  selector: '[ngxDcCommunicator]',
  exportAs: 'ngxDcCommunicator',
})
export class NgxDcCommunicatorDirective {
  public listener = new BehaviorSubject<string | null>(null);
}
```

**parent.component.ts**
Now use the `listener` property to pass it down to the sibling components.

```ts
<ng-container ngxDcCommunicator #communicator="ngxDcCommunicator">
  <sibling-component [panelId]="communicator.listener"></sibling-component>
  <sibling-component [panelId]="communicator.listener"></sibling-component>
</ng-container>
```

**sibling.component.ts**

```ts
panelId = input<string | null>(null)
```

**sibling.component.html**

```html
<mat-expansion-panel [expanded]="panelId.value === panelId">
  <mat-expansion-panel-header>
    <mat-panel-title>
      Panel {{ panelId }}
    </mat-panel-title>
    <button mat-button (click)="panelId.next(panelId)">Open Panel</button>
  </mat-expansion-panel-header>
  <p>Content of the panel goes here.</p>
</mat-expansion-panel>
```

In this end, the directive is the best way to communicate between sibling components because it is the most flexible and easiest to manage overtime.
