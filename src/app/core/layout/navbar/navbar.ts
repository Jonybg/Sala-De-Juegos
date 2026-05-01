import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { NgClass } from '@angular/common'
@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, NgClass],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {


  menuAbierto : boolean = false


  toggleMenu(){
    this.menuAbierto = !this.menuAbierto
  }

}
