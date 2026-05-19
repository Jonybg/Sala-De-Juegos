import { Component, inject, OnInit } from '@angular/core';
import { UserGithub } from '../../core/services/user-github';
import { CardNeon } from "../../shared/directives/card-neon";

@Component({
  selector: 'app-about',
  imports: [CardNeon],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About implements OnInit {
//hacerlos privados los atributos de la clase
  private userGithubService = inject(UserGithub)
  readonly user = this.userGithubService.user
  readonly loading = this.userGithubService.loading;
  readonly error = this.userGithubService.error
  
ngOnInit(): void {
  setTimeout(() => {
    this.userGithubService.loadUserGithub();
  }, 1000); 
}
 
}
