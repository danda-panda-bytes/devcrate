# NgxDcMatSelectDataSource

A directive that allows you to use data sources with Angular Material's [`mat-select`](https://material.angular.io/components/select/overview) component. This provides a consistent way to handle data loading, selection, and templating when working with APIs and [`mat-select`](https://material.angular.io/components/select/overview) dropdowns.

## Installation

```bash
npm i @devcrate/ngx-dc-mat-select-data-source
```

## Features
- Data source integration with [`mat-select`](https://material.angular.io/components/select/overview)
- Custom templating for options
- Automatic handling of selection state
- Support for any data source that extends [`NgxDcDropdownDataSource`](../ngx-dc-dropdown/README.md#modal)
- Built-in loading states

## Basic Usage

1. Import [`NgxDcMatSelectDataSourceModule`](../ngx-dc-mat-select-data-source/src/lib/mat-select-data-source.module.ts#modal) in your component:

    ```typescript
    import { NgxDcMatSelectDataSourceModule } from '@devcrate/ngx-dc-mat-select-data-source';

    @Component({
      // ...
      imports: [NgxDcMatSelectDataSourceModule]
    })
    ```

2. Create a data source that extends [`NgxDcDropdownDataSource`](../ngx-dc-dropdown/README.md#modal):

    ```typescript
    @Injectable()
    export class BasicSelectDataSource extends NgxDcDropdownApiDataSource<BasicModel> {
      public relativePath = "https://api.example.com/items"
      public rowHeight = 48

      public isActiveItem(selectedItem: BasicModel, currentItem: BasicModel): boolean {
        return selectedItem.id === currentItem.id
      }

      public trackItems(item: BasicModel) {
        return item.id
      }

      constructor(httpClient: HttpClient) {
        super(httpClient)
      }
    }
    ```

3. Create a basic implementation:

    ```html
    <mat-form-field appearance="outline">
      <mat-label>Select an option</mat-label>
      <mat-select [ngxDcMatSelectDataSource]="dataSource">
        <mat-select-trigger>{{ dataSource?.selectedItem?.value?.name || 'No item selected' }}</mat-select-trigger>
        <ng-container *ngxDcMatSelectOption="let item">
          <mat-option [value]="item">{{ item.name }}</mat-option>
        </ng-container>
      </mat-select>
    </mat-form-field>
    ```

## API Reference

### Directives

#### NgxDcMatSelectDataSourceDirective
The main directive that connects a data source to a mat-select element.

| Input | Type | Description |
|-------|------|-------------|
| ngxDcMatSelectDataSource | NgxDcDropdownDataSource<T> | The data source that provides items to the select |

#### NgxDcMatSelectOptionDirective
Template directive for defining how each option should be rendered.

```html
<ng-container *ngxDcMatSelectOption="let item">
  <mat-option [value]="item">{{ item.name }}</mat-option>
</ng-container>
```

## Examples

### Basic Select with Data Source

```typescript
@Component({
  selector: 'basic-select',
  template: `
    <mat-form-field appearance="outline">
      <mat-label>Select an option</mat-label>
      <mat-select [ngxDcMatSelectDataSource]="dataSource">
        <mat-select-trigger>
          {{ dataSource?.selectedItem?.value?.name || 'No item selected' }}
        </mat-select-trigger>
        <ng-container *ngxDcMatSelectOption="let item">
          <mat-option [value]="item">{{ item.name }}</mat-option>
        </ng-container>
      </mat-select>
    </mat-form-field>
  `,
  providers: [BasicSelectDataSource]
})
export class BasicSelectComponent implements OnInit {
  constructor(public dataSource: BasicSelectDataSource) {}

  async ngOnInit() {
    await this.dataSource.initialize()
  }
}
```

### With Custom Option Template

```html
<mat-form-field appearance="outline">
  <mat-label>Select an option</mat-label>
  <mat-select [ngxDcMatSelectDataSource]="dataSource">
    <mat-select-trigger>
      <mat-icon>{{ dataSource?.selectedItem?.value?.icon }}</mat-icon>
      {{ dataSource?.selectedItem?.value?.name }}
    </mat-select-trigger>
    <ng-container *ngxDcMatSelectOption="let item">
      <mat-option [value]="item">
        <mat-icon>{{ item.icon }}</mat-icon>
        <span>{{ item.name }}</span>
        <small>{{ item.description }}</small>
      </mat-option>
    </ng-container>
  </mat-select>
</mat-form-field>
```

## Related Libraries
- If you need a customizable dropdown instead of mat-select, check out [@devcrate/ngx-dc-dropdown](../ngx-dc-dropdown/README.md#modal)
- For data source implementations and utilities, see [@devcrate/ngx-dc-data-sources](../ngx-dc-data-sources/README.md#modal)
