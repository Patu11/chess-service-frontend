import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {LoginState} from "../model/LoginState";

@Injectable({
	providedIn: 'root'
})
export class DataService {

	state: LoginState;

	private messageSource: BehaviorSubject<LoginState>;
	currentMessage: Observable<LoginState>;

	constructor() {
		let email = sessionStorage.getItem('USER_EMAIL');
		let password = sessionStorage.getItem('USER_PASSWORD');
		let username = sessionStorage.getItem('USER_USERNAME');
		let roles = sessionStorage.getItem('USER_ROLES');
		this.state = new LoginState(email ? email : '', password ? password : '', username ? username : '', roles ? roles : '');
		this.messageSource = new BehaviorSubject(this.state);
		this.currentMessage = this.messageSource.asObservable();
	}

	changeMessage(loginState: LoginState) {
		this.messageSource.next(loginState)
	}
}
