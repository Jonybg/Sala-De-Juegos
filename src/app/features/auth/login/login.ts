import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth-service';
import { Alerts } from '../../../core/services/alerts/alerts';
import { Router, RouterLink } from "@angular/router";
import { CardNeon } from "../../../shared/directives/card-neon";
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, CardNeon],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  
  ngOnInit(): void {
    this._loading.set(false);
    this.form.reset();
  }



  private readonly authBd = inject(AuthService)
  private readonly alerts = inject(Alerts)
  private readonly router = inject(Router)
  private readonly _loading = signal<boolean>(false);
  readonly loading = this._loading.asReadonly();

  
  readonly form = new FormGroup({
    email: new FormControl("",[Validators.required,Validators.email]),
    password : new FormControl("",[Validators.required, Validators.minLength(6)])
  })


  async onSubmit(){
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }

    this._loading.set(true);
    try {
      await this.authBd.login(this.form.getRawValue());
      this.router.navigate(['/']);
      this.alerts.loginSucess()
    } catch (err) {
      this.alerts.loginFail()
      console.error("Error:")
    }finally{
      this._loading.set(false)
    }
    
  }


  async fastAccess(email:string, password:string){

    this.form.patchValue({email,password})
 

  }



}
