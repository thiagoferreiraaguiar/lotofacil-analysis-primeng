import { ResponseEntity } from './../../model/response-entity';
import { PerfilService } from './../perfil.service';
import { Router } from '@angular/router';
import { PerfilUsuarioLTO } from './../../lto/perfil-usuario-lto';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-perfil',
  templateUrl: './list-perfil.component.html',
  styleUrls: ['./list-perfil.component.css']
})
export class ListPerfilComponent implements OnInit {

  constructor(
    private perfilService: PerfilService,
    private router: Router
  ) { }

  titlePage: string;
  sigla: string;
  descricao: string;
  listaPerfilUsuarioLTO: PerfilUsuarioLTO[] = [];

  ngOnInit() {
    this.titlePage = "Perfil";    
    this.perfilService.listarTodos().subscribe((response: ResponseEntity) => {
      this.listaPerfilUsuarioLTO = response.data;
    });
  }

}
