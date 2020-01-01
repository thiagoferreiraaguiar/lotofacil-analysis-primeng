import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { MessageService } from 'primeng/api';
import { AlteraSenhaService } from './altera-senha.service';
import { AlteraSenhaComponent } from './altera-senha.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlteraSenhaRoutingModule } from './altera-senha-routing.module';


@NgModule({
  declarations: [AlteraSenhaComponent],
  imports: [
    CommonModule,
    AlteraSenhaRoutingModule,
    PanelModule,
    ButtonModule,
    FormsModule,
    InputTextModule,
    MessagesModule,
    MessageModule,
    ToastModule,
    ReactiveFormsModule
  ],
  exports: [AlteraSenhaComponent],
  providers: [AlteraSenhaService, MessageService]
})
export class AlteraSenhaModule { }
