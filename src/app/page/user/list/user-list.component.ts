import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { User } from 'src/app/domain/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = []
  displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'address', 'actions'];

  clickedRows = new Set<User>();

  constructor(
    private userService: UserService, 
    public router: Router) { }

  ngOnInit() {
    if (!this.users.length){
      this.getUsers();
    }
  }

  getUsers() {
    this.userService.getUsers().subscribe(users => this.users = users);
  }

  deleteUser(id: number) {
    if (confirm('Tem certeza que deseja excluir esta pessoa?')) {
      this.userService.deleteUser(id).subscribe(() => {
        this.users = this.users.filter(user => user.id !== id);
      });
    }
  }

  editUser(id: number){
    this.router.navigate([`/users/edit/${id}`])
  }
}
