import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {

  @Input()
  isExpanded = true;

  constructor(private router: Router) {
  }

  navegar(ruta: string) {
    this.router.navigate([ruta]);
  }

}



