import { Component, ViewEncapsulation, OnInit, inject } from '@angular/core'
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar'
import {MatButton} from "@angular/material/button";

@Component({
    selector: 'app-snackbar',
    templateUrl: './snackbar.component.html',
    styleUrls: ['./snackbar.component.scss'],
    encapsulation: ViewEncapsulation.None,
    imports: [
        MatButton
    ]
})
export class SnackbarComponent implements OnInit {
  data = inject(MAT_SNACK_BAR_DATA);
  private qi_snackRef = inject<MatSnackBarRef<SnackbarComponent>>(MatSnackBarRef);

  public truncate_flag = false

  ngOnInit(): void {
    if (this.data.message.length > 40) {
      this.truncate_flag = true
    }
  }

  dismiss() {
    this.qi_snackRef.dismiss()
  }

  seeMore() {
    this.truncate_flag = false
  }

  seeLess() {
    this.truncate_flag = true
  }

}
