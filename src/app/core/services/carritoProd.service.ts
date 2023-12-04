import { Injectable } from '@angular/core';
import { Carrito } from '../interfaces/carrito-s';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  constructor() { }

  carrito: Carrito[] = [
    {
      idProducto: 1,
      cantidad: 2
    },
    {
      idProducto: 3,
      cantidad: 1,
    }
  ]

  agregarProducto(idProducto: number, cantidad: number){
    const i = this.carrito.findIndex(producto => producto.idProducto === idProducto)
    if(i === -1){
      const nuevoProducto = { idProducto: idProducto, cantidad: cantidad }
      this.carrito.push(nuevoProducto)
      } else {
        this.carrito[i].cantidad += cantidad;
      }
    }


  eliminarProducto(idProducto: number){
    this.carrito = this.carrito.filter(producto => producto.idProducto !== idProducto)
  }

  cambiarCantidadProducto(idProducto: number, cantidad: number){
    this.carrito = this.carrito.map(producto => {
      const productoActual = producto;
      if(productoActual.idProducto === idProducto) productoActual.cantidad = cantidad;
      return productoActual;
    })
  }
}

