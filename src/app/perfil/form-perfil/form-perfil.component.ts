import { Message } from 'primeng/api/message';
import { ResponseEntity } from './../../model/response-entity';
import { PerfilService } from './../perfil.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PerfilUsuarioFTO } from './../../fto/perfil-usuario-fto';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-form-perfil',
  templateUrl: './form-perfil.component.html',
  styleUrls: ['./form-perfil.component.css']
})
export class FormPerfilComponent implements OnInit {

  constructor(
    private perfilService: PerfilService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService
  ) { }

  perfilFormGroup: FormGroup;
  titlePage: string;
  pageForm: string;
  pageList: string;
  msgs: Message[] = [];
  showMessageError: boolean;
  isExclusao: boolean;
  disabledButton: boolean;
  isAtualizacao: boolean;
  idPerfil: number;

  ngOnInit() {
    this.titlePage = "Perfil";
    this.pageForm = "/form-perfil";
    this.pageList = "/list-perfil";
    this.showMessageError = false;
    this.isExclusao = false;
    this.isAtualizacao = false;
    this.disabledButton = false;
    this.idPerfil = null;

    this.createForm();

    // pega o id do perfil 
    this.activatedRoute.params.subscribe(params => {
      this.idPerfil = + params['id'];
    });

    // pega os dados do perfil
    if (!isNaN(this.idPerfil)) {
      this.perfilService.getPerfilUsuario(this.idPerfil).subscribe((response: ResponseEntity) => {
        this.popularCamposFormulario(response.data);
      });
    }
  }

  private createForm() {
    this.perfilFormGroup = new FormGroup({
      idPerfilUsuario: new FormControl(),
      sigla: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]),
      descricao: new FormControl('', Validators.required)
    });
  }

  public cadastrarPerfil(): void {
    this.msgs = [];
    this.disabledButton = true;
    this.perfilService.cadastrarPerfilUsuario(this.perfilFormGroup.value).subscribe((response: ResponseEntity) => {
      if (response.data != null) {
        this.showMessageError = false;
        this.popularCamposFormulario(response.data);
        this.messageService.add({ severity: 'success', detail: 'Perfil cadastrado com sucesso!' });
        this.disabledButton = false;
      }
    }, err => {
      this.showMessageError = true;
      this.disabledButton = false;
      this.msgs.push({ severity: 'error', detail: 'Não foi possível cadastrar o perfil.' });      
    });
  }

  public excluirPerfilUsuario(idPerfilUsuario: number): void {
    this.msgs = [];
    this.disabledButton = true;
    this.perfilService.excluirPerfilUsuario(idPerfilUsuario).subscribe((response: ResponseEntity) => {
      if (response.errors == null) {
        this.showMessageError = false;
        this.isExclusao = true;
        this.messageService.add({ severity: 'success', detail: 'Perfil excluido com sucesso!' });
      }
    }, err => {
      this.showMessageError = true;
      this.msgs.push({ severity: 'error', detail: 'Não foi possível excluir o perfil.' });
      this.disabledButton = false;
      this.isExclusao = false;
    });
  }

  public redirectPageList() {
    if (this.isExclusao) {
      this.router.navigate([this.pageList]);
    }
  }

  public novoPerfil(): void {
    this.idPerfil = null;
    this.isAtualizacao = false;
    this.perfilFormGroup.reset();
    this.router.navigate([this.pageForm]);
  }

  private popularCamposFormulario(perfilUsuarioFTO: PerfilUsuarioFTO) {
    this.idPerfil = perfilUsuarioFTO.idPerfilUsuario;
    this.isAtualizacao = true;

    this.perfilFormGroup.setValue({
      idPerfilUsuario: perfilUsuarioFTO.idPerfilUsuario,
      sigla: perfilUsuarioFTO.sigla,
      descricao: perfilUsuarioFTO.descricao
    })
  }

}
