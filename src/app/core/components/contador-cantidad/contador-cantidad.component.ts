import { Component, EventEmitter, Output, signal } from '@angular/core';

@Component({
  selector: 'app-contador-cantidad',
  templateUrl: './contador-cantidad.component.html',
  styleUrls: ['./contador-cantidad.component.scss'],
  standalone: true,
  imports: []
})
export class ContadorCantidadComponent {

  @Output() cantidadCambiada = new EventEmitter<number>();

  numero = signal(1);

  actualizarNumero(diferencia: number){
    this.numero.set(Math.max(this.numero()+diferencia, 1));
    this.cantidadCambiada.emit(this.numero());
  }

}
