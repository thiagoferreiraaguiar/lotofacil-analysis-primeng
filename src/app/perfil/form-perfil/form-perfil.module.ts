import { PerfilService } from './../perfil.service';
import { FormPerfilComponent } from './form-perfil.component';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { FormPerfilRoutingModule } from './form-perfil-routing.module';


@NgModule({
  declarations: [FormPerfilComponent],
  imports: [
    CommonModule,
    FormPerfilRoutingModule,
    PanelModule,
    ButtonModule,
    FormsModule,
    InputTextModule,
    MessagesModule,
    MessageModule,
    ToastModule,
    ReactiveFormsModule
  ],
  exports: [FormPerfilComponent],
  providers: [PerfilService, MessageService]
})
export class FormPerfilModule { }
