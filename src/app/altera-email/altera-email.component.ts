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
  email: string;
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
    this.email = this.usuarioLogado.usuario.email;

    this.createForm();
    this.popularCamposFormulario(this.email);
  }

  private createForm() {
    this.emailFormGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  public alterarEmail(): void {
    this.msgs = [];
    this.disabledButton = true;
    this.alterarEmailService.alterarEmail(this.email, this.usuarioLogado.usuario.login).subscribe((response: ResponseEntity) => {
      if (response.data != null) {
        this.showMessageError = false;
        this.popularCamposFormulario(response.data);
        this.messageService.add({ severity: 'success', detail: 'E-mail alterado com sucesso!' });
        this.disabledButton = false;
      }
    }, err => {
      this.showMessageError = true;
      this.disabledButton = false;
      this.msgs.push({ severity: 'error', detail: 'Não foi possível alterar o email.' });
    });

  }

  private popularCamposFormulario(email: string) {
    this.emailFormGroup.setValue({
      email: email
    })
  }

}
