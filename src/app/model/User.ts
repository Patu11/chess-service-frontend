import {Comment} from "./Comment";

export class User {
	private readonly _email: string;
	private readonly _username: string;
	private readonly _password: string;
	private readonly _comments: Array<Comment>;

	constructor(email: string, username: string, password: string, comments: Array<Comment>) {
		this._email = email;
		this._username = username;
		this._password = password;
		this._comments = comments;
	}

	get email(): string {
		return this._email;
	}

	get username(): string {
		return this._username;
	}

	get password(): string {
		return this._password;
	}

	get comments(): Comment[] {
		return this._comments;
	}
}
