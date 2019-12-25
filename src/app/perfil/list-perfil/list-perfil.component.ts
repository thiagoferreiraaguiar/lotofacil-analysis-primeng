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
  totalResgistros: number;
  firstPage: number;
  endPage: number;
  qtdRows: number;

  ngOnInit() {
    this.titlePage = "Perfil";
    this.pageForm = "/form-perfil";
    this.qtdRows = 10;
    this.perfilService.listarTodos().subscribe((response: ResponseEntity) => {
      this.listaPerfilUsuarioLTO = response.data;
      this.totalResgistros = this.listaPerfilUsuarioLTO.length;
      this.showLabelPaginate(0);
    });
  }

  public pesquisarPerfilUsuario() {
    this.perfilService.pesquisarPerfilUsuario(this.sigla, this.descricao).subscribe((response: ResponseEntity) => {
      this.listaPerfilUsuarioLTO = response.data;
      this.totalResgistros = this.listaPerfilUsuarioLTO.length;
      this.showLabelPaginate(0);
    });
  }

  public exibirDadosPerfil(event: any) {
    this.router.navigate([this.pageForm + "/" + event.data.idPerfilUsuario]);
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
