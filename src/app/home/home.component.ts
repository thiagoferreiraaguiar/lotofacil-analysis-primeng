import { ResponseEntity } from './../model/response-entity';
import { HomeService } from './home.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private homeService: HomeService) { }

  titlePage: string;
  qtdConcursosNaoVerificados: number;

  ngOnInit() {
    this.titlePage = "Home";
    this.homeService.pesquisarQuantidadeApostaNaoVerificadas().subscribe((response: ResponseEntity) => {
      this.qtdConcursosNaoVerificados = response.data;
    });
  }

}
