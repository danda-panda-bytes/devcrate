import {Component, ViewEncapsulation} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MatCheckbox} from "@angular/material/checkbox";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import {MatIcon, MatIconRegistry} from "@angular/material/icon";
import {NgxDcNavbarModule} from "@devcrate/ngx-dc-navbar";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    MatIcon,
    MatButtonModule,
    NgxDcNavbarModule,
    RouterOutlet,
  ],
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  public darkTheme = true
  constructor(private matIconRegistry: MatIconRegistry) {
    this.matIconRegistry.setDefaultFontSetClass('material-symbols-outlined');
  }

  public changeTheme() {
    this.darkTheme = !this.darkTheme
    if (this.darkTheme && document.body.classList.contains('light-theme')) {
      document.body.classList.remove('light-theme')
    }
    if (!this.darkTheme && !document.body.classList.contains('light-theme')) {
      document.body.classList.add('light-theme')
    }
  }
}
