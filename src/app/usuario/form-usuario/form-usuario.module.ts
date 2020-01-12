import { DropdownModule } from 'primeng/dropdown';
import { PerfilService } from './../../perfil/perfil.service';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { UsuarioService } from './../usuario.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormUsuarioRoutingModule } from './form-usuario-routing.module';
import { FormUsuarioComponent } from './form-usuario.component';
import { CheckboxModule } from 'primeng/checkbox';
import { InputMaskModule } from 'primeng/inputmask';



@NgModule({
  declarations: [FormUsuarioComponent],
  imports: [
    CommonModule,
    FormUsuarioRoutingModule,
    PanelModule,
    ButtonModule,
    FormsModule,
    InputTextModule,
    MessagesModule,
    MessageModule,
    ToastModule,
    DropdownModule,
    ReactiveFormsModule,
    CheckboxModule,
    InputMaskModule
  ],
  exports: [FormUsuarioComponent],
  providers: [UsuarioService, PerfilService, MessageService]
})
export class FormUsuarioModule { }
