import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { FormsModule } from '@angular/forms';
import { LoginRoutingModule } from './login-routing.module';
import { CardModule } from 'primeng/card';
import { LoginService } from './login.service';
import { LoginComponent } from './login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    CardModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    FormsModule,
    MessagesModule,
    MessageModule
  ],
  exports: [LoginComponent],
  providers: [LoginService]

})
export class LoginModule { }
