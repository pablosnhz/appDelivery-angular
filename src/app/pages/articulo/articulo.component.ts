import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Producto } from 'src/app/core/interfaces/productos';
import { HeaderService } from 'src/app/core/services/header.service';
import { ProductosService } from '../../core/services/productos.service';

@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.component.html',
  styleUrls: ['./articulo.component.scss']
})
export class ArticuloComponent {

  headerService = inject(HeaderService);
  ProductosService = inject(ProductosService);

  producto? : Producto;

  ngOnInit(): void {
    this.headerService.titulo.set('Articulo')
  }

  constructor(private ac: ActivatedRoute){
    ac.params.subscribe(param => {
      if(param['id']){
        this.ProductosService.getById(param['id'])
        .then(producto => {
          this.producto = producto;
        })
      }
    })
  }
}
