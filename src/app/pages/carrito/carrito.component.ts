import { Component, inject } from '@angular/core';
import { HeaderService } from 'src/app/core/services/header.service';
import { CarritoService } from '../../core/services/carritoProd.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class CarritoComponent {
  headerService = inject(HeaderService);
  CarritoService = inject(CarritoService);

  ngOnInit(): void {
    this.headerService.titulo.set('Carrito')
  }
}
