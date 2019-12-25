import { ResponseEntity } from './../../model/response-entity';
import { PerfilService } from './../perfil.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PerfilUsuarioFTO } from './../../fto/perfil-usuario-fto';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-perfil',
  templateUrl: './form-perfil.component.html',
  styleUrls: ['./form-perfil.component.css']
})
export class FormPerfilComponent implements OnInit {

  constructor(
    private perfilUsuarioService: PerfilService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  perfilForm: FormGroup;
  titlePage: string;
  pageForm: string;
  pageList: string;
  perfilUsuarioFTO: PerfilUsuarioFTO = new PerfilUsuarioFTO();

  ngOnInit() {
    var idPerfil: number;
    this.titlePage = "Perfil";
    this.pageForm = "/form-perfil";
    this.pageList = "/list-perfil";

    this.createForm();

    // pega o id do perfil 
    this.activatedRoute.params.subscribe(params => {
      idPerfil = + params['id'];
    });

    // pega os dados do perfil
    if (!isNaN(idPerfil)) {
      this.perfilUsuarioService.getPerfilUsuario(idPerfil).subscribe((response: ResponseEntity) => {
        this.perfilUsuarioFTO = response.data;

        // preenche os campos do formulario
        this.perfilForm.setValue({
          sigla: this.perfilUsuarioFTO.sigla,
          descricao: this.perfilUsuarioFTO.descricao
        })
      });
    }
  }

  private createForm() {
    this.perfilForm = new FormGroup({
      sigla: new FormControl('', [Validators.required, Validators.minLength(5)]),
      descricao: new FormControl('', Validators.required)
    });
  }

  public cadastrarPerfil(): void {
  }

  public isNumber(idPerfil: number): Boolean {
    return !isNaN(idPerfil);
  }

}
