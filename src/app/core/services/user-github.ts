import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { UserGithubModel } from '../models/userGithub.model';
@Injectable({
  providedIn: 'root',
})
export class UserGithub {
  private http = inject(HttpClient)
  user = signal<UserGithubModel | null>(null)
  private URL = "https://api.github.com/users/jonybg"

  loadUserGithub(){
    this.http.get<any>(this.URL).subscribe({
      next: (data) =>{
        const userMapeado:UserGithubModel ={
          nombre: data.name,
          foto: data.avatar_url,
          followers: data.followers,
          following : data.following,
          repositorios: data.public_repos

        }
      this.user.set(userMapeado)
      },
      error: (err) => {
        console.error(err)
      }
    })
  }



}
