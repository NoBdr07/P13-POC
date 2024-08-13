import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrl: './selector.component.css'
})
export class SelectorComponent {
  constructor(private router: Router, private userService : UserService) { }

  selectedUser: string = '';

  selectUser(user: string) {
    this.selectedUser = user;
  }

  connect() {
    console.log('Connecting as ' + this.selectedUser);
    this.userService.setSelectedUser(this.selectedUser);
      this.router.navigate(['/home']);
  }
}
