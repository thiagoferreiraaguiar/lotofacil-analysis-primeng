import { Util } from './../../util/util';
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

  pageForm: string;
  listaPerfilUsuarioLTO: PerfilUsuarioLTO[] = [];

  // paginacao
  util: Util;
  qtdRows: number;
  textPaginacao: string;

  ngOnInit() {
    this.titlePage = "Perfil";
    this.pageForm = "/form-perfil";
    this.qtdRows = 10;
    this.util = new Util();

    // listar todos perfils
    this.perfilService.listarTodos().subscribe((response: ResponseEntity) => {
      this.listaPerfilUsuarioLTO = response.data;
      this.textPaginacao = this.util.showLabelPaginate(0, this.listaPerfilUsuarioLTO.length, this.qtdRows);
    });
  }

  public pesquisarPerfilUsuario() {
    this.perfilService.pesquisarPerfilUsuario(this.sigla, this.descricao).subscribe((response: ResponseEntity) => {
      this.listaPerfilUsuarioLTO = response.data;
      this.textPaginacao = this.util.showLabelPaginate(0, this.listaPerfilUsuarioLTO.length, this.qtdRows);
    });
  }

  public exibirDadosPerfil(event: any) {
    this.router.navigate([this.pageForm + "/" + event.data.idPerfilUsuario]);
  }

  public paginate(event: any) {
    this.textPaginacao = this.util.showLabelPaginate(event.first, this.listaPerfilUsuarioLTO.length, this.qtdRows);
  }

}
