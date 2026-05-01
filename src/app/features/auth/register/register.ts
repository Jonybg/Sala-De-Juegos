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
    nombre:   new FormControl('', [Validators.required]),
    apellido: new FormControl('', [Validators.required]),
    edad:     new FormControl<number | null>(null, [Validators.required, Validators.min(13)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
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
