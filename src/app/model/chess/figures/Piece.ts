import {Board} from "../Board";
import {Spot} from "../Spot";

export abstract class Piece {
	private _killed: boolean = false;
	private _white: boolean = false;
	private _moved: boolean = false;
	protected _checkKingInCheck = false;

	constructor(white: boolean) {
		this.setWhite(white);
	}

	public setMoved(moved: boolean) {
		this._moved = moved;
	}

	public isMoved(): boolean {
		return this._moved;
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

	public getSpot(board: Board): any {
		let out = undefined;
		for (let spots of board.getSpots()) {
			for (let spot of spots) {
				if (spot.getPiece() == this) {
					out = spot;
				}
			}
		}

		return out;
	}

	public canMoveCheck(board: Board, start: Spot, end: Spot, checkKingInCheck: boolean): boolean {
		this._checkKingInCheck = checkKingInCheck;
		return this.canMove(board, start, end);
	}

	public abstract canMove(board: Board, start: Spot, end: Spot): boolean;

	public abstract getFigureSvg(): string;
}
