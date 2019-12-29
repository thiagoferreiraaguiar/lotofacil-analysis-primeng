import { Util } from './../../util/util';
import { UsuarioLTO } from './../../lto/usuario-lto';
import { PerfilUsuarioLTO } from './../../lto/perfil-usuario-lto';
import { ResponseEntity } from './../../model/response-entity';
import { PerfilService } from './../../perfil/perfil.service';
import { UsuarioService } from './../usuario.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-usuario',
  templateUrl: './list-usuario.component.html',
  styleUrls: ['./list-usuario.component.css']
})
export class ListUsuarioComponent implements OnInit {

  constructor(
    private usuarioService: UsuarioService,
    private perfilService: PerfilService,
    private router: Router
  ) { }

  titlePage: string;

  nome: string;
  login: string;
  perfilSelecionado: PerfilUsuarioLTO;
  ativo: boolean;

  pageForm: string;
  listaPerfilUsuarioLTO: PerfilUsuarioLTO[] = [];
  listaUsuarioLTO: UsuarioLTO[] = [];

  // paginacao
  util: Util;
  qtdRows: number;
  textPaginacao: string;

  ngOnInit() {
    this.titlePage = "Usuário";
    this.ativo = true;
    this.pageForm = "/form-usuario";
    this.qtdRows = 10;
    this.util = new Util();

    //preenche combo perfil
    this.perfilService.listarTodos().subscribe((response: ResponseEntity) => {
      this.listaPerfilUsuarioLTO = response.data;
    });

    // listar todos usuarios
    this.usuarioService.listarTodos().subscribe((response: ResponseEntity) => {
      this.listaUsuarioLTO = response.data;
      this.textPaginacao = this.util.showLabelPaginate(0, this.listaUsuarioLTO.length, this.qtdRows);
    });
  }

  public pesquisarUsuario() {
    this.usuarioService.pesquisarUsuario(this.nome, this.login, this.perfilSelecionado.idPerfilUsuario, this.ativo).subscribe((response: ResponseEntity) => {
      this.listaUsuarioLTO = response.data;
      this.textPaginacao = this.util.showLabelPaginate(0, this.listaUsuarioLTO.length, this.qtdRows);
    });
  }

  public exibirDadosUsuario(event: any) {
    this.router.navigate([this.pageForm + "/" + event.data.idUsuario]);
  }

  public paginate(event: any) {
    this.textPaginacao = this.util.showLabelPaginate(event.first, this.listaUsuarioLTO.length, this.qtdRows);
  }

}
