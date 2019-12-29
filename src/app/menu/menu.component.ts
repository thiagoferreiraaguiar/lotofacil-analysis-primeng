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
  itemsUsuario: MenuItem[];
  loginUsuario: string;
  usuarioLogado: UsuarioLogado;

  constructor() { }

  ngOnInit() {
    this.addItensMenu();
    this.addItensUsuario();
    this.usuarioLogado = UsuarioLogado.getInstance();
    this.usuarioLogado.exibeMenu.subscribe((show: boolean) => {
      if (show) {
        this.loginUsuario = this.usuarioLogado.usuario.login;
      }
    });
  }

  private addItensMenu(): void {
    this.items = [
      // { label: "", style: this.getImageLogo() },
      { label: "Home", icon: "pi pi-home", routerLink: ['/home'] },
      {
        label: "Acesso", icon: "pi pi-user",
        items: [
          { label: "Perfil", routerLink: ['/list-perfil'] },
          { label: "Usuário", routerLink: ['/list-usuario'] },
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

  private addItensUsuario() {
    this.itemsUsuario = [
      { label: 'Alterar e-mail', icon: 'pi pi-envelope', routerLink: '' },
      { label: 'Alterar senha', icon: 'pi pi-lock', routerLink: '' },
      { separator: true },
      { label: 'Sair', icon: 'pi pi-times', routerLink: '' }
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
