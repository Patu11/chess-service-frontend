import {Piece} from "./Piece";
import {Board} from "../Board";
import {Spot} from "../Spot";

export class King extends Piece {

	private _castlingDone: boolean = false;

	constructor(white: boolean) {
		super(white);
	}

	public isCastlingDone(): boolean {
		return this._castlingDone;
	}

	public setCastlingDone(castlingDone: boolean) {
		this._castlingDone = castlingDone;
	}

	canMove(board: Board, start: Spot, end: Spot): boolean {
		return true;
	}

}
