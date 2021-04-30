import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { AlertasService } from 'src/app/service/alertas.service';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  user: User = new User();
  idUser = environment.id;
  confirmSenha: string;
  tipoUsuario: string;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private alertas: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0,0); //para voltar ao topo da tela, quando abrir a página de editar as postagens
    if (environment.token == "") {
      this.router.navigate(["/entrar"]);
    }
    this.idUser = this.route.snapshot.params["id"];
    this.findByIdUser(this.idUser);
  }

  confirmarSenha(event: any) {
    this.confirmSenha = event.target.value;
  }

  tipoUser(event: any) {
    this.tipoUsuario = event.target.value;
  }

  findByIdUser(id: number) {
    this.authService.getByIdUser(id).subscribe((resp: User)=>{
      this.user = resp;
    });
  }

  atualizar() {
    this.user.tipo = this.tipoUsuario;

    if(this.user.senha != this.confirmSenha) {
      this.alertas.showAlertDanger("As senhas estão diferentes");
    }
    else {
      this.authService.cadastrar(this.user).subscribe((resp: User) => {
        this.user = resp;
        this.router.navigate(["/inicio"]);
        this.alertas.showAlertSuccess("Usuário atualizado com sucesso! Por favor, faça o login novamente");
        environment.token = "";
        environment.nome = "";
        environment.id = 0;
        environment.foto = "";
        this.router.navigate(["/entrar"]);
      });
    }
  }

}
