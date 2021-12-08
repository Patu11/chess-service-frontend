export class Player {
	private _username: string;
	private _whiteSide: boolean;


	constructor(username: string, whiteSide: boolean) {
		this._username = username;
		this._whiteSide = whiteSide;
	}

	public getUsername(): string {
		return this._username;
	}

	public isWhiteSide(): boolean {
		return this._whiteSide;
	}
}
