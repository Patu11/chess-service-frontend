import {Piece} from "./Piece";
import {Board} from "../Board";
import {Spot} from "../Spot";

export class Queen extends Piece {
	private readonly _figureSvg: string;

	constructor(white: boolean) {
		super(white);
		this._figureSvg = white ? "w_queen.svg" : "b_queen.svg";
	}

	public getFigureSvg(): string {
		return this._figureSvg;
	}

	canMove(board: Board, start: Spot, end: Spot): boolean {
		return false;
	}

}
