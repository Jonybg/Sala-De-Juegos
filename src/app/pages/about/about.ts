import { Component, inject, OnInit } from '@angular/core';
import { UserGithub } from '../../core/services/user-github';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About implements OnInit {

  userGithubService = inject(UserGithub)
  user = this.userGithubService.user
  loading = this.userGithubService.loading;
  error = this.userGithubService.error
  
ngOnInit(): void {
  setTimeout(() => {
    this.userGithubService.loadUserGithub();
  }, 1000); 
}
 
}
