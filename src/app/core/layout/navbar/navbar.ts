import { Component, inject, Renderer2 } from '@angular/core';
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

  readonly authService = inject(AuthService)
  private readonly renderer = inject(Renderer2);
  menuAbierto : boolean = false


  estaLogueado(): boolean{
    return this.authService.usuario() !== null;
  }

 toggleMenu() {
    this.menuAbierto = !this.menuAbierto;
    if (this.menuAbierto) {
      this.renderer.setStyle(document.body, 'overflow', 'hidden');
    } else {
      this.renderer.removeStyle(document.body, 'overflow');
    }
  }

  logOut() {
    this.renderer.removeStyle(document.body, 'overflow');
    this.authService.logOut();
  }

}
