# Structural Directives

## Basic Usage of Structural Directives

Before going advanced, learn about structural directives. They are the stepping stone to creating beautiful, customizable components that end up speeding up your development game.

- [Angular's Docs about structural directives](https://angular.dev/guide/directives/structural-directives)

## Advanced Structural Directives by reconstructing the Angular Material Table

> In this section, we will be reconstructing the Angular Material Table to learn how structural directives work and see how they can be used to create powerful components.

Using multiple structural directives to manage multiple templates can get complex, but in the end, they have basic principles.

Lets take the Material table and implement it from scratch.

```html
<table mat-table [dataSource]="dataSource" class="mat-elevation-z8">
  <!-- Define the header and cell rows -->
  <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
  <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>

  <!-- Position Column -->
  <ng-container matColumnDef="position">
    <th mat-header-cell *matHeaderCellDef> No. </th>
    <td mat-cell *matCellDef="let element"> {{element.position}} </td>
  </ng-container>

  <!-- Name Column -->
  <ng-container matColumnDef="name">
    <th mat-header-cell *matHeaderCellDef> Name </th>
    <td mat-cell *matCellDef="let element"> {{element.name}} </td>
  </ng-container>
</table>
```

In this, we have a directive that manages everything: `mat-table`.
Then we have the following helper directives:

- `mat-header-row`, `mat-row`, and `mat-footer-row`
  - These are used to help us define which rows are headers and which rows are for non-headers.

- `matHeaderRowDef`, `matRowDef` and `matFooterRowDef` which are structural directives that asks for columns
  - Each of these definition directives will manage the columns it renders.
    - This is helpful because footer rows may span multiple columns. See [Footer Rows](https://material.angular.io/components/table/overview#footer-row) to learn more.

- `mat-header-cell`, `mat-cell` and `mat-footer-cell`
  - Tables generally define a column by its header and its cell, but sometimes your table may not have a header. In this case, you just don't define the mat-header-row tr element.
  - mat-header-cell is just defining the header of one column defined in `matHeaderCellDef`
  - mat-cell is just defining one cell on a certain row of one column defined in `matCellDef`
  - mat-footer-cell is just defining one footer cell on a certain row of the columns defined in `matFooterCellDef`

### Creating mat-table from scratch

The purpose of creating this is to show you how the team of Angular use directives. This helps expand your knowledge of how directives work.

First we define the mat-table. We need to gather up all the trs that the user defines, as well as all the matColumn definitions.

```typescript
@Directive({ selector: 'mat-table' })
export class MatTableDirective {
  ...
}
```

In our case, we have 3 types of trs. One for the headers (matHeaderRowDef), one for the rows (matRowDef) and one for the footer (matFooterRowDef). Note that you can define these multiple times.

This will help us define the table rows like so, in the `mat-table` directive:

```typescript
  @ContentChild(MatHeaderRowDefDirective) public headerRow: MatHeaderRowDefDirective
  @ContentChild(MatRowDefDirective) public row: MatRowDefDirective
  @ContentChild(MatFooterRowDefDirective) public footerRow: MatFooterRowDefDirective
```

#### Word of Caution

We will be focusing on advanced topics from here on out. Make sure your ready.

This is the perfect example of using directives without html to make angular feel more natural. Angular material tries to use html elements more than its own custom components.

Notice how material uses directives more than components. Why?
They want to keep using normal html elements like the `button` element and `table` elements. They treat these as added functionality to the original HTMLs. They do this because browsers work best with normal elements, so styling and functionality work better.

```html
<button mat-button></button>
<table mat-table></table>
<!-- etc -->
```

This is considered an advanced section, because it's a lot more dynamic and programmatic and we avoid using html at all. But we do this so its easier and more dynamic for the user.

### Creating the initial Definition Directives

> Before continuing, make sure you understand [showing content programmatically](./ng-template-docs/show-content-programmatically.md#modal). Otherwise, you will get lost.

We are going to create boilerplate for each directive so they can be used as a structural directive.

Remember, each row definition requires columns. Here is the html again:

```html
  <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
  <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
  <tr mat-footer-row *matFooterRowDef="let row; columns: displayedColumns;"></tr>
```

You might be wondering why we have a structural row definition and a non-structural row definition. This is needed, because we need to know where the trs are placed, but also have a dynamic nature to it as well. So:
- The mat-header-row directive ensures that the tr header row element is placed in that spot when rendering.
- The *matHeaderRowDef directives dynamically defines the columns for each row, but they aren't rendered until later.

This approach allows us to define the structure of the table rows dynamically, ensuring that the rows are rendered in the correct order with their associated columns. If we didn't do this, managing of the rendering of the rows and columns would become significantly more complex, as we would need to determine the appropriate placement for each row and its corresponding columns.

> We need a structural directive and a non-structural directive working together to make our life easier.

Moving on! Lets define the directives.

```typescript
@Directive({ selector: 'matHeaderRowDef' })
export class MatHeaderRowDefDirective {
  @Input('matHeaderRowDef') public columns: string[] = []

  constructor(
    public templateRef: TemplateRef,
    // We have set viewContainerRef as public so that we can access these in the mat-table directive.
    public viewContainerRef: ViewContainerRef
  ) {}
}
```

Note that the Header row passes in columns directly, so we need columns defined as an input that is the same name as the directive name. I'm using an alias so I can name the variable `columns`, so I'm putting `'matHeaderRowDef'` as the name we use when we give the input.

The footer and row need information for each row since it will show each cell. So that means it will use context for the `let` variable when we render the content, and we have `columns` as an input, but we must name it with the selector name. See the input below:

```typescript
@Directive({ selector: 'matFooterRowDef' })
export class MatFooterRowDefDirective {
    @Input("matFooterRowDefColumns") public columns: string[] = []

    constructor(
        public templateRef: TemplateRef,
        public viewContainerRef: ViewContainerRef
    ) {}
}
```

Same for the row definition.

```typescript
@Directive({ selector: 'matRowDef' })
export class MatRowDefDirective {
  // This shows
  @Input("matRowDefColumns") public columns: string[] = []

  constructor(
    public templateRef: TemplateRef,
    public viewContainerRef: ViewContainerRef
  ) {}
}
```

For now, we will not render these directives. These are boilerplate.

Now create the `mat-header-row`, `mat-row` and `mat-footer-row` directives.

```typescript
@Directive({ selector: 'mat-header-row' })
export class MatHeaderRowDirective {}
```

```typescript
@Directive({ selector: 'mat-row' })
export class MatRowDirective {}
```

```typescript
@Directive({ selector: 'mat-footer-row' })
export class MatFooterRowDirective {}
```

For now, we will just create them.

---

### Rendering the inner contents of the table dynamically

Now to go back to the `mat-table` directive. We have the 3 content child variables defined:

```typescript
 @Directive({ selector: 'mat-table' })
export class MatTableDirective {
  @ContentChild(MatHeaderRowDefDirective) public headerRow: MatHeaderRowDefDirective
  @ContentChild(MatRowDefDirective) public row: MatRowDefDirective
  @ContentChild(MatFooterRowDefDirective) public footerRow: MatFooterRowDefDirective

  public ngOnInit() {
    // Now we can render the footer, cells and headers accordingly
  }
}
```

In order to render each cell, we need to find each column defined.

As a reminder, when we use the mat-table, we define columns like so:

```html
  <ng-container matColumnDef="name">
    <th mat-header-cell *matHeaderCellDef> Name </th>
    <td mat-cell *matCellDef="let element"> {{element.name}} </td>
    <td mat-footer-cell *matFooterCellDef="let element"> {{element.name}} </td>
  </ng-container>
```

### Creating the MatColumnDefDirective and associated structural directives
 
Before moving forward, we need to define the orchestrator for each column. This is `matColumnDef`. Then we can define the child content for each column (`matHeaderCellDef` and `matCellDef`).

```typescript
/** Original: https://github.com/angular/components/blob/main/src/cdk/table/cell.ts#L79 */
@Directive({ selector: 'matColumnDef' })
export class MatColumnDefDirective {
  /** we would also set a class name for the rendered content of this column, but we won't for this demo example */
  @Input('matColumnDef') public name: string
  
  @ContentChild(MatHeaderCellDefDirective) public headerCell: MatHeaderCellDefDirective
  @ContentChild(MatCellDefDirective) public cell: MatCellDefDirective
  @ContentChild(MatFooterCellDefDirective) public footerCell: MatFooterCellDefDirective

  constructor(
    public templateRef: TemplateRef,
    public viewContainerRef: ViewContainerRef
  ) {}


}
```

Okay, so we now see that the matColumnDef has a name, the header of the column, and the cell of the column.

Lets define those directives:

```typescript
@Directive({ selector: 'matHeaderCellDef' })
export class MatHeaderCellDefDirective {
  constructor(
    public templateRef: TemplateRef,
    public viewContainerRef: ViewContainerRef
  ) {}
}
```

```typescript
@Directive({ selector: 'matCellDef' })
export class MatCellDefDirective {
  constructor(
    public templateRef: TemplateRef,
    public viewContainerRef: ViewContainerRef
  ) {}
}
```

Okay, so we now have this `matColumnDef` to define each column. But these are only defitions. For the user to see them, we need to render them.

Remember how each row definition directive has a `columns` input. This is the columns that will be rendered.

We will use the `columns` input to render the columns. However, we first need the `dataSource` to get each row.

Then we can go through each column, per row.

```typescript
@Input() public dataSource: NgxDcDataSource<GetDataItemsT, FinalDataItemsT>
```

> Note: Don't know what `NgxDcDataSource` is? Check out the [docs](./data-management/data-management.md#modal)

Now that we have the dataSource, we need to first get the data, and then render the columns.
```typescript
type ColumnDef = {
  name: string
  header: MatHeaderCellDefDirective
  cell: MatCellDefDirective
  footer: MatFooterCellDefDirective
}

@Directive({ selector: 'mat-table' })
export class MatTableDirective<GetDataItemsT = any, FinalDataItemsT = GetDataItemsT> implements DestroyObservable {
  @Input() public dataSource: NgxDcDataSource<GetDataItemsT, FinalDataItemsT>

  @ContentChild(MatHeaderRowDefDirective) public headerRow: MatHeaderRowDefDirective
  @ContentChild(MatRowDefDirective) public row: MatRowDefDirective
  @ContentChild(MatFooterRowDefDirective) public footerRow: MatFooterRowDefDirective

  @ContentChildren(MatColumnDefDirective) public columns: QueryList<MatColumnDefDirective>

  constructor() {
    super()
  }

  public columnDefsByName: Record<string, MatColumnDefDirective> = {}

  public ngOnInit() {
    if (!this.dataSource) {
      return;
    }

    let dataStream: Observable<readonly T[]> | undefined;

    if (isDataSource(this.dataSource)) {
      this.dataSource.connect(this);
    } else {
      // Support other non-data-source types
      // See https://github.com/angular/components/blob/50d906b3e3bb841917bafc05bc65ae7c01a57705/src/cdk/table/table.ts#L1154
    }

    if (dataStream === undefined) {
      throw new Error("No data stream found");
    }

    // Subscribe to the data stream and render the rows
    this.renderChangeSubscription = dataStream!
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.renderRows();
      });

    // Note that we still although we unsubscribe in the destroy method, we still need the subscription to use if the user changes the data source.
  }

  public ngOnDestroy() {
    super.onDestroy()
    if (isDataSource(this.dataSource)) {
      this.dataSource.disconnect(this);
    }
  }

  public isDataSource(dataSource: any): dataSource is NgxDcDataSource<any, any> {
    return dataSource instanceof NgxDcDataSource // Or just check for connect and disconnect methods
  }

  public ngAfterContentChecked() {
    this.renderRows()
  }

  public renderRows() {
    // 1. Cache the rows we have so we can unsubscribe from them later, if we need to
    // TODO: Cache the rows

    const columnDefsOrdered = this.headerRow.columns.map(column => {
      const columnDef = this.columns.find(c => c.name === column)
      if (!columnDef) {
        throw new Error(`Column ${column} not found`)
      }
      return {
        name: column.name,
        header: columnDef?.headerCell,
        cell: columnDef?.cell
      }
    })

    // 2. Clear the rows we have so we can render the new ones
    if (this.headerRow.viewContainerRef.length > 0) {
      this.headerRow.viewContainerRef.clear();
    }

    if (this.row.viewContainerRef.length > 0) {
      this.row.viewContainerRef.clear();
    }

    if (this.footerRow.viewContainerRef.length > 0) {
      this.footerRow.viewContainerRef.clear();
    }


    // 3. Render the new rows
    // For each cell, we need to render the header in the right place, and the cell in the right place.
    columnDefsOrdered.forEach(column => {
        if (column.header) {
          this.headerRow.viewContainerRef.createEmbeddedView(column.header.templateRef, { $implicit: data, index })
        }
        if (column.cell) {
          this.dataSource.data$.forEach((data, index) => {
            this.row.viewContainerRef.createEmbeddedView(column.cell.templateRef, { $implicit: data, index })
          })
        }
        if (column.footer) {
          this.footerRow.viewContainerRef.createEmbeddedView(column.footer.templateRef, { $implicit: data, index })
        }
      })
    }
  }
```

## Conclusion

> This is a simplified example of how to render structural directives. It is not a complete example, but it is a good starting point.

If you want to implement this fully, then I would suggest studying the Angular Material Table code:

- [Angular Material Table Code](https://github.com/angular/components/blob/main/src/cdk/table/table.ts)
