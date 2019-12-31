import { Util } from './../../util/util';
import { UsuarioLTO } from './../../lto/usuario-lto';
import { PerfilUsuarioLTO } from './../../lto/perfil-usuario-lto';
import { ResponseEntity } from './../../model/response-entity';
import { PerfilService } from './../../perfil/perfil.service';
import { UsuarioService } from './../usuario.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api/selectitem';

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
  idPerfil: number;
  ativo: any;
  labelStatus: string;

  pageForm: string;
  perfilList: SelectItem[] = [];
  listaUsuarioLTO: UsuarioLTO[] = [];

  // paginacao
  util: Util;
  qtdRows: number;
  textPaginacao: string;

  ngOnInit() {
    this.titlePage = "Usuário";
    this.ativo = true;
    this.labelStatus = "Ativo";
    this.pageForm = "/form-usuario";
    this.qtdRows = 10;
    this.util = new Util();

    //preenche combo perfil
    let listaPerfilUsuarioLTO: PerfilUsuarioLTO[] = [];
    this.perfilList.push({ label: "Selecione", value: 0 });
    this.perfilService.listarTodos().subscribe((response: ResponseEntity) => {
      listaPerfilUsuarioLTO = response.data;
      listaPerfilUsuarioLTO.forEach((perfilLTO, index) => {
        this.perfilList.push({ label: perfilLTO.descricao, value: perfilLTO.idPerfilUsuario });
      })
    });

    // listar todos usuarios
    this.usuarioService.listarTodos().subscribe((response: ResponseEntity) => {
      this.listaUsuarioLTO = response.data;
      this.textPaginacao = this.util.showLabelPaginate(0, this.listaUsuarioLTO.length, this.qtdRows);
    });
  }

  public pesquisarUsuario() {
    this.usuarioService.pesquisarUsuario(this.nome, this.login, this.idPerfil, this.ativo).subscribe((response: ResponseEntity) => {
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

  public onChangeStatus() {
    if (this.ativo == null) {
      this.labelStatus = "Todos";
    } else if (this.ativo) {
      this.labelStatus = "Ativo";
    } else {
      this.labelStatus = "Inativo";
    }
  }

}
