import { Injectable } from '@angular/core';
import { ChangePassword } from '../models/changePassword';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public users: User[] = [
    new User({
      Id: 1,
      UserName: 'pepe',
      Name: 'Pepe Garcia Gonzalez',
      Email: 'pegargon@mail.es',
      PhoneNumber: '666111555',
      IsActive: true,
      IsAdmin: true,
    }),
    new User({
      Id: 2,
      UserName: 'jose',
      Name: 'Jose Sanchez Rodriguez',
      Email: 'josanro@mail.es',
      PhoneNumber: '666222555',
      IsActive: false,
      IsAdmin: false,
    }),
    new User({
      Id: 3,
      UserName: 'juan',
      Name: 'Juan Hernandez Heredia',
      Email: 'juhehe@mail.es',
      PhoneNumber: '666333555',
      IsActive: true,
      IsAdmin: false,
    }),
  ];

  constructor() { }

  public changePassword(idUser: any, changePassword: ChangePassword) {
    // return this.http.put(this.apiRest + '/' + idUser + '/Password', changePassword);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('users.password_change_successfully');
      }, 1000);
    });
  }

  public saveUser(user: User) {
    if (user.isNewItem()) {
      // return this.http.post(this.apiRest, user.toJson())
      //   .then(this.onSaveUser.bind(this));
      user.Id = Math.random();
    } else {
      // return this.http.put(this.apiRest + '/' + user.Id, user.toJson())
      //   .then(this.onSaveUser.bind(this));
    }

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('users.user_saved_successfully');
      }, 1000);
    });
  }

  public deleteUser(user: User) {
    // return this.http.authDelete(this.apiRest + '/' + user.Id).then(this.onDeleteUser.bind(this));
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('users.user_deleted_successfully');
      }, 1000);
    });
  }
}
