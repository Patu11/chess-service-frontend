import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {User} from "../model/User";
import {Role} from "../model/Role";
import {Router} from "@angular/router";

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
	userAlreadyExists: boolean = false;
	emptyField: boolean = true;
	message: string = '';
	email: string = '';
	username: string = '';
	password: string = '';

	constructor(private userService: UserService, private route: Router) {
	}

	onSignup() {
		if (!this.checkIfEmptyFields()) {
			let user = new User(this.email, this.username, this.password, [], [], new Set<Role>([new Role('USER')]), []);
			this.userService.createUser(user).subscribe(
				(response) => {
					this.route.navigate(['/login']);
				},
				error => {
					console.log(error);
					this.userAlreadyExists = error.error.status == 409;
					this.message = error.error.message;
				}
			);
		}
	}

	checkIfEmptyFields() {
		let out;
		if (!this.email) {
			this.message = 'Email cannot be empty';
			out = true;
		} else if (!this.username) {
			this.message = 'Username cannot be empty';
			out = true;
		} else if (!this.password) {
			this.message = 'Password cannot be empty';
			out = true;
		} else {
			out = false;
		}
		this.emptyField = out;
		return out;
	}

	ngOnInit(): void {
	}

}
