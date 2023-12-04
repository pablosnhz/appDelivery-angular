import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';


import { Producto } from 'src/app/core/interfaces/productos';
import { ContadorCantidadComponent } from "../../core/components/contador-cantidad/contador-cantidad.component";
import { HeaderService } from 'src/app/core/services/header.service';
import { ProductosService } from '../../core/services/productos.service';
import { CarritoService } from 'src/app/core/services/carritoProd.service';

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
  CarritoService = inject(CarritoService);


  producto? : Producto;
  cantidad = signal(1);

  ngOnInit(): void {
    this.headerService.titulo.set('Articulo')
  }

  constructor(private ac: ActivatedRoute, private router: Router){
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

  agregarAlCarrito(){
    if(!this.producto) return;
    this.CarritoService.agregarProducto(this.producto?.id, this.cantidad())
    this.router.navigate(['/carrito']);
  }

}
