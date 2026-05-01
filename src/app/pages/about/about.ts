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
  
ngOnInit(): void {
  this.userGithubService.loadUserGithub()
  }
 
}
