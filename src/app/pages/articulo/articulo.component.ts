import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Producto } from 'src/app/core/interfaces/productos';
import { HeaderService } from 'src/app/core/services/header.service';
import { ProductosService } from '../../core/services/productos.service';
import { CommonModule } from '@angular/common';
import { ContadorCantidadComponent } from "../../core/components/contador-cantidad/contador-cantidad.component";

@Component({
    selector: 'app-articulo',
    templateUrl: './articulo.component.html',
    styleUrls: ['./articulo.component.scss'],
    standalone: true,
    imports: [CommonModule, ContadorCantidadComponent]
})

export class ArticuloComponent {

  headerService = inject(HeaderService);
  ProductosService = inject(ProductosService);

  producto? : Producto;
  cantidad = signal(1);

  ngOnInit(): void {
    this.headerService.titulo.set('Articulo')
  }

  constructor(private ac: ActivatedRoute){
    ac.params.subscribe(param => {
      if(param['id']){
        this.ProductosService.getById(param['id'])
        .then(producto => {
          this.producto = producto;
          this.headerService.titulo.set(producto!.nombre)
        })
      }
    })
  }
}
