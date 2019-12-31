import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { AlteraEmailComponent } from './altera-email.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlteraEmailRoutingModule } from './altera-email-routing.module';
import { AlteraEmailService } from './altera-email.service';


@NgModule({
  declarations: [AlteraEmailComponent],
  imports: [
    CommonModule,
    AlteraEmailRoutingModule,
    PanelModule,
    ButtonModule,
    FormsModule,
    InputTextModule,
    MessagesModule,
    MessageModule,
    ToastModule,
    ReactiveFormsModule
  ],
  exports: [AlteraEmailComponent],
  providers: [AlteraEmailService, MessageService]
})
export class AlteraEmailModule { }
