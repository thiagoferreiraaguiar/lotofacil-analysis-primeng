import { AlteraSenhaService } from './altera-senha.service';
import { ResponseEntity } from './../model/response-entity';
import { UsuarioLogado } from './../model/usuario-logado';
import { Message } from 'primeng/api/message';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-altera-senha',
  templateUrl: './altera-senha.component.html',
  styleUrls: ['./altera-senha.component.css']
})
export class AlteraSenhaComponent implements OnInit {

  constructor(
    private alterarSenhaService: AlteraSenhaService,
    private messageService: MessageService
  ) { }

  titlePage: string;
  senhaFormGroup: FormGroup;
  msgs: Message[] = [];
  showMessageError: boolean;
  disabledButton: boolean;
  usuarioLogado: UsuarioLogado;

  ngOnInit() {
    this.titlePage = "Senha";
    this.showMessageError = false;
    this.disabledButton = false;
    this.usuarioLogado = UsuarioLogado.getInstance();
    this.createForm();
  }

  private createForm() {
    this.senhaFormGroup = new FormGroup({
      senha: new FormControl('', [Validators.required]),
      novaSenha: new FormControl('', [Validators.required]),
      confirmaSenha: new FormControl('', [Validators.required])
    });
  }

  public alterarSenha(): void {
    this.msgs = [];
    this.disabledButton = true;
    this.alterarSenhaService.alterarSenha(this.senhaFormGroup.value.senha, this.senhaFormGroup.value.novaSenha, this.senhaFormGroup.value.confirmaSenha, this.usuarioLogado.usuarioFTO.login).subscribe((response: ResponseEntity) => {
      if (this.senhaFormGroup.value.novaSenha != this.senhaFormGroup.value.confirmaSenha) {
        this.showMessageError = true;
        this.disabledButton = false;
        this.msgs.push({ severity: 'error', detail: "Os campos 'senha' e 'confirmar senha' estão diferentes." });
      } else {
        if (response.data != null) {
          this.showMessageError = false;
          this.messageService.add({ severity: 'success', detail: 'Senha alterada com sucesso!' });
          this.disabledButton = false;
        }
      }
    }, err => {
      this.showMessageError = true;
      this.disabledButton = false;
      this.msgs.push({ severity: 'error', detail: 'Não foi possível alterar a senha.' });
    });
  }

}
