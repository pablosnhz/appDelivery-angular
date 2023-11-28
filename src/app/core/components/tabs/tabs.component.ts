import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent {

  constructor( private router: Router ){
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd){
        console.log('evento',event)
        switch (event.urlAfterRedirects){
          case '/':
            this.seleccionado = [true, false, false, false];
            break;
          case '/buscar':
            this.seleccionado = [false, true, false, false];
            break;
          case '/carrito':
            this.seleccionado = [false, false, true, false];
            break;
          case '/perfil':
            this.seleccionado = [false, false, false, true];
            break;
          default:
            this.seleccionado = [false, false, false, false];
            break
        }
      }
    })
  }

  seleccionado = [false, false, false, false]

  navegacion(direccion: string){
    this.router.navigate([direccion])
    console.log(direccion)
  }

}
