import { Directive, OnInit, OnDestroy, TemplateRef, ViewContainerRef, ElementRef, AfterContentInit, inject, input, contentChild } from '@angular/core';
import { Subscription } from 'rxjs';
import {MatSelect} from "@angular/material/select";
import {NgxDcMatSelectOptionDirective} from "./mat-select-option.directive";
import {DestroyObservable} from "@devcrate/ngx-dc-utils";
import {takeUntil} from "rxjs/operators";

/**
 * ```html
 * <mat-select [ngxDcMatSelectDataSource]="dao" placeholder="Select an option" appearance="outlined">
 *   <mat-select-trigger>{{ dao.selectedItem.value.name }}</mat-select-trigger>
 *   <ng-container *ngxDcMatSelectOption="let item">
 *     <mat-option [value]="item">{{ item.name }}</mat-option>
 *   </ng-container>
 * </mat-select>
 * ```
 */
@Directive({
  standalone: true,
  selector: '[ngxDcMatSelectDataSource]'
})
export class NgxDcMatSelectDataSourceDirective extends DestroyObservable implements AfterContentInit {
  private matSelect = inject(MatSelect);

  readonly dataSource = input<any>(undefined, { alias: "ngxDcMatSelectDataSource" });
  readonly optionTemplate = contentChild(NgxDcMatSelectOptionDirective);
  private subscription: Subscription;

  constructor() {
    super()
  }

  ngOnInit() {
    const dataSource = this.dataSource();
    if (dataSource) {
      dataSource.data$.pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
        const optionTemplate = this.optionTemplate();
        if (optionTemplate) {
          optionTemplate.viewContainer.clear()
          data.forEach((item: any) => {
            this.optionTemplate().viewContainer.createEmbeddedView(this.optionTemplate().templateRef, { $implicit: item });
          })
        }
      });
    }
  }

  ngAfterContentInit() {
    if (this.dataSource() && this.matSelect?.valueChange) {
      this.matSelect.valueChange.pipe(takeUntil(this.destroy$)).subscribe(item => {
        this.dataSource().selectedItem.next(item)
      });
    }
  }

  private updateOptions(data: any[], viewContainer: ViewContainerRef, templateRef: TemplateRef<any>, matSelect: MatSelect) {
    viewContainer.clear();
    data.forEach(item => {
      viewContainer.createEmbeddedView(templateRef, { $implicit: item });
    });

    // Manually trigger change detection for the MatSelect component
    matSelect.ngAfterContentInit();
  }
}
