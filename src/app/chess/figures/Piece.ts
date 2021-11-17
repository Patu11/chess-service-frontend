import {Board} from "../Board";
import {Spot} from "../Spot";

export abstract class Piece {
	private _killed: boolean = false;
	private _white: boolean = false;

	constructor(white: boolean) {
		this.setWhite(white);
	}

	public isKilled(): boolean {
		return this._killed;
	}

	public setKilled(value: boolean) {
		this._killed = value;
	}

	public isWhite(): boolean {
		return this._white;
	}

	public setWhite(value: boolean) {
		this._white = value;
	}

	public abstract canMove(board: Board, start: Spot, end: Spot): {}
}
