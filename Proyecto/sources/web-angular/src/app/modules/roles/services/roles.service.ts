import { Injectable } from '@angular/core';
import { Rol } from '../models/rol';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  public roles: Rol[] = [
    new Rol({ Id: 1, Name: 'Administrador', Description: 'Administrador del sistema' }),
    new Rol({ Id: 2, Name: 'Coordinador', Description: 'Coordinador de miembros' }),
    new Rol({ Id: 3, Name: 'Usuario', Description: 'Usuario miembro' }),
  ];

  constructor() { }
}
