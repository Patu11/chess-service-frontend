export class LoginState {
	private _email: string;
	private _password: string;
	private _username: string;
	private _role: string;


	constructor(email: string, password: string, username: string, role: string) {
		this._email = email;
		this._password = password;
		this._username = username;
		this._role = role;
	}


	get email(): string {
		return this._email;
	}

	set email(value: string) {
		this._email = value;
	}

	get password(): string {
		return this._password;
	}

	set password(value: string) {
		this._password = value;
	}

	get username(): string {
		return this._username;
	}

	set username(value: string) {
		this._username = value;
	}

	get role(): string {
		return this._role;
	}

	set role(value: string) {
		this._role = value;
	}
}
