import {Piece} from "./Piece";
import {Board} from "../Board";
import {Spot} from "../Spot";

export class Pawn extends Piece {
	private readonly _figureSvg: string;

	constructor(white: boolean) {
		super(white);
		this._figureSvg = white ? "w_pawn.svg" : "b_pawn.svg";
	}

	public getFigureSvg(): string {
		return this._figureSvg;
	}

	canMove(board: Board, start: Spot, end: Spot): boolean {
		return true;
	}

}
