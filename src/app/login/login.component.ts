import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";
import {User} from "../model/User";

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	email: string = '';
	password: string = '';
	error: boolean = false;

	constructor(private userService: UserService, private route: Router) {
	}

	onLogin() {
		this.userService.login(this.email, this.password).subscribe(
			response => {
				this.userService.getUserByEmail(this.email).subscribe(
					response => {
						console.log(response);
					},
					error => {
						console.log(error);
					}
				);
				this.route.navigate(['/home']);
			},
			error => {
				this.error = true;
			}
		);
	}

	ngOnInit(): void {
	}

}
