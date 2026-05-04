import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { NgClass } from '@angular/common'
import { AuthService } from '../../services/auth/auth-service';
@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, NgClass],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

  authService = inject(AuthService)
  menuAbierto : boolean = false


  toggleMenu(){
    this.menuAbierto = !this.menuAbierto
  }

  logOut(){
    this.authService.logOut()
  }

}
