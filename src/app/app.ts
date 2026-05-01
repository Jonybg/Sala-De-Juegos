import { Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Navbar } from "./core/layout/navbar/navbar";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  router = inject(Router)

  isAuthRoute(): boolean{
    return this.router.url.includes('login') || this.router.url.includes('register');
  }

}
