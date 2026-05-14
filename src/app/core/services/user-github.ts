import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { UserGithubModel } from '../models/userGithub.model';
@Injectable({
  providedIn: 'root',
})
export class UserGithub {
  private http = inject(HttpClient)
  private userGithub = signal<UserGithubModel | null>(null)
  private URL = "https://api.github.com/users/jonybg"
  loading = signal<boolean>(true);
  error = signal<string | null>(null);
  user = this.userGithub.asReadonly();



  loadUserGithub(){
    this.loading.set(true)
    this.error.set(null);

    this.http.get<any>(this.URL).subscribe({
      next: (data) =>{
        const userMapeado:UserGithubModel ={
          nombre: data.name,
          foto: data.avatar_url,
          followers: data.followers,
          following : data.following,
          repositorios: data.public_repos

        }
      this.userGithub.set(userMapeado)
      this.loading.set(false)
      },
      error: (_err) => {
        this.error.set("Error al cargador el usuario de github")
        this.loading.set(false)
      }
    })
  }



}
