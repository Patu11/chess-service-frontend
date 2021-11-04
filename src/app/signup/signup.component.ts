import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {User} from "../models/User";

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
	userAlreadyExists: boolean = false;
	message: string = '';
	email: string = '';
	username: string = '';
	password: string = '';

	constructor(private userService: UserService) {
	}

	onSignup() {
		let user = new User(this.email, this.username, this.password);
		this.userService.createUser(user).subscribe(
			response => {

			},
			error => {
				this.userAlreadyExists = error.error.status == 409;
				this.message = error.error.message;
			}
		);
	}

	ngOnInit(): void {
	}

}
