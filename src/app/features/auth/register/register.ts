import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
 form = new FormGroup({
    email:    new FormControl('', [Validators.required, Validators.email]),
    nombre:   new FormControl('', [Validators.required,Validators.minLength(2),Validators.maxLength(15)]),
    apellido: new FormControl('', [Validators.required,Validators.minLength(2),Validators.maxLength(15)]),
    edad:     new FormControl<number | null>(null, [Validators.required, Validators.min(13),Validators.max(120)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6),Validators.maxLength(15)]),
  });

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      console.log('formulario inválido');
    } else {
      console.log(this.form.value);
    }
  }

}
