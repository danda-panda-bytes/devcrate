# Side Pane List

A flexible and customizable side pane list component for Angular applications that provides a master-detail view pattern. It consists of a left pane showing a list of items and a right pane displaying detailed content for the selected item.

## Installation

```bash
npm i @devcrate/ngx-dc-side-pane-list
```
## Features
- Two-pane layout (list and detail view)
- Collapsible left pane
- Support for infinite scrolling in the left pane
- Custom templates for items, loading states, and content
- Built-in integration with data sources. See [@devcrate/ngx-dc-data-sources](../ngx-dc-data-sources/README.md#modal) for more information.
- Global loading indicators
- Customizable item templates with icons, subtitles, and right text

## Basic Usage

1. Import `NgxDcSidePaneListModule` in your component:

```typescript
import { NgxDcSidePaneListModule } from '@devcrate/ngx-dc-side-pane-list';

@Component({
  // ...
  imports: [NgxDcSidePaneListModule]
})
```

2. Create a basic implementation:

```html
<ngx-dc-side-pane-list [dataSource]="dataSource">
  <!-- Page Info Template -->
  <ng-container *ngxDcPanePageInfo="let selectedItem; let totalCount = totalCount; let collapsed = collapsed">
    <div>Total Items: {{totalCount}}</div>
  </ng-container>

  <!-- Item Template -->
  <ng-container *ngxDcSidePaneItem="let item">
    <div>{{item.title}}</div>
  </ng-container>

  <!-- Content Template -->
  <ng-container *ngxDcPaneContent="let currentItem">
    <div>
      <h2>{{currentItem.title}}</h2>
      <p>{{currentItem.description}}</p>
    </div>
  </ng-container>
</ngx-dc-side-pane-list>
```

## API Reference

### Component Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| dataSource | NgxDcSidePaneListDataSource<T> | required | The data source that provides items to the list |
| collapsed | boolean | false | Whether the left pane is collapsed |
| useInfiniteScrolling | boolean | false | Enables infinite scrolling functionality |
| useGlobalLoader | boolean | true | Shows global loading indicator during data operations |
| useGlobalOnItem | boolean | true | Shows global loading indicator when loading item details |
| collapsible | boolean | true | Whether the left pane can be collapsed |

### Available Directives

#### NgxDcPanePageInfo
Template for the top section of the left pane. Provides context about the current state.

Context variables:
- `selectedItem: T` - Currently selected item
- `totalCount: number` - Total number of items
- `collapsed: boolean` - Current collapsed state

```html
<ng-container *ngxDcPanePageInfo="let item; let totalCount = totalCount">
  <div>Showing {{totalCount}} items</div>
</ng-container>
```

#### NgxDcSidePaneItem
Template for each item in the left pane list.

Context variables:
- `$implicit: T` - The current item
- `index: number` - Current item index

```html
<ng-container *ngxDcSidePaneItem="let item">
  <div class="item-content">{{item.title}}</div>
</ng-container>
```

#### NgxDcPaneContent
Template for the right pane content, showing details of the selected item.

Context variables:
- `$implicit: T` - The currently selected item

```html
<ng-container *ngxDcPaneContent="let item">
  <div class="item-details">
    <h2>{{item.title}}</h2>
    <p>{{item.description}}</p>
  </div>
</ng-container>
```

### Additional Directives

The component provides several additional directives for customizing item appearance:

- `*ngxDcSidePaneItemLineNumber` - Template for line numbers
- `*ngxDcSidePaneItemSubtitle` - Template for item subtitles
- `*ngxDcSidePaneItemText` - Template for main item text
- `*ngxDcSidePaneItemRightText` - Template for right-aligned text
- `*ngxDcSidePaneItemIcon` - Template for item icons
- `*ngxDcSidePaneLoadingItem` - Template for loading state
- `*ngxDcSidePaneFooter` - Template to override original behavior of the footer

## Examples

### Basic Side Pane List
```typescript
@Component({
  selector: 'basic-side-pane-list',
  template: `
    <ngx-dc-side-pane-list [dataSource]="dataSource">
      <ng-container *ngxDcSidePaneItem="let item">
        {{item.title}}
      </ng-container>
      
      <ng-container *ngxDcPaneContent="let item">
        <h2>{{item.title}}</h2>
        <p>{{item.content}}</p>
      </ng-container>
    </ngx-dc-side-pane-list>
  `
})
export class BasicSidePaneListComponent {
  constructor(public dataSource: BasicSidePaneListDataSource) {}
}
```

### With Infinite Scrolling
```html
<ngx-dc-side-pane-list 
  [dataSource]="dataSource"
  [useInfiniteScrolling]="true">
  <!-- Templates -->
</ngx-dc-side-pane-list>
```

### With Custom Item Template
```html
<ngx-dc-side-pane-list [dataSource]="dataSource">
  <ng-container *ngxDcSidePaneItem="let item">
    <ng-container *ngxDcSidePaneItemIcon>
      <mat-icon>{{item.icon}}</mat-icon>
    </ng-container>
    
    <ng-container *ngxDcSidePaneItemText>
      {{item.title}}
    </ng-container>
    
    <ng-container *ngxDcSidePaneItemSubtitle>
      {{item.subtitle}}
    </ng-container>
    
    <ng-container *ngxDcSidePaneItemRightText>
      {{item.date | date}}
    </ng-container>
  </ng-container>
  
  <!-- Content template -->
</ngx-dc-side-pane-list>
```

## Theming

The component uses Angular Material's theming system and responds to the following CSS variables:

- `--ngx-dc-side-pane-list-scrollbar-color`: Controls the scrollbar color (default: darkgray transparent)
- `--ngx-dc-side-pane-list-scrollbar-width`: Controls the scrollbar width (default: thin)
- `--ngx-dc-side-pane-list-scrollbar-gutter`: Controls the scrollbar gutter (default: auto)

