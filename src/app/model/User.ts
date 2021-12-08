import {Comment} from "./Comment";
import {Friend} from "./Friend";
import {Role} from "./Role";
import {GameModel} from "./GameModel";

export class User {
	private readonly _email: string;
	private readonly _username: string;
	private readonly _password: string;
	private readonly _comments: Array<Comment>;
	private readonly _friends: Array<Friend>;
	private readonly _roles: Set<Role>;
	private readonly _games: Array<GameModel>;

	constructor(email: string, username: string, password: string, comments: Array<Comment>, friends: Array<Friend>, roles: Set<Role>, games: Array<GameModel>) {
		this._email = email;
		this._username = username;
		this._password = password;
		this._comments = comments;
		this._friends = friends;
		this._roles = roles;
		this._games = games;
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
	
	get games(): Array<GameModel> {
		return this._games;
	}
}
