import { Component, Output, EventEmitter } from '@angular/core';

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


}
