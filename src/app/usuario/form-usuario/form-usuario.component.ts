import { SelectItem } from 'primeng/api/selectitem';
import { PerfilService } from './../../perfil/perfil.service';
import { PerfilUsuarioLTO } from './../../lto/perfil-usuario-lto';
import { UsuarioFTO } from './../../fto/usuario-fto';
import { ResponseEntity } from './../../model/response-entity';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from './../usuario.service';
import { Message } from 'primeng/api/message';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-form-usuario',
  templateUrl: './form-usuario.component.html',
  styleUrls: ['./form-usuario.component.css']
})
export class FormUsuarioComponent implements OnInit {

  usuarioFormGroup: FormGroup;
  titlePage: string;
  pageForm: string;
  pageList: string;
  msgs: Message[] = [];
  showMessageError: boolean;
  isExclusao: boolean;
  disabledButton: boolean;
  isAtualizacao: boolean;
  idUsuario: number;
  perfilList: SelectItem[] = [];
  labelStatus: string;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private perfilService: PerfilService
  ) { }

  ngOnInit() {
    this.titlePage = "Usuário";
    this.pageForm = "/form-usuario";
    this.pageList = "/list-usuario";
    this.showMessageError = false;
    this.isExclusao = false;
    this.isAtualizacao = false;
    this.disabledButton = false;
    this.idUsuario = null;
    this.labelStatus = "Ativo";

    this.createForm();

    // pega o id do usuario 
    this.activatedRoute.params.subscribe(params => {
      this.idUsuario = + params['id'];
    });

    // pega os dados do usuario
    if (!isNaN(this.idUsuario)) {
      this.usuarioService.getUsuario(this.idUsuario).subscribe((response: ResponseEntity) => {
        this.popularCamposFormulario(response.data);
      });
    }

    //preenche combo perfil
    let listaPerfilUsuarioLTO: PerfilUsuarioLTO[] = [];
    this.perfilList.push({ label: "Selecione", value: 0 });
    this.perfilService.listarTodos().subscribe((response: ResponseEntity) => {
      listaPerfilUsuarioLTO = response.data;
      listaPerfilUsuarioLTO.forEach((perfilLTO, index) => {
        this.perfilList.push({ label: perfilLTO.descricao, value: perfilLTO.idPerfilUsuario });
      })
    });
  }

  private createForm() {
    this.usuarioFormGroup = new FormGroup({
      idUsuario: new FormControl(),
      nome: new FormControl('', [Validators.required]),
      idPerfil: new FormControl('', [Validators.required]),
      cpf: new FormControl('', [Validators.required]),
      login: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      ativo: new FormControl(true)
    });

    if (isNaN(this.idUsuario)) {
      this.usuarioFormGroup.addControl('senha', new FormControl('', Validators.required));
      this.usuarioFormGroup.addControl('novaSenha', new FormControl('', Validators.required));
    }
  }

  public redirectPageList() {
    if (this.isExclusao) {
      this.router.navigate([this.pageList]);
    }
  }

  public cadastrarUsuario(): void {
    this.msgs = [];
    this.disabledButton = true;
    this.usuarioService.cadastrarUsuario(this.usuarioFormGroup.value).subscribe((response: ResponseEntity) => {
      if (response.data != null) {
        this.showMessageError = false;
        this.popularCamposFormulario(response.data);
        this.messageService.add({ severity: 'success', detail: 'Usuário cadastrado com sucesso!' });
        this.disabledButton = false;
      }
    }, err => {
      this.showMessageError = true;
      this.disabledButton = false;
      this.msgs.push({ severity: 'error', detail: 'Não foi possível cadastrar o usuário.' });
    });
  }

  public excluirUsuario(idUsuario: number): void {
    this.msgs = [];
    this.disabledButton = true;
    this.usuarioService.excluirUsuario(idUsuario).subscribe((response: ResponseEntity) => {
      if (response.errors == null) {
        this.showMessageError = false;
        this.isExclusao = true;
        this.messageService.add({ severity: 'success', detail: 'Perfil excluido com sucesso!' });
      }
    }, err => {
      this.showMessageError = true;
      this.msgs.push({ severity: 'error', detail: 'Não foi possível excluir o usuario.' });
      this.disabledButton = false;
      this.isExclusao = false;
    });
  }

  public novoUsuario(): void {
    this.idUsuario = null;
    this.isAtualizacao = false;
    this.usuarioFormGroup.reset();
    this.router.navigate([this.pageForm]);
  }

  private popularCamposFormulario(usuarioFTO: UsuarioFTO) {
    this.idUsuario = usuarioFTO.idUsuario;
    this.isAtualizacao = true;

    this.usuarioFormGroup.setValue({
      idUsuario: new FormControl(),
      nome: usuarioFTO.nome,
      idPerfil: usuarioFTO.perfilUsuarioFTO.idPerfilUsuario,
      cpf: usuarioFTO.cpf,
      login: usuarioFTO.login,
      email: usuarioFTO.email,
      senha: usuarioFTO.senha,
      novaSenha: usuarioFTO.novaSenha,
      ativo: usuarioFTO.ativo
    });

    this.onChangeStatus();
  }

  public onChangeStatus() {
    if (this.usuarioFormGroup.value.ativo) {
      this.labelStatus = "Ativo";
    } else {
      this.labelStatus = "Inativo";
    }
  }

}
