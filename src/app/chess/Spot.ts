import {Piece} from "./figures/Piece";

export class Spot {
	private _piece?: Piece;
	private _x: number;
	private _y: number;

	constructor(x: number, y: number, piece: Piece) {
		this._piece = piece;
		this._x = x;
		this._y = y;
	}

	public getPiece(): Piece {
		return this._piece!;
	}

	public setPiece(value: Piece) {
		this._piece = value;
	}

	public getX(): number {
		return this._x;
	}

	public setX(value: number) {
		this._x = value;
	}

	public getY(): number {
		return this._y;
	}

	public setY(value: number) {
		this._y = value;
	}
}
