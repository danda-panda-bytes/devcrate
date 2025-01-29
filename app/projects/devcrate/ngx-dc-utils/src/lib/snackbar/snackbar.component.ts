import { Component, ViewEncapsulation, Inject, OnInit } from '@angular/core'
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
  public truncate_flag = false

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any,
    private qi_snackRef: MatSnackBarRef<SnackbarComponent>,
  ) { }
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
