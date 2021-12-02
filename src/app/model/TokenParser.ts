export class TokenParser {
	private readonly _email: string;
	private readonly _password: string;
	private readonly _username: string;
	private readonly _roles: string;


	constructor(token: string) {
		let parsed = atob(token).split(':');
		this._email = parsed[0];
		this._password = parsed[1];
		this._username = parsed[2];
		this._roles = parsed[3]
	}


	get email(): string {
		return this._email;
	}

	get password(): string {
		return this._password;
	}

	get username(): string {
		return this._username;
	}

	get roles(): string {
		return this._roles;
	}
}
