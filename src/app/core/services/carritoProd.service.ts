import { Injectable } from '@angular/core';
import { Carrito } from '../interfaces/carrito-s';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  constructor() {
    const cart = localStorage.getItem('carrito')
    if(cart){
      this.carrito = JSON.parse(cart);
    }
  }

  carrito: Carrito[] = []

  agregarProducto(idProducto: number, cantidad: number, notas: string){
    const i = this.carrito.findIndex(producto => producto.idProducto === idProducto)
    if(i === -1){
      const nuevoProducto: Carrito = { idProducto: idProducto, cantidad: cantidad, notas: notas }
      this.carrito.push(nuevoProducto)
      } else {
        this.carrito[i].cantidad += cantidad;
      }
      this.actualizarAlmacenamiento();
    }


  eliminarProducto(idProducto: number){
    this.carrito = this.carrito.filter(producto => producto.idProducto !== idProducto)
    if(this.carrito.length === 0) return localStorage.clear()
    this.actualizarAlmacenamiento();
  }

  cambiarCantidadProducto(idProducto: number, cantidad: number){
    this.carrito = this.carrito.map(producto => {
      const productoActual = producto;
      if(productoActual.idProducto === idProducto) productoActual.cantidad = cantidad;
      return productoActual;
    })
    this.actualizarAlmacenamiento();
  }

  actualizarAlmacenamiento(){
    localStorage.setItem('carrito', JSON.stringify(this.carrito))
  }

  vaciarCarrito(){
    this.carrito = [];
    localStorage.clear();
  }

}

