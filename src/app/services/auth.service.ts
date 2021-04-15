import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model'

import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private apikey = 'AIzaSyALrzLSm4Nyu9wYMCrRFwyhLSDJxXdm3wA';

  userToken: string;


  // Crear usuario
  // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  //  Login usuario
  // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]



  constructor( private http: HttpClient ) {
    this.leerToken();
  }

  logout( ){
    localStorage.removeItem('token');
  }

  login( usuario: UsuarioModel ){
    const authData = {
      ...usuario,
      returnSecureToken: true
    };

    console.log(usuario.nombre);

    return this.http.post(
      `${ this.url }signInWithPassword?key=${ this.apikey }`,
      authData
      ).pipe(

        map( resp => {
  
          console.log('Entro en el mapa del RXJS');
          this.guardarToken( resp['idToken'] );
          return resp;
        })
      );
  }

  nuevoUsuario( usuario: UsuarioModel ){
    const authData = {
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(
      `${ this.url }signUp?key=${ this.apikey }`,
      authData
    ).pipe(

      map( resp => {

        console.log('Entro en el mapa del RXJS');
        this.guardarToken( resp['idToken'] );
        return resp;
      })
    );

  }

  private guardarToken( idToken: string ) {

    this.userToken = idToken;
    localStorage.setItem('token', idToken);

  }

  leerToken(){
    if ( localStorage.getItem('token') ) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }


    return this.userToken;
  }

  estaAutenticado(): boolean{

    return this.userToken.length > 2;

  }


}
