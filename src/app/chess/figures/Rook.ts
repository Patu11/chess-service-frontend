import {Piece} from "./Piece";
import {Board} from "../Board";
import {Spot} from "../Spot";

export class Rook extends Piece {
	private readonly _figureSvg: string;

	constructor(white: boolean) {
		super(white);
		this._figureSvg = white ? "w_rook.svg" : "b_rook.svg";
	}

	public getFigureSvg(): string {
		return this._figureSvg;
	}

	canMove(board: Board, start: Spot, end: Spot): boolean {
		return false;
	}

}
