import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';

@Injectable({
  providedIn: 'root'
})
export class PostagemService {

  constructor(private http: HttpClient) { }

  token_em_header = {
    headers: new HttpHeaders().set("Authorization", environment.token)
  }

  getAllPostagens(): Observable<Postagem[]> {
    return this.http.get<Postagem[]>(`${environment.baseUrl}/postagens`, this.token_em_header);
  }

  postPostagem(postagem: Postagem): Observable<Postagem> {
    return this.http.post<Postagem>(`${environment.baseUrl}/postagens`, postagem, this.token_em_header);
  }

  putPostagem(postagem: Postagem) {
    return this.http.put<Postagem>(`${environment.baseUrl}/postagens`, postagem, this.token_em_header);
  }

  getByIdPostagem(id: number): Observable<Postagem> {
    return this.http.get<Postagem>(`${environment.baseUrl}/postagens/${id}`, this.token_em_header);
  }

  deletePostagem(id: number) {
    return this.http.delete(`${environment.baseUrl}/postagens/${id}`, this.token_em_header);
  }
}
