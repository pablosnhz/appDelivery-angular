import { Injectable } from '@angular/core';
import { Categoria } from '../interfaces/categorias';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  constructor() { }

  async getAll():Promise<Categoria[]>{
    const res = await fetch('./../../../../assets/data/database.json')
    const resJson = await res.json()
    return resJson;
  }

}
