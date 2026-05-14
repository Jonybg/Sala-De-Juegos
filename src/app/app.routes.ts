import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path :"",
        redirectTo: "home",
        pathMatch: "full"
    },
    {
        path: "home",
        loadComponent : () => import("./features/home/home").then(m=>m.Home)
    },
    {
        path: 'chat',
        loadComponent: () => import('./features/chat/chat').then(m=>m.Chat)
      },
    {
        path: "games",
        loadComponent : () => import("./features/games/games").then(m=>m.Games)
    },
    {
        path: "about",
        loadComponent : () => import("./pages/about/about").then(m=>m.About)
    },
    {
        path : "results",
        loadComponent : () => import("./features/results/results").then(m=>m.Results)
    },
    {
        path: "login",
        loadComponent : () => import("./features/auth/login/login").then(m=>m.Login)
    },
    {
        path: "register",
        loadComponent : () => import("./features/auth/register/register").then(m=>m.Register)
    },
    {
        path :"**",
        redirectTo: "home",
        pathMatch: "full"
    }
];
