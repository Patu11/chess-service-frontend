import {Piece} from "./Piece";
import {Board} from "../Board";
import {Spot} from "../Spot";
import {Empty} from "./Empty";

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

	public inCheck(board: Board): boolean {
		for (let spots of board.getSpots()) {
			for (let spot of spots) {
				if (!(spot.getPiece() instanceof Empty) && !(spot.getPiece() instanceof King) && spot.getPiece() != this && spot.getPiece().isWhite() != this.isWhite() && spot.getPiece().canMoveCheck(board, spot, this.getSpot(board), false)) {
					return true; //if any piece on the board can kill the king after it has made its move, you will be unable to make the move.
				}
			}
		}

		return false;
	}

	canMove(board: Board, start: Spot, end: Spot): boolean {
		return false;
	}
}
