import { Component, EventEmitter, Input, Output, signal, OnInit } from '@angular/core';

@Component({
  selector: 'app-contador-cantidad',
  templateUrl: './contador-cantidad.component.html',
  styleUrls: ['./contador-cantidad.component.scss'],
  standalone: true,
  imports: []
})
export class ContadorCantidadComponent implements OnInit {
  ngOnInit(): void {
    this.numero.set(this.cantidadInicial)
  }

  @Output() cantidadCambiada = new EventEmitter<number>();
  @Input() cantidadInicial = 1;

  numero = signal(1);

  actualizarNumero(diferencia: number){
    this.numero.set(Math.max(this.numero()+diferencia, 1));
    this.cantidadCambiada.emit(this.numero());
  }

}
