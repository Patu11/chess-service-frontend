import {Component, Input, OnInit} from '@angular/core';
import {User} from "../model/User";
import {UserService} from "../services/user.service";

@Component({
	selector: 'app-user-list',
	templateUrl: './user-list.component.html',
	styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

	@Input()
	users: User[] = [];

	constructor(private userService: UserService) {
		this.userService.getAllUsers().subscribe(
			(response) => {
				this.users = response;
			},
			(error) => {
				console.log(error);
			}
		);
	}

	onDelete(user: User) {
		this.userService.deleteUserByEmail(user.email).subscribe(
			response => {
				console.log(response);
			},
			error => {
				console.log(error);
			}
		);
	}

	ngOnInit(): void {
	}

}
