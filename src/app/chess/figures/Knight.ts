import {Piece} from "./Piece";
import {Board} from "../Board";
import {Spot} from "../Spot";

export class Knight extends Piece {
	private readonly _figureSvg: string;

	constructor(white: boolean) {
		super(white);
		this._figureSvg = white ? "w_knight.svg" : "b_knight.svg";
	}

	public getFigureSvg(): string {
		return this._figureSvg;
	}

	canMove(board: Board, start: Spot, end: Spot): boolean {
		return true;
	}
}
