export class Friend {
	private _sender: string;
	private _user1: string;
	private _user2: string;
	private _status: boolean;


	constructor(sender: string, user1: string, user2: string, status: boolean) {
		this._sender = sender;
		this._user1 = user1;
		this._user2 = user2;
		this._status = status;
	}


	get user1(): string {
		return this._user1;
	}

	get user2(): string {
		return this._user2;
	}

	get status(): boolean {
		return this._status;
	}


	get sender(): string {
		return this._sender;
	}
}
