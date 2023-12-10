import { CommonModule } from '@angular/common';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { Busqueda } from 'src/app/core/interfaces/busqueda';
import { HeaderService } from 'src/app/core/services/header.service';
import { ProductosService } from '../../core/services/productos.service';
import { TarjetaProductoComponent } from "../../core/components/tarjeta-producto/tarjeta-producto.component";
import { Producto } from 'src/app/core/interfaces/productos';


@Component({
    selector: 'app-busqueda',
    templateUrl: './busqueda.component.html',
    styleUrls: ['./busqueda.component.scss'],
    standalone: true,
    imports: [CommonModule, FormsModule, TarjetaProductoComponent, RouterModule]
})
export class BusquedaComponent {

  headerService = inject(HeaderService);
  productosService = inject(ProductosService);
  productos: WritableSignal<Producto[]> = signal([]);
  router = inject(Router)

  ngOnInit(): void {
    this.headerService.titulo.set('Buscar')
    this.productosService.getByAll().then(res => this.productos.set(res));
  }

  parametrosBusqueda: Busqueda = {
    texto: '',
    aptoCeliaco: false,
    aptoVegano: false
  }

  async buscar() {
    this.productos.set(await this.productosService.buscar(this.parametrosBusqueda))
  }
}
