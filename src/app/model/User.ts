import {Comment} from "./Comment";
import {Friend} from "./Friend";
import {Role} from "./Role";

export class User {
	private readonly _email: string;
	private readonly _username: string;
	private readonly _password: string;
	private readonly _comments: Array<Comment>;
	private readonly _friends: Array<Friend>;
	private readonly _roles: Set<Role>;


	constructor(email: string, username: string, password: string, comments: Array<Comment>, friends: Array<Friend>, roles: Set<Role>) {
		this._email = email;
		this._username = username;
		this._password = password;
		this._comments = comments;
		this._friends = friends;
		this._roles = roles;
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

	get friends(): Array<Friend> {
		return this._friends;
	}

	get roles(): Set<Role> {
		return this._roles;
	}
}
