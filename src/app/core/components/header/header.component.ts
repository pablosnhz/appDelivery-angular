import { Component, OnInit, inject } from '@angular/core';
import { HeaderService } from '../../services/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  headerService = inject(HeaderService);

  ngOnInit(): void {
    this.headerService.titulo.set('Home');
    }
  }


