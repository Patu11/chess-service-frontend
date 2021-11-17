import {Piece} from "./Piece";
import {Board} from "../Board";
import {Spot} from "../Spot";

export class Rook extends Piece {

	constructor(white: boolean) {
		super(white);
	}

	canMove(board: Board, start: Spot, end: Spot): {} {
		return {};
	}

}
