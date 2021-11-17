export class Player {
	private _whiteSide: boolean;

	constructor(whiteSide: boolean) {
		this._whiteSide = whiteSide;
	}

	public isWhiteSide(): boolean {
		return this._whiteSide;
	}
}
