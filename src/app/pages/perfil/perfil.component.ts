import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HeaderService } from 'src/app/core/services/header.service';
import { Perfil } from 'src/app/core/interfaces/perfil';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class PerfilComponent {

  headerService = inject(HeaderService);

  ngOnInit(): void {
    this.headerService.titulo.set('Perfil')
  }

  perfil: Perfil = {
    nombre: '',
    direccion: '',
    telefono: '',
    detalleEntrega: '',
  }
}
