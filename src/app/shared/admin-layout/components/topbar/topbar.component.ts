import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent {

  @Output()
  expandioBoton = new EventEmitter<boolean>();

  expandido = false;

  onClick() {
    this.expandido = !this.expandido;
    this.expandioBoton.emit(this.expandido);
  }

  constructor(private router: Router) {
  }

  navegar(ruta: string) {
    this.router.navigate([ruta]);
  }

}
