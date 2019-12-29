import { PerfilService } from './../../perfil/perfil.service';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { UsuarioService } from './../usuario.service';
import { ListUsuarioComponent } from './list-usuario.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';

import { ListUsuarioRoutingModule } from './list-usuario-routing.module';


@NgModule({
  declarations: [ListUsuarioComponent],
  imports: [
    CommonModule,
    ListUsuarioRoutingModule,
    PanelModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    TableModule,
    TriStateCheckboxModule,
    DropdownModule
  ],
  exports: [ListUsuarioComponent],
  providers: [UsuarioService, PerfilService]
})
export class ListUsuarioModule { }
