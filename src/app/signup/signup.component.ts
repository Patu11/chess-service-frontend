import {Component, OnInit} from '@angular/core';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

	email: string = '';
	username: string = '';
	password: string = '';

	constructor() {
	}

	onSignup() {
		console.log(this.email);
		console.log(this.username);
		console.log(this.password);
	}

	ngOnInit(): void {
	}

}
