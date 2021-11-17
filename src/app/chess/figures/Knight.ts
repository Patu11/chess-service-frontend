import {Piece} from "./Piece";
import {Board} from "../Board";
import {Spot} from "../Spot";

export class Knight extends Piece {
	constructor(white: boolean) {
		super(white);
	}
	
	canMove(board: Board, start: Spot, end: Spot): {} {
		return {};
	}

}
