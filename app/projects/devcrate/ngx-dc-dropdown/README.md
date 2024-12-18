# Dropdown

NgxDcDropdown is a customizable dropdown component for Angular applications. It provides a flexible way to create dropdown menus with features like custom templates, loading states, and data source integration. If you want to use a data source, but use Material's dropdown, then use the [`ngxDcMatSelectDataSource` directive](../ngx-dc-mat-select-data-source/README.md#modal).

## Installation

```bash
npm i @devcrate/ngx-dc-dropdown
```

## Features
- Custom header templates
- Custom item templates
- Loading state handling
- Empty state handling
- Built-in integration with data sources
- Virtual scrolling support

## Basic Usage

1. Import the [`NgxDcDropdownModule`](../ngx-dc-dropdown/src/lib/dropdown.module.ts#modal) in your component:

```typescript
import { NgxDcDropdownModule } from '@devcrate/ngx-dc-dropdown';

@Component({
  // ...
  imports: [NgxDcDropdownModule]
})
export class MyComponent {
  // ...
}
```

2. Create a basic implementation:

```html
<ngx-dc-dropdown [dataSource]="dataSource">
  <!-- Header Template -->
  <ng-container *ngxDcDropdownHeader>
    <div>Custom Header</div>
  </ng-container>

  <!-- Item Template -->
  <ng-container *ngxDcDropdownItem="let item">
    <div>{{item.title}}</div>
  </ng-container>

  <!-- Loading Template -->
  <ng-container *ngxDcDropdownLoading>
    <div>Loading items...</div>
  </ng-container>

  <!-- No Items Template -->
  <ng-container *ngxDcDropdownNoItems>
    <div>No items found</div>
  </ng-container>
</ngx-dc-dropdown>
```

## API Reference

### Component Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| dataSource | NgxDcDropdownDataSource<T> | required | The data source that provides items to the dropdown |
| useVirtualScrolling | boolean | false | Enables virtual scrolling for large lists |
| itemHeight | string | null | Height of each item when using virtual scrolling |
| maxHeight | string | '300px' | Maximum height of the dropdown panel |

### Available Directives

#### NgxDcDropdownHeader
Template for the header section of the dropdown.

```html
<ng-container *ngxDcDropdownHeader>
  <div class="custom-header">
    <h3>Select an item</h3>
  </div>
</ng-container>
```

#### NgxDcDropdownItem
Template for each item in the dropdown list.

Context variables:
- `let item` - The item selected

```html
<ng-container *ngxDcDropdownItem="let item">
  <div class="item-content">{{item.title}}</div>
</ng-container>
```

#### NgxDcDropdownLoading
Template shown during loading states.

```html
<ng-container *ngxDcDropdownLoading>
  <div class="loading-state">
    <mat-spinner diameter="20"></mat-spinner>
    <span>Loading...</span>
  </div>
</ng-container>
```

#### NgxDcDropdownNoItems
Template shown when no items are available.

```html
<ng-container *ngxDcDropdownNoItems>
  No items available
</ng-container>
```

## Examples

### Basic Dropdown
```typescript
@Component({
  selector: 'basic-dropdown',
  template: `
    <ngx-dc-dropdown [dataSource]="dataSource">
      <ng-container *ngxDcDropdownItem="let item">
        {{item.title}}
      </ng-container>
    </ngx-dc-dropdown>
  `
})
export class BasicDropdownComponent {
  constructor(public dataSource: BasicDropdownDataSource) {}
}
```

### With Virtual Scrolling

1. Extend the data source to implement virtual scrolling

```typescript
export class MyInfiniteScrollDataSource extends NgxDcInfiniteSidePaneListDataSource<MyModel, MyModel, MyModel, {
  limit: number
  offset: number
  sortDir: 'asc' | 'desc'
  sortField: keyof MyModel
}> {
  public relativePath = "https://devcrate.onrender.com/api/people"
  public rowHeight: number = 80
  public pageSize = 10
  public maxTotalCount = 1000

  public isActiveItem(selectedItem: MyModel, currentItem: MyModel): boolean {
    return selectedItem.id == currentItem.id
  }

  public trackItems(item: MyModel) {
    return item.id
  }

  constructor(httpClient: HttpClient) {
    super(httpClient)
  }
}
```

2. Inject the data source into the component

```typescript
constructor(public dataSource: MyInfiniteScrollDataSource) {}
```

3. Define the ngx-dc-dropdown.
```html
<ngx-dc-dropdown 
  [dataSource]="dataSource"
  [useVirtualScrolling]="true"
>
  <!-- Templates -->
</ngx-dc-dropdown>
```


### With All Templates
```html
<ngx-dc-dropdown [dataSource]="dataSource">
  <ng-container *ngxDcDropdownHeader>
    <div class="header">
      <mat-icon>list</mat-icon>
      <span>Select Item</span>
    </div>
  </ng-container>

  <ng-container *ngxDcDropdownItem="let item">
    <div class="item">
      <mat-icon>{{item.icon}}</mat-icon>
      <span>{{item.title}}</span>
    </div>
  </ng-container>

  <ng-container *ngxDcDropdownLoading>
    <mat-progress-spinner mode="indeterminate" diameter="20">
    </mat-progress-spinner>
  </ng-container>

  <ng-container *ngxDcDropdownNoItems>
    <div class="no-items">
      <mat-icon>info</mat-icon>
      <span>No items found</span>
    </div>
  </ng-container>
</ngx-dc-dropdown>
```

## Theming

The component uses Angular Material's theming system and responds to the following CSS variables:

- `--ngx-dc-dropdown-disabled-text-color`: Controls the text color of disabled items (default: `rgba(154, 154, 154, 0.5)`)
- `--ngx-dc-dropdown-scrollbar-color`: Controls the scrollbar color using format `<thumb-color> <track-color>` (default: `darkgray transparent`) 
- `--ngx-dc-dropdown-scrollbar-width`: Controls the scrollbar width (default: `thin`)
- `--ngx-dc-dropdown-scrollbar-gutter`: Controls the scrollbar gutter behavior (default: `auto`)
- `--ngx-dc-dropdown-header-bg-color`: Controls the background color of the header section (default: `var(--sys-inverse-on-surface)`)
