import {Piece} from "./Piece";
import {Board} from "../Board";
import {Spot} from "../Spot";

export class King extends Piece {

	private _castlingDone: boolean = false;
	private readonly _figureSvg: string;

	constructor(white: boolean) {
		super(white);
		this._figureSvg = white ? "w_king.svg" : "b_king.svg";
	}

	public isCastlingDone(): boolean {
		return this._castlingDone;
	}

	public setCastlingDone(castlingDone: boolean) {
		this._castlingDone = castlingDone;
	}

	public getFigureSvg(): string {
		return this._figureSvg;
	}

	canMove(board: Board, start: Spot, end: Spot): boolean {
		return false;
	}
}
