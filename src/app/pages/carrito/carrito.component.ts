import { Component, inject } from '@angular/core';
import { HeaderService } from 'src/app/core/services/header.service';
import { CarritoService } from '../../core/services/carritoProd.service';
import { CommonModule } from '@angular/common';
import { ContadorCantidadComponent } from "../../core/components/contador-cantidad/contador-cantidad.component";
import { Producto } from 'src/app/core/interfaces/productos';
import { ProductosService } from '../../core/services/productos.service';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-carrito',
    templateUrl: './carrito.component.html',
    styleUrls: ['./carrito.component.scss'],
    standalone: true,
    imports: [CommonModule, ContadorCantidadComponent, RouterModule]
})
export class CarritoComponent {
  headerService = inject(HeaderService);
  CarritoService = inject(CarritoService);
  ProductosService = inject(ProductosService);

  productosCarrito: Producto[]=[];

  ngOnInit(): void {
    this.headerService.titulo.set('Carrito');
    this.CarritoService.carrito.forEach(async itemCarrito => {
      const res = await this.ProductosService.getById(itemCarrito.idProducto)
      if(res) this.productosCarrito.push(res);
    })
    console.log(this.productosCarrito)
  }

  eliminarProducto(idProducto : number){
    this.CarritoService.eliminarProducto(idProducto);
  }
}
