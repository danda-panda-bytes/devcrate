import {Injectable, InjectionToken, TemplateRef} from "@angular/core";
import {BehaviorSubject, firstValueFrom, Subject} from 'rxjs';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ComponentType} from "@angular/cdk/overlay";
import {MatSnackBar, MatSnackBarRef} from "@angular/material/snack-bar";
import {NavigationEnd, Router} from "@angular/router";
import {takeUntil} from "rxjs/operators";
import {SnackbarComponent} from "./snackbar/snackbar.component";

export const SECOND_IN_MS = 1000

export const NgxDcModalServiceToken = new InjectionToken<NgxDcModalService>("NGX_DC_MODAL_SERVICE_TOKEN")

/**
 * Provides a custom implementation of the `NgxDcModalService`.
 *
 * @deprecated Instead use the example below to add the modal service.
 *
 * ```
 * ...
 * providers: [
 *   ServiceClass,
 *   {
 *     provide: NgxDcModalServiceToken,
 *     useFactory: (m: typeof ServiceClass) => { return m },
 *     deps: [ServiceClass],
 *   }
 * ]
 * ```
 */
export function provideNgxDcModalService(ServiceClass?: new (...args: any[]) => NgxDcModalService) {
  return {
    provide: NgxDcModalServiceToken,
    useValue: ServiceClass || NgxDcModalService
  }
}


@Injectable()
export class NgxDcModalService {
  public showGlobalLoadingBar: BehaviorSubject<boolean> = new BehaviorSubject(false);
  protected snackbarRef: MatSnackBarRef<SnackbarComponent> = null
  protected destroy$ = new Subject()
  constructor(
    public dialog: MatDialog,
    protected snackBar: MatSnackBar,
    protected router: Router,
  ) {
    this.router.events.pipe(takeUntil(this.destroy$)).subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.onNavigationEnd(event)
      }
    })
  }

  /**
   * This method is called every time navigation ends so that we can stop the global loader bar on page change and dismiss any notifications.
   * @param _event The NavigationEnd event
   */
  protected onNavigationEnd(_event: NavigationEnd) {
    this.showGlobalLoadingBar.next(false)
    this.dismissNotification()
  }

  public ngOnDestroy() {
    this.dismissNotification()
    this.showGlobalLoadingBar.next(false)
    this.destroy$.next(true)
    this.destroy$.complete()
  }

  public async showModal<DataToModalT = any, ResultFromModalT = any>(
    component: ComponentType<any> | TemplateRef<any>,
    config: MatDialogConfig<DataToModalT> = null,
  ): Promise<ResultFromModalT> {
    if (!config) { config = {} }
    if (!config.width) {
      config.width = "500px"
    }
    const dialogRef = this.dialog.open(component, config)
    const result = await firstValueFrom(dialogRef.afterClosed())
    return result as ResultFromModalT
  }

  public dismissNotification(): void {
    if (this.snackbarRef) {
      this.snackbarRef.dismiss()
      this.snackbarRef = null
    }
  }

  public showNotification(
    message: string,
    color: 'failed' | 'success' | 'default' = 'default',
    duration_sec = 10,
  ) : MatSnackBarRef<any> {
    this.dismissNotification()
    this.snackbarRef = this.snackBar.openFromComponent(SnackbarComponent, {
      data: {message, actionButton: 'Dismiss'},
      verticalPosition: 'top',
      panelClass: [`${color}-bg-color`],
      duration: duration_sec * SECOND_IN_MS,
    })
    return this.snackbarRef
  }
}
