import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { UserGithubModel } from '../models/userGithub.model';
@Injectable({
  providedIn: 'root',
})
export class UserGithub {
  private http = inject(HttpClient)
  private URL = "https://api.github.com/users/jonybg"


  private _userGithub = signal<UserGithubModel | null>(null)
  private  _loading = signal<boolean>(true);
  private  _error = signal<string | null>(null);



  readonly user = this._userGithub.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  loadUserGithub(){
    this._loading.set(true)
    this._error.set(null);

    this.http.get<any>(this.URL).subscribe({
      next: (data) =>{
        const userMapeado:UserGithubModel ={
          nombre: data.name,
          foto: data.avatar_url,
          followers: data.followers,
          following : data.following,
          repositorios: data.public_repos

        }
      this._userGithub.set(userMapeado)
      this._loading.set(false)
      },
      error: (_err) => {
        this._error.set("Error al cargador el usuario de github")
        this._loading.set(false)
      }
    })
  }



}
