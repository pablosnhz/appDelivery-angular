import { Component, ElementRef, ViewChild, WritableSignal, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { HeaderService } from 'src/app/core/services/header.service';
import { CarritoService } from '../../core/services/carritoProd.service';
import { ContadorCantidadComponent } from "../../core/components/contador-cantidad/contador-cantidad.component";
import { Producto } from 'src/app/core/interfaces/productos';
import { ProductosService } from '../../core/services/productos.service';
import { PerfilService } from '../../core/services/perfil.service';
import { ConfigService } from 'src/app/core/services/config.service';

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
  perfilService = inject(PerfilService);
  configService = inject(ConfigService)
  router = inject(Router)

  productosCarrito: WritableSignal<Producto[]> = signal([]);

  subtotal = 0;
  delivery = this.configService.configuracion().costoEnvio;
  total = 0;
  @ViewChild('dialog') dialog! : ElementRef<HTMLDialogElement>

  ngOnInit(): void {
    this.headerService.titulo.set('Carrito');
    this.buscarInformacionProductos().then(() =>{
      this.calcularInformacion();
    });
  }


  async buscarInformacionProductos(){
    for (let i = 0; i < this.CarritoService.carrito.length; i++) {
      const itemCarrito = this.CarritoService.carrito[i];
      const res = await this.ProductosService.getById(itemCarrito.idProducto)
      if(res) this.productosCarrito.set([...this.productosCarrito(), res]);
    }
  }

  eliminarProducto(idProducto: number) {
    this.CarritoService.eliminarProducto(idProducto);
    const index = this.productosCarrito().findIndex(producto => producto.id === idProducto);
    if (index !== -1) {
      this.productosCarrito().splice(index, 1);
    }
    this.calcularInformacion();
  }


  calcularInformacion(){
    this.subtotal = 0;
    for (let i = 0; i < this.CarritoService.carrito.length; i++) {
      this.subtotal += this.productosCarrito()[i].precio * this.CarritoService.carrito[i].cantidad;
    }
    this.total = this.subtotal + this.configService.configuracion().costoEnvio;

  }

  cambiarCantidadProducto(id: number, cantidad: number){
    this.CarritoService.cambiarCantidadProducto(id, cantidad)
    this.calcularInformacion();
  }




  async enviarMensaje(){
    let pedido = '';
    for (let i = 0; i < this.CarritoService.carrito.length; i++) {
      const producto = await this.ProductosService.getById(this.CarritoService.carrito[i].idProducto)
      pedido += `* ${this.CarritoService.carrito[i].cantidad} X ${producto?.nombre}` ;

    }
    const mensaje = `
Hola soy ${this.perfilService.perfil()?.nombre}, y te quiero hacer el siguiente pedido ${pedido}.
Si te queres comunicar conmigo hacelo a este numero o al ${this.perfilService.perfil()?.telefono}.
La direccion de envio es ${this.perfilService.perfil()?.direccion} - ${this.perfilService.perfil()?.detalleEntrega}
Muchas Gracias.
`
  const link = `https://wa.me/+5412345678?text=${encodeURI(mensaje)}`
  window.open(link, '_blank')
  this.dialog.nativeElement.showModal();
  }

  finalizarPedido(){
    this.CarritoService.vaciarCarrito();
    this.dialog.nativeElement.close();
    this.router.navigate(['/']);
  }

  editarPedido(){
    this.dialog.nativeElement.close();
  }
}
