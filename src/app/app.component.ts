import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../src/layout/header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, NgbModule], 
  template: `
    <app-header></app-header> 
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {}