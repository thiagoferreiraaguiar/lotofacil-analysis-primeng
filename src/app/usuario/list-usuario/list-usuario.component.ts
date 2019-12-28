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
  totalResgistros: number;
  firstPage: number;
  endPage: number;
  qtdRows: number;

  ngOnInit() {
    this.titlePage = "Usuário";
    this.ativo = true;
    this.pageForm = "/form-usuario";
    this.qtdRows = 10;

    //preenche combo perfil
    this.perfilService.listarTodos().subscribe((response: ResponseEntity) => {
      this.listaPerfilUsuarioLTO = response.data;
    });

    // listar todos usuarios
    this.usuarioService.listarTodos().subscribe((response: ResponseEntity) => {
      this.listaUsuarioLTO = response.data;
      this.totalResgistros = this.listaPerfilUsuarioLTO.length;
      this.showLabelPaginate(0);
    });
  }

  public pesquisarUsuario() {

  }

  public exibirDadosUsuario(event: any) {
    this.router.navigate([this.pageForm + "/" + event.data.idUsuario]);
  }

  public paginate(event: any) {
    this.showLabelPaginate(event.first);
  }

  private showLabelPaginate(page: number) {
    var paginaAtual = page + 1;
    this.firstPage = (this.qtdRows * page) + 1;

    var quociente = (this.totalResgistros / this.qtdRows);
    if (parseInt(quociente.toString()) > paginaAtual) {
      this.endPage = this.qtdRows * paginaAtual;
    } else {
      this.endPage = this.totalResgistros;
    }
  }

}
