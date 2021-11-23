import {Comment} from "./Comment";
import {User} from "./User";

export class Profile {
	private readonly _profileId: number;
	private readonly _user: User;
	private readonly _comments: Array<Comment>;

	constructor(profileId: number, user: User, comments: Array<Comment>) {
		this._profileId = profileId;
		this._user = user;
		this._comments = comments;
	}

	get profileId(): number {
		return this._profileId;
	}

	get user(): User {
		return this._user;
	}

	get comments(): Array<Comment> {
		return this._comments;
	}
}
