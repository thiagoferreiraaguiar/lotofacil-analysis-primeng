import { UsuarioLogado } from './../model/usuario-logado';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  items: MenuItem[];
  loginUsuario: string;
  usuarioLogado: UsuarioLogado;

  constructor() { }

  ngOnInit() {
    this.usuarioLogado = UsuarioLogado.getInstance();
    this.usuarioLogado.exibeMenu.subscribe((show: boolean) => {
      if (show) {
        this.loginUsuario = this.usuarioLogado.usuario.login;
        this.addItensMenu();
      }
    });
  }

  private addItensMenu(): void {
    this.items = [
      // { label: "", style: this.getImageLogo() },
      { label: "Home", icon: "pi pi-home" },
      {
        label: "Acesso", icon: "pi pi-user",
        items: [
          { label: "Perfil" },
          { label: "Usuário" },
          { label: "Configuração" }
        ]
      },
      {
        label: "Cadastro", icon: "pi pi-file",
        items: [
          { label: "Aposta" },
          { label: "Resultado" }
        ]
      }
    ];
  }

  private getImageLogo(): any {
    return {
      "background": "url('../../assets/img/logo.png')",
      "background-repeat": "no-repeat",
      "background-position": "center",
      "background-size": "20px 20px"
    };
  }

}
