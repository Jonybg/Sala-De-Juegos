import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'


@Injectable({
  providedIn: 'root',
})
export class Alerts {

  // funciones para el login, mas adelante para register

  loginSucess(){
  Swal.fire({
  title: "Bienvenido! a pixelZone",
  icon: "success",
  draggable: true,
  customClass:{
    popup:'swal-neon'
  }
  });
  }


  loginFail(){
    Swal.fire({
      icon: "error",
      title:"Oops...",
      text: "Creedenciales incorrectas, revise el correo o contraseña",
       customClass:{
         popup:'swal-neon'
     }
    })
  }


  // funciones para register

  registerSucces(){
  Swal.fire({
    title: "Registro Exitoso!",
    icon: "success",
    draggable: true,
    customClass:{
      popup:'swal-neon'
  },
  });
  }


  registerEmailYaExiste(){
  Swal.fire({
    title: "Oops...",
    icon: "error",
    text: "El Mail ingresado ya esta registrado",
    customClass:{
      popup:'swal-neon'
  },
  });
  }


  registerFail(){
        Swal.fire({
      icon: "error",
      title:"Oops...",
      text: "Hubo un error intente de nuevo mas tade!",
       customClass:{
         popup:'swal-neon'
     }
    })
  }




}
