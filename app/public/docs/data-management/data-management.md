# Better data management in Angular

When working with data in Angular, it's common to display that data in a table, list, grid, or other component.
This document shows how you can easily implement a data source to manage your data.
It builds upon the ideas that Angular Material shows through its MatTableDataSource class, but takes it a step further.

By the end of this document, you will have a full understanding of the data sources created in [@devcrate/data-sources](../../../projects/devcrate/ngx-dc-data-sources/README.md#modal) library.

## Use Cases

Before building this DataSource, we need to understand the use cases for it.

1. We need to get the data from an API
1. Sometimes after we get that data, we may need to get more data from the server, or transform it
1. The data is usually displayed in a grid, list, table or panels, so we want a consistent workflow for all these types of components
1. We want to display this with Angular Material, their CDK Infinite Scroller or any ngFor loop so that our retrieval of data is ALWAYS consistent
1. Instead of reinventing the wheel for every table, list or grid, lets create a reusable class that you extend whenever you need to go to the server.

# Caution

Before continuing, it is important to remember to not overcomplicate a solution. There are 3 ways to implement what you need if you just need an array that is used, or want local searching, paging or sorting:

- [Just use an observable or a promise](#dont-overcomplicate-solutions-if-needed).
- Use MatTableDataSource which already allows for sorting and filtering in a local array. See this [example](https://material.angular.io/components/table/overview#table-pagination)

## Supporting `MatTableDataSource` from an API

To quote [Advanced Data Source usage](https://material.angular.io/components/table/overview#advanced-data-sources) from Material:

> For most real-world applications, providing the table a DataSource instance will be the best way to manage data. The DataSource is meant to serve as a place to encapsulate any sorting, filtering, pagination, and data retrieval logic specific to the application.
>
> A DataSource is simply a class that has at a minimum the following methods: connect and disconnect. The connect method will be called by the table to provide an Observable that emits the data array that should be rendered. The table will call disconnect when the table is destroyed, which may be the right time to clean up any subscriptions that may have been registered in the connect method.
>
> Although Angular Material provides a ready-made table DataSource class, MatTableDataSource, you may want to create your own custom DataSource class for more complex use cases. This can be done by extending the abstract DataSource class with a custom DataSource class that then implements the connect and disconnect methods. For use cases where the custom DataSource must also inherit functionality by extending a different base class, the DataSource base class can be implemented instead (MyCustomDataSource extends SomeOtherBaseClass implements DataSource) to respect Typescript's restriction to only implement one base class.

Understanding both [`MatTableDataSource`](https://github.com/angular/components/blob/main/src/material/table/table-data-source.ts) and `DataSource`, since they both are `DataSource`. We will use `connect` and `disconnect` in our implementation.

For better understanding of the DataSource, feel free to go through this [Angular University blog post](https://blog.angular-university.io/angular-material-data-table/#breaking-down-the-design-of-an-angular-cdk-data-source).

In our case, we will have 3 different `DataSource` classes:

- `NgxDcDataSource` - `MatTableDataSource` is really nice and most of the NgxDcDataSource functionality comes from this data source. **However**, the data source is meant to be easily overridable for all your table needs. Sadly, MatTableDataSource is basic, but if you need it to locally sort, page and filter, its very good.
- `BaseApiDataSource` - This will handle all your API calls, and will add sorting, paging, filtering and searching to the API call. It extends `NgxDcDataSource`. This requires a consistent way of paging, searching, sorting and filtering.
- `BaseApiInfiniteScrollDataSource` - This allows you to use the `*cdkVirtualFor` and `cdk-virtual-scroll-viewport` for infinite scrolling

## NgxDcDataSource

We first want to implement the `DataSource` so we can use mat-table and other components in Material that supports it (including infinite scrolling too).

### Connect and Disconnect methods

This requires us to implement the `connect` and `disconnect` methods.

```typescript
export abstract class BaseApiDataSource implements DataSource {
    public data$ = new BehaviorSubject<any[]>([])

    public connect(collectionViewer: CollectionViewer): Observable<readonly any[]> {
        return this.data$.asObservable()
    }

    public disconnect(collectionViewer: CollectionViewer): void {
        this.data$.complete()
    }
}
```

The `connect` method is called when mat-table is initialized. It expects an observable to be returned. In our case, we
return the `data$` as an observable.

The `disconnect` method is called when mat-table is destroyed. In this case, we need to complete the `data$` observable so that it doesn't keep subscribing. This is important to prevent memory leaks.

### `data$` class member

For our data source, we need a way to manage the data. We will use a [BehaviorSubject](https://www.learnrxjs.io/learn-rxjs/subjects/behaviorsubject)
to manage the data for multiple reasons:

1. To work nicely with Material's `DataSource`
2. To manage the data easier through the `async` pipe when we use the data source in other places.
3. You can also extend the observable through pipes to manage local filtering.

Why use `BehaviorSubject` instead of an `Observable`. `Observable objects cannot view previously emitted values, but
`BehaviorSubject does.

For all observable-like values, we add `$` to the end of the variable name. So we have added the `data$` variable to
manage our array of data.

### Ensure typing with generics

We want to ensure typing is in place for our data, so we will use generics.

```typescript
export abstract class NgxDcDataSource<GetDataItemsT, TransformedDataItemsT = GetDataItemsT> {
    public data$ = new BehaviorSubject<TransformedDataItemsT[]>([])

    public connect(collectionViewer: CollectionViewer): Observable<readonly TransformedDataItemsT[]> {
        return this.data$.asObservable()
    }

    public disconnect(collectionViewer: CollectionViewer): void {
        this.data$.complete()
    }
}
```

Notice that we have two types `GetDataItemsT` and `TransformedDataItemsT`. This allows us to have a type for the server
data and a type for the transformed data. The end type will always be `TransformedDataItemsT`, and its default is
`GetDataItemsT` if the server data is the same as the transformed data. But its crucial to have both.

### The `initialize` method

We need a way to initialize the data when we use it in a component like so:

```typescript
@Component({..., providers: [MyDataSource]})
export class MyComponent {
    constructor(public dataSource: MyDataSource) {

    }

    public async ngOnInit() {
        await this.dataSource.initialize()
    }
}
```

This `initialize` method will:

1. Set the `loading$` to true so we can show a loading spinner when our data is loading. This will be a BehaviorSubject.
2. Initialize the data through 2 methods called within `initializeData`:
    1. `retrieveDataItems` - Get the data from the server
    2. `transformDataItems` - Transform the data if we need to
3. Set the `loading$` to false when the data is done loading to hide the loading spinner.

```typescript
  export abstract class NgxDcDataSource /* ... */ {
    public initialized = false
    public loading$ = new BehaviorSubject(false)

    public async initialize() {
        this.initialized = true
        try {
            this.loading$.next(true)
            await this.initializeData()
        } finally {
            this.loading$.next(false)
        }
    }

    public abstract retrieveDataItems(paramOverrides?: any): Promise<GetDataItemsT[]>
    public async transformDataItems(data: GetDataItemsT[]): Promise<TransformedDataItemsT[]> {
        return data
    }

    public async initializeData(): Promise<TransformedDataItemsT[]> {
        const transformedData = await this.retrieveFinalData()
        this.data$.next(transformedData)
        return transformedData
    }

    public async retrieveFinalData(paramOverrides?: any): Promise<TransformedDataItemsT[]> {
        const pagedDataItems = await this.retrieveDataItems(paramOverrides)
        return await this.transformDataItems(pagedDataItems)
    }

    // Add to disconnect method
    public disconnect(collectionViewer: CollectionViewer): void {
        // ...
        this.loading$.complete()
    }
}
```

You might notice we have multiple functions here:

1. `initializeData` - retrieves the data then sets `data$` to the results.
2. `retrieveFinalData` - retrieves the data and transforms the data.
    - You may question why we have 2 functions. The reason is that we want to separate the concerns of retrieval/transformation and setting the data. This allows us to easily override these methods in our other data sources.
3. `retrieveDataItems` - This is the method that you will implement to get the data.
4. `transformDataItems` - This is the method that you will override to transform the data if you need to.

### `reset` and `refresh` methods

Reset is meant to clean the data for the data.
Refresh is meant to get the data from the server again, and refresh the data

```typescript
export abstract class NgxDcDataSource/* ... */ {
    public reset() {
        this.data$.next([])
    }

    public async refresh(): Promise<FinalDataItemsT> {
        this.loading.next(true)
        const results = await this.initializeData()
        this.loading.next(false)
        return results
    }
}
```

### Allow local filtering

If you want to allow local filtering, we need to support a `filter$` observable and a `filteredData$` observable.

The filter$ is a string that will trigger the data to filter based on that string. The `filteredData$` will come begin
from the `data$` you already have, and continuously filter it based on the `filter$` string.

So we first initialize the filtering by listening to the `filter$` observable and then feed that, and the `data$` into
an observable called `filteredData$`.

```typescript
export abstract class NgxDcDataSource /* ... */ {
    public abstract allowLocalFilter: boolean
    public filter$ = new BehaviorSubject<string>("")
    public filteredData$: Observable<FinalDataItemsT[]>

    constructor() {
        this.initializeFiltering()
    }

    public initializeFiltering() {
        // Whenever the filter$ or data$ changes, we want to filter the data
        const dataOrFilterChanges$ = this.filter$.pipe(
            mergeWith(this.data$),
            switchMap(() => of({data: this.data$.value, filterValue: this.filter$.value}))
        )

        // Whenever the data or filter changes, filter that data and return the resulting array
        this.filteredData$ = dataOrFilterChanges$.pipe(
            switchMap(({data, filterValue}) => {
                if (!filterValue || !this.allowLocalFilter) {
                    return of(data)
                }
                // The actual filtering happens here
                return of(data.filter(item => item && this.filterPredicate(item, filterValue)))
            })
        )
    }

    /**
     * Adapted from Angular Material's MatTableDataSource but allows overriding changing each property you filter to a string so that filtering can be customized.
     * See: https://github.com/angular/components/blob/04ce4d2648004e970bc864962e6ec12e92f27698/src/material/table/table-data-source.ts#L231
     */
    protected filterPredicate(data: FinalDataItemsT, filter: string): boolean {
        // Transform the data into a lowercase string of all property values.
        const dataStr = Object.keys(data)
            .reduce((currentTerm: string, key: string) => {
                // Use an obscure Unicode character to delimit the words in the concatenated string.
                // This avoids matches where the values of two columns combined will match the user's query
                // (e.g. `Flute` and `Stop` will match `Test`). The character is intended to be something
                // that has a very low chance of being typed in by somebody in a text field. This one in
                // particular is "White up-pointing triangle with dot" from
                // https://en.wikipedia.org/wiki/List_of_Unicode_characters
                const nextValue = data[key]
                return currentTerm + this.propToString(key as keyof FinalDataItemsT, nextValue) + '◬';
            }, '')
            .toLowerCase();

        // Transform the filter by converting it to lowercase and removing whitespace.
        const transformedFilter = filter.trim().toLowerCase();

        return dataStr.indexOf(transformedFilter) != -1;
    }
}
```

### Paging and Sorting locally

If you want to page, filter and sort locally, and not worry about the API, then I suggest using the `MatTableDataSource` instead. But if you are looking for "Paging and Sorting" from an api, read on -- BaseApiDataSource

## BaseApiDataSource

This is another data source that makes it easier to get data from the server, complete with paging, sorting, filtering,
searching, and local filtering. It extends the `NgxDcDataSource`.

### The End Goal

Our end goal is to have a base api data source like this:

```typescript
export class MyDataSource extends BaseApiDataSource<MyData> {
    public relativePath = '/api/my-data'
    public allowLocalFilter = true
   
    constructor(http: HttpClient) { super(http) }
}
```

We also want the ability to change the data we get from the server.

Let's say we have a data structure from the server like this:

```typescript
export interface MyData {
    id: number
    name: string
    description: string
}
```

But our component requires the data to add an included prop like so:

```typescript
export interface MyDataView extends MyData {
    itemNo: number
}
```

This is easy, just override the `transformDataItems` method and the second generic type.

```typescript
// Add MyDataView as the second generic type
export class MyDataSource extends BaseApiDataSource<MyData, MyDataView> {
    // ...
    
    public async transformDataItems(data: MyData[]): Promise<MyData[]> {
        return data.map((item, index) => {
            return {
                ...item,
                itemNo: index + 1,
            }
        })
    }
}
```

Finally, we want to get more data from the server once we get the list of data before giving it to our table. This is
also easy!

```typescript
export class MyDataSource extends BaseApiDataSource<MyData, MyDataView> {
    // ...
    
    public async transformDataItems(data: MyData[]): Promise<MyData[]> {
        const itemNos = this.http.get<number[]>('/api/item-nos', {
            params: { ids: data.map(item => item.id) }
        })
        
        return data.map((item, index) => {
            const itemNo = itemNos[index]
            if (!itemNo) { return item }
            item.itemNo = itemNo
            return item
        })
    }
}
```

### Implementing the BaseApiDataSource

To implement this, we will do the following:

1. Extend the `NgxDcDataSource`
2. Use the `HttpClient` to get the data from the server.
3. Define a `relativePath` which will make a `GET` request to that endpoint with the same domain as the app.
4. Allow overriding a `params` object to easily add paging, sorting, and other params to the `GET` request.
5. Add another generic to allow typing to allowed params.
6. Override the `retrieveDataItems` to get the data from the server.
7. (Optional) Though it's not required, we added the ability to get the total count of the data if it's a paged amount of data.

```typescript
export abstract class ApiNgxDcDataSource<
  GetDataItemsT, FinalDataItemsT = GetDataItemsT, AllowedParamsT = any
> extends NgxDcDataSource<GetDataItemsT, FinalDataItemsT> {
   public abstract relativePath: string
   public params: Partial<AllowedParamsT> = {}

   protected constructor(protected httpClient: HttpClient) { super() }

  public getParams(params: {[key: string]: any }): {[key: string]: any } {
    return params
  }

  public getResults(response: HttpResponse<GetDataItemsT[]>): GetDataItemsT[] {
    return response.body
  }

  public async retrieveDataItems(overrideParams: any = null): Promise<PageableResult<GetDataItemsT>> {
    const response = await firstValueFrom(this.httpClient.get<GetDataItemsT[]>(this.relativePath, {
      params: this.getParams(overrideParams || this.params),
      observe: 'response',
    }))

    return this.getResults(response)
  }
}
```

Since we extend the `NgxDcDataSource`, it's really simple to make an Api version of this. Also notice that we allow the user to override `getParams` and `getResults` in case their API is implemented differently.

### Features

- Paging
- Sorting
- Filtering
- Data Selection (Coming soon)

### Paging

To enable paging and sorting, we need 2 things:

1. A way to manage paging and sorting in the UI
2. A way to update response params whenever they update.

To do this, we can use the [Paginator](https://material.angular.io/components/paginator/overview) from Material, quite like how [`MatTableDataSource`](https://github.com/angular/components/blob/main/src/material/table/table-data-source.ts) does it.

So lets first implement the paginator.

Add the following to the `BaseApiDataSource`.

Note that this ensures that it only handles paging if you set a paginator. Otherwise, no paginating is supported.

```typescript
  /**
   * Instance of the paginator component used by the table to control what page of the data is
   * displayed. Page changes emitted by the paginator will trigger an update to the
   * table's rendered data.
   *
   * Note that the data source uses the paginator's properties to calculate which page of data
   * should be displayed. If the paginator receives its properties as template inputs,
   * e.g. `[pageLength]=100` or `[pageIndex]=1`, then be sure that the paginator's view has been
   * initialized before assigning it to this data source.
   */
  get paginator(): MatPaginator | null {
    return this.paginator;
  }

  set paginator(paginator: MatPaginator | null) {
    this.paginator = paginator;
    this.updateSubscriptions()
  }

  private paginator: MatPaginator | null;

  private updateSubscriptions() {
    const pageChange: Observable<PageEvent | null | void> = this._paginator
      ? (merge(
          this._paginator.page,
          this._paginator.initialized,
        ) as Observable<PageEvent | void>)
      : observableOf(null);
    pageChange.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.params = this.getParams({
        limit: this.paginator.pageSize,
        offset: this.paginator.pageIndex * this.paginator.pageSize,
        includeCount: true,
        ...this.params,
      })

      await this.refresh()
    })
  }
```

### Sorting

We can do a simliar thing to sorting with the MatSort directive.

```typescript
  /**
   * Instance of the MatSort directive used by the table to control its sorting. Sort changes
   * emitted by the MatSort will trigger an update to the table's rendered data.
   */
  get sort(): MatSort | null {
    return this._sort;
  }

  set sort(sort: MatSort | null) {
    this._sort = sort;
    this._updateChangeSubscription();
  }

  private _sort: MatSort | null;
```

Then we need to handle paging with sorting, which means we need to merge them together in our subscription.

```typescript
  private updateSubscriptions() {
    const sortChange: Observable<Sort | null | void> = this._sort
      ? (merge(this._sort.sortChange, this._sort.initialized) as Observable<Sort | void>)
      : observableOf(null);
    
    const pageChange: Observable<PageEvent | null | void> = this._paginator
      ? (merge(
          this._paginator.page,
          this._paginator.initialized,
        ) as Observable<PageEvent | void>)
      : observableOf(null);
    
    const paginatedData = combineLatest([sortChange, pageChange]).pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.params = this.getParams({
        limit: this.paginator.pageSize,
        offset: this.paginator.pageIndex * this.paginator.pageSize,
        includeCount: true,
        sortField: sort.active,
        sortDirection: sort.direction, // 'asc' | 'desc'
        ...this.params,
      })

      await this.refresh()
    })
  }
```

### Override params on every GET Request

We have a `getParams` that allows you to override any param when a get request is called so that its easy to add your own custom paginator, sorter or pretty much any other custom feature you need to support. To do this, we added:

```typescript
  /**
   * This allows you to overrride the default behavior of the infinite scroller to set any params based on the
   * next page the scroll wants.
   * @param params
   */
  public getParams(params: {[key: string]: any }): {[key: string]: any } {
    return params
  }
```

#### Future features if requested

- Local paging and sorting -- in most cases, use `MatTableDataSource` as it has all that functionality. If there is some need, then we can add that as well.

### Final Solution

This is the end solution: [api-base.data-source.ts](../../../projects/devcrate/ngx-dc-data-sources/src/lib/api-base.data-source.ts#modal)

This is a library that can be used with @devcrate/data-sources. It is a library that can be used to manage data in a
table-like structure. See [Using these data sources in your application](#using-these-data-sources-in-your-application).

### Using these data sources in your application

- See [@devcrate/ngx-dc-data-sources](../../../projects/devcrate/ngx-dc-data-sources/README.md#modal)
- See also [@devcrate/ngx-dc-side-pane-list]('../../../projects/devcrate/ngx-dc-side-pane-list/README.md#modal)
- See also [@devcrate/ngx-dc-dropdown]('../../../projects/devcrate/ngx-dc-dropdown/README.md#modal)

## InfiniteScrollApiDataSource

This extends the BaseApiDataSource to allow the same functionality in a virtual, infinite scroller.

### Features

- Auto-paging as the user scrolls
- Performance improvements when scrolling by only showing the elements you are on and removing the elements you can't see
- Same functionality as an ApiDataSource

### Implementing the data source

See [infinite-scroller.data-source.ts](../../../projects/devcrate/ngx-dc-data-sources/src/lib/infinite-scroller.data-source.ts#modal) for full implementation.

The infinite scroll implements the following:

- The scroller works by waiting for the user to scroll. As they reach the bottom of the page, it will automatically get the next page of data.
- However, to determine this, we need to know the `rowHeight` which we require when you extend the `InfiniteScrollApiDataSource`.
- The `rowHeight` is the height of each row in the table.
- We also set a default `maxTotalCount` which is the maximum amount of data we can get from the server. The initial value is 1000, but this changes when it gets the first request from the server (which should return the total count of the data).
- We also set a default `pageSize` which is the amount of data we get from the server. The initial value is 25.
- We also have `fetchedPages` which lists all the pages we have already fetched from the server. This helps us not fetch the same page twice.

Important pieces to note:

- `connect` and `disconnect` are used heavily in the infinite scroller, required by the `DataSource` interface.
- All features in the `BaseApiDataSource` are supported in the `InfiniteScrollApiDataSource`.
- Only differences are:
  - `refresh` - This will get reset all row items, except for the current page the user is scrolling. This is helpful when you have updated server data.
  - `originalRefresh` - We have this new function for infinite scrolling. Think of this, like you are resetting everything back. It will reset the infinite scroller, but it will also reset the data source to its original state. This is helpful when you change filters or sorting, and then data will be completely new. This is using the same logic as the `refresh` in the other data sources.
  - `initialize` is no longer needed as the infinite scroller will automatically get the first page of data when the user scrolls, and will get the initial data.

## Using component-level services to manage data in a table-like structure

Services are generally singletons for the entire application, meaning that if you inject it into two different classes, it will remain the same class instance across both. However, there are many times that you may reuse the these services to manage data in the UI. For this reason, I suggest that you provide the service at a component-level.

For example, if you had a service class called `MyData`, then in the component definition that you want to use it, add it to the component definition like so:

```typescript
@Component({
    // ...
    providers: [MyData]
})
export class MyComponent {
    constructor(public myData: MyData) {}
}
```

Doing this allows you to ensure that you have a separate service that other components won't get. Its basically a singleton for that specific component, but anywhere else will have a separate instance of that service.

## Don't overcomplicate solutions if needed

```typescript
const items$ = this.http.get('/api/items')
```

then

```html
<div *ngFor="let item of items$ | async"></div>
```

OR

```typescript
const items = await firstValueFrom(this.http.get('/api/items))
```

Then

```html
<div *ngFor="let item of items"></div>
```
