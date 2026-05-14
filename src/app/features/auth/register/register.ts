import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth-service';
import { Alerts } from '../../../core/services/alerts/alerts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  loading = signal<boolean>(false);
  router = inject(Router)
  alerts = inject(Alerts)
  private authBD = inject(AuthService)


 form = new FormGroup({
    email:    new FormControl('', [Validators.required, Validators.email]),
    nombre:   new FormControl('', [Validators.required,Validators.minLength(2),Validators.maxLength(15)]),
    apellido: new FormControl('', [Validators.required,Validators.minLength(2),Validators.maxLength(15)]),
    edad:     new FormControl<number | null>(null, [Validators.required, Validators.min(13),Validators.max(120)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6),Validators.maxLength(15)]),
  });

  async onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      console.log(this.form.getRawValue())
      return;
    } 

    this.loading.set(true)
    try {
      await this.authBD.register(this.form.getRawValue())
      this.alerts.registerSucces();
      this.navegarAlLogin()
    } catch (err:any) {
      if(err.message === 'User already registered'){
        this.alerts.registerEmailYaExiste()
      }else{
        this.alerts.registerFail()
      }
    }
    finally{
      this.loading.set(false)
    }
  }



  navegarAlLogin(){
    this.router.navigate(['/auth/login'])
  }

}
