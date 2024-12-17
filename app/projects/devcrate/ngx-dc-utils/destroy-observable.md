# Destroy Observable

The `destroyObservable` utility is designed to help manage subscriptions in Angular components, ensuring that they are properly cleaned up when the component is destroyed. This is particularly useful in preventing memory leaks in applications that utilize Observables extensively.

## Key Features

- **Automatic Cleanup**: Automatically unsubscribes from Observables when the component is destroyed.
- **Easy Integration**: Simple to implement in any Angular component.

## Installation

To use `destroyObservable`, install the `ngx-dc-utils` package, run the following command:

```bash
npm i @devcrate/ngx-dc-utils
```

## Usage

```typescript
import { DestroyObservable } from '@devcrate/ngx-dc-utils'

@Component({
  // ...
})
export class MyComponent implements DestroyObservable {
  constructor() { super() }

  ngOnDestroy() {
    // Call the destroy method to unsubscribe from all subscriptions
    this.destroy()
  }

  ngOnInit() {
    // Automatically unsubscribes from the observable when the component is destroyed
    this.myObservable.pipe(takeUntil(this.destroy$)).subscribe(console.log)
  }
}
```
