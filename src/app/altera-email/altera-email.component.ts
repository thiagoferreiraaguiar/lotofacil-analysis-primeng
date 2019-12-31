import { ResponseEntity } from './../model/response-entity';
import { AlteraEmailService } from './../altera-email/altera-email.service';
import { UsuarioLogado } from './../model/usuario-logado';
import { Message } from 'primeng/api/message';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-altera-email',
  templateUrl: './altera-email.component.html',
  styleUrls: ['./altera-email.component.css']
})
export class AlteraEmailComponent implements OnInit {

  constructor(
    private alterarEmailService: AlteraEmailService,
    private messageService: MessageService
  ) { }

  titlePage: string;
  emailFormGroup: FormGroup;
  msgs: Message[] = [];
  showMessageError: boolean;
  disabledButton: boolean;
  usuarioLogado: UsuarioLogado;

  ngOnInit() {
    this.titlePage = "Email";
    this.showMessageError = false;
    this.disabledButton = false;
    this.usuarioLogado = UsuarioLogado.getInstance();
    this.createForm();
    this.popularCamposFormulario(this.usuarioLogado.usuario.email);
  }

  private createForm() {
    this.emailFormGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  public alterarEmail(): void {
    this.msgs = [];
    this.disabledButton = true;
    this.alterarEmailService.alterarEmail(this.emailFormGroup.value.email, this.usuarioLogado.usuario.login).subscribe((response: ResponseEntity) => {
      if (response.data != null) {
        this.showMessageError = false;
        this.usuarioLogado.usuario.email = this.emailFormGroup.value.email;
        this.messageService.add({ severity: 'success', detail: 'E-mail alterado com sucesso!' });
        this.disabledButton = false;
      }
    }, err => {
      this.showMessageError = true;
      this.disabledButton = false;
      this.msgs.push({ severity: 'error', detail: 'Não foi possível alterar o email.' });
    });
  }

  private popularCamposFormulario(novoEmail: string) {
    this.emailFormGroup.setValue({
      email: novoEmail
    })
  }

}
