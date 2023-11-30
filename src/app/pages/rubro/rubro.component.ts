import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { HeaderService } from 'src/app/core/services/header.service';
import { ProductosService } from '../../core/services/productos.service';
import { Producto } from 'src/app/core/interfaces/productos';
import { TarjetaProductoComponent } from 'src/app/core/components/tarjeta-producto/tarjeta-producto.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-rubro',
  templateUrl: './rubro.component.html',
  styleUrls: ['./rubro.component.scss'],
  standalone: true,
  imports: [TarjetaProductoComponent, CommonModule]
})
export class RubroComponent {

  headerService = inject(HeaderService);
  ProductosService = inject(ProductosService);
  ac = inject(ActivatedRoute);
  productos: Producto[]=[]

  ngOnInit(): void {
    this.headerService.titulo.set('Rubro')
    this.ac.params.subscribe(params => {
      if(params['id']){
        this.ProductosService.getByCategoria(parseInt(params['id']))
        .then (productos => this.productos = productos)
      }
    })
  }

}
