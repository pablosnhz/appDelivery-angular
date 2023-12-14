import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor() { }

  titulo = signal('');
  extension = signal(false);
  urlHeader = signal('./../../../assets/background/header.jpg');
  urlBusq = signal('./../../../assets/background/buscar.jpg');

}
