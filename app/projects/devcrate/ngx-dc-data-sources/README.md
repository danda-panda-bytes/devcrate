@devcrate/ngx-dc-data-sources
================================

# Overview

NgxDcDataSources is an Angular library that provides a robust and consistent way to manage data in your applications. It offers a collection of data source implementations that handle common data management tasks like:

- API integration and HTTP requests
- Data filtering and sorting
- Pagination and infinite scrolling
- State management
- Loading and error states

The library aims to reduce boilerplate code and provide a standardized approach to data handling across your Angular applications.

## Data Management Guide

For a comprehensive guide on data sources and best practices, see our [Data Management Guide](../../../public/docs/data-management/data-management.md#modal).

# Installation

```bash
npm i @devcrate/ngx-dc-data-sources
```

# Usage

## Retrieve data from your API

### Define your data source

```typescript
import { NgxDcApiDataSource } from '@devcrate/ngx-dc-data-sources'

@Injectable()
export class ResourcesDataSource extends NgxDcApiDataSource<Resource> {
  // GET /api/resources
  public relativePath: string = '/api/resources'
  
  // Whether to allow local filtering in the data source
  public allowLocalFilter = true

  constructor(http: HttpClient, userService: UserService) {
    super(http, userService);
    // GET /api/resources?type=random
    this.params.type = 'random'
  }
}
```

## Retrieve data with infinite scrolling

By using the [`NgxDcInfiniteScrollDataSource`](./src/lib/infinite-scroller.data-source.ts#modal) class, you can retrieve a paged list of items as you scroll.

If your using Angular Material, then you can use their [`cdkVirtualFor`](https://material.angular.io/cdk/scrolling/overview#cdkvirtualfor) structural directive.

### First, define your data source

```typescript
import {NgxDcInfiniteScrollDataSource} from '@devcrate/ngx-dc-data-sources'

export interface MyModel {
  id: number
  name: string
}

@Injectable()
export class ResourcesDataSource extends NgxDcInfiniteScrollDataSource<MyModel, MyModel> {
  // GET /api/resources
  public relativePath: string = '/api/resources'
  
  // The height of each row in the side pane
  public rowHeight: number = 80
  
  // As you scroll, grab 25 items at a time
  public pageSize: number = 25
  
  // Whether to filter the items locally, in the side pane, or not
  public allowLocalFilter = true

  public trackItems(item: MyModel) {
    if (!item) { return null }
    return item.id
  }

  public isActiveItem(selectedItem: MyModel, currentItem: MyModel): boolean {
    if (!selectedItem || !currentItem) { return false }
    return selectedItem.id == currentItem.id
  }

  public async retrieveItem(item: MyModel): Promise<MyModel> {
    if (!item) { return item }
    return firstValueFrom(this.httpClient.get<DetailedResource>(this.relativePath + '/' + item.id))
  }

  constructor(http: HttpClient) {
    super(http);
  }
}
```

### Second, Inject your data source into your component and initialize it

```typescript
import {ResourceDataSource} from './resource.data-source';

@Component({
  providers: [ResourceDataSource],
  // ...
})
export class MyComponent {
  constructor(public dataSource: ResourceDataSource) {}
  
  public async ngOnInit(): Promise<void> {
    await this.dataSource.initialize()
  }
}
```

### Third, Display your data with a virtual scroller and virtual for

```html
<cdk-virtual-scroll-viewport [itemSize]="dataSource.rowHeight" [minBufferPx]="dataSource.rowHeight * 5" [maxBufferPx]="dataSource.rowHeight * 10">
  <ng-container *cdkVirtualFor="let item of dataSource; let i = index">
    {{ item | json }}
  </ng-container>
</cdk-virtual-scroll-viewport>
```
