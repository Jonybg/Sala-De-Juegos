import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./core/layout/mainlayout/mainlayout').then(m => m.Mainlayout),
    children: [
      {
        path: '',
        loadComponent: () => import('./features/home/home').then(m => m.Home),
        pathMatch: 'full'
      },
      {
        path: 'chat',
        loadComponent: () => import('./features/chat/chat').then(m => m.Chat)
      },
      {
        path: 'games',
        loadComponent: () => import('./features/games/games').then(m => m.Games)
      },
      {
        path: 'about',
        loadComponent: () => import('./pages/about/about').then(m => m.About)
      },
      {
        path: 'results',
        loadComponent: () => import('./features/results/results').then(m => m.Results)
      },
    ]
  },
  {
    path: 'auth',
    loadComponent: () => import('./core/layout/authlayout/authlayout').then(m => m.Authlayout),
    children: [
      {
        path: 'login',
        loadComponent: () => import('./features/auth/login/login').then(m => m.Login)
      },
      {
        path: 'register',
        loadComponent: () => import('./features/auth/register/register').then(m => m.Register)
      },
    ]
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];