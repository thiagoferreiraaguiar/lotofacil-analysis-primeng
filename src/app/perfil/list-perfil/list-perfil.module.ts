import { FormsModule } from '@angular/forms';
import { PerfilService } from './../perfil.service';
import { ListPerfilComponent } from './list-perfil.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListPerfilRoutingModule } from './list-perfil-routing.module';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [ListPerfilComponent],
  imports: [
    CommonModule,
    ListPerfilRoutingModule,
    PanelModule,
    ButtonModule,
    InputTextModule,
    FormsModule
  ],
  exports: [ListPerfilComponent],
  providers: [PerfilService]
})
export class ListPerfilModule { }
