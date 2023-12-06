import { Component, OnDestroy, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CategoriasService } from '../../core/services/categorias.service';
import { HeaderService } from 'src/app/core/services/header.service';
import { Categoria } from 'src/app/core/interfaces/categorias';
import { TarjetaCategoriaComponent } from 'src/app/core/components/tarjeta-categoria/tarjeta-categoria.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [TarjetaCategoriaComponent, CommonModule, RouterModule]
})
export class HomeComponent implements OnInit, OnDestroy {

  headerService = inject(HeaderService);
  categoriasService = inject(CategoriasService);
  categorias: WritableSignal<Categoria[]> = signal([]);

  ngOnInit(): void {
    this.headerService.titulo.set('Home')
    this.headerService.extension.set(true)
    this.categoriasService.getAll().then(res => this.categorias.set(res));
  }

  ngOnDestroy(): void {
    this.headerService.extension.set(false)
  }

}
