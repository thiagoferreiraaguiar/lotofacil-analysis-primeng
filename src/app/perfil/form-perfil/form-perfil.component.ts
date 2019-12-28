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

  perfilForm: FormGroup;
  titlePage: string;
  pageForm: string;
  pageList: string;
  perfilUsuarioFTO: PerfilUsuarioFTO = new PerfilUsuarioFTO();
  msgs: Message[] = [];
  showMessageError: boolean;
  isExclusao: boolean;
  disabledButton: boolean;

  ngOnInit() {
    var idPerfil: number;
    this.titlePage = "Perfil";
    this.pageForm = "/form-perfil";
    this.pageList = "/list-perfil";
    this.showMessageError = false;
    this.isExclusao = false;
    this.disabledButton = false;

    this.createForm();

    // pega o id do perfil 
    this.activatedRoute.params.subscribe(params => {
      idPerfil = + params['id'];
    });

    // pega os dados do perfil
    if (!isNaN(idPerfil)) {
      this.perfilService.getPerfilUsuario(idPerfil).subscribe((response: ResponseEntity) => {
        this.perfilUsuarioFTO = response.data;
        this.popularCamposFormulario(this.perfilUsuarioFTO);
      });
    }
  }

  private createForm() {
    this.perfilForm = new FormGroup({
      idPerfilUsuario: new FormControl(),
      sigla: new FormControl('', [Validators.required, Validators.minLength(5)]),
      descricao: new FormControl('', Validators.required)
    });
  }

  public cadastrarPerfil(): void {
    this.msgs = [];
    this.disabledButton = true;
    this.perfilService.cadastrarPerfilUsuario(this.perfilForm.value).subscribe((response: ResponseEntity) => {
      if (response.data != null) {
        this.showMessageError = false;
        this.perfilUsuarioFTO = response.data;
        this.popularCamposFormulario(this.perfilUsuarioFTO);
        this.messageService.add({ severity: 'success', detail: 'Perfil cadastrado com sucesso!' });
        this.disabledButton = false;
      }
    }, err => {
      this.showMessageError = true;
      this.msgs.push({ severity: 'error', detail: 'Não foi possível cadastrar o perfil.' });
      this.disabledButton = false;
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

  public isNumber(idPerfil: number): Boolean {
    return !isNaN(idPerfil);
  }

  public redirectPageList() {
    if (this.isExclusao) {
      this.router.navigate([this.pageList]);
    }
  }

  public novoPerfil(): void {
    this.perfilUsuarioFTO = new PerfilUsuarioFTO();
    this.perfilForm.reset();
    this.router.navigate([this.pageForm]);
  }

  private popularCamposFormulario(perfilUsuarioFTO: PerfilUsuarioFTO) {
    this.perfilForm.setValue({
      idPerfilUsuario: perfilUsuarioFTO.idPerfilUsuario,
      sigla: perfilUsuarioFTO.sigla,
      descricao: perfilUsuarioFTO.descricao
    })
  }

}
