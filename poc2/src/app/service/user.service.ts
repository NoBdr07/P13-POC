import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private selectedUser: string = '';

  setSelectedUser(user: string) {
    this.selectedUser = user;
  }

  getSelectedUser(): string {
    return this.selectedUser;
  }
}
