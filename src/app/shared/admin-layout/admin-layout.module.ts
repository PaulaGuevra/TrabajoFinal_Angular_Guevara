import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { TopbarComponent } from './components/topbar/topbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
  declarations: [
    LayoutComponent,
    TopbarComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule, 
    MatListModule,
    MatSidenavModule,
    MatTooltipModule,
    RouterModule
  ],
  exports: [
    LayoutComponent
  ]
})
export class AdminLayoutModule { }
