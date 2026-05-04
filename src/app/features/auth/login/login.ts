import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth-service';
import { Alerts } from '../../../core/services/alerts/alerts';
import { RouterLink } from "@angular/router";
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  
  ngOnInit(): void {
    this.loading.set(false);
    this.form.reset();
  }



  authBd = inject(AuthService)
  alerts = inject(Alerts)
  loading = signal<boolean>(false);

  form = new FormGroup({
    email: new FormControl("",[Validators.required,Validators.email]),
    password : new FormControl("",[Validators.required, Validators.minLength(6)])
  })


  async onSubmit(){
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    try {
      await this.authBd.login(this.form.getRawValue());
      this.alerts.loginSucess()
    } catch (err) {
      this.alerts.loginFail()
      console.error("Error:")
    }finally{
      this.loading.set(false)
    }
    
  }


  async fastAccess(email:string, password:string){

    this.form.patchValue({email,password})
    this.onSubmit()

  }



}
