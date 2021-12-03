import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";
import {TokenParser} from "../model/TokenParser";

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
				let parser = new TokenParser(response.token);
				sessionStorage.setItem('USER_EMAIL', this.email);
				sessionStorage.setItem('USER_PASSWORD', this.password);
				sessionStorage.setItem('USER_USERNAME', parser.username);
				sessionStorage.setItem('USER_ROLES', parser.roles);
				this.route.navigate(['/home']);
				// this.route.navigateByUrl('/home');
			},
			error => {
				console.log(error);
				this.error = true;
			}
		);
	}

	ngOnInit(): void {
	}

}
