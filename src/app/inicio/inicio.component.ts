import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  postagem: Postagem = new Postagem();
  tema: Tema = new Tema;
  listaTemas: Tema[];

  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private temaService: TemaService
  ) { }

  ngOnInit() {

    if (environment.token == "") {
      alert("Sua sessão expirou");
      this.router.navigate(["/entrar"]);
    }
    
    this.findAllTemas();
  }

  findAllTemas() {
    this.temaService.getAllTema().subscribe((resp: Tema[])=>{
      this.listaTemas = resp;
    });
  }

  publicar() {

  }

}
