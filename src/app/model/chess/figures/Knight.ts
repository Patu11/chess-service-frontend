import {Piece} from "./Piece";
import {Board} from "../Board";
import {Spot} from "../Spot";
import {Empty} from "./Empty";

export class Knight extends Piece {
	private readonly _figureSvg: string;
	private movesX: number[] = [-1, -2, -2, -1, 1, +2, +2, +1];
	private movesY: number[] = [+2, +1, -1, -2, -2, -1, +1, +2];

	constructor(white: boolean) {
		super(white);
		this._figureSvg = white ? "w_knight.svg" : "b_knight.svg";
	}

	public getFigureSvg(): string {
		return this._figureSvg;
	}

	canMove(board: Board, start: Spot, end: Spot): boolean {
		if (end.getX() > 8 || end.getX() < 0 || end.getY() > 8 || end.getY() < 0) {
			return false;
		} else if (super._checkKingInCheck && board.getKing(this.isWhite()) != null && board.getKing(this.isWhite()).inCheck(board)) {
			return false;
		}

		if (super._checkKingInCheck) {
			let tempSpot: Spot = this.getSpot(board);
			let tempPiece: Piece = end.getPiece();

			end.setPiece(this);
			start.setPiece(new Empty(false));

			if (board.getKing(this.isWhite()) != null && board.getKing(this.isWhite()).inCheck(board)) {
				end.setPiece(tempPiece);
				tempSpot.setPiece(this);
				return false;
			}

			end.setPiece(tempPiece);
			tempSpot.setPiece(this);
		}

		super._checkKingInCheck = true;

		if (!(end.getPiece() instanceof Empty) && end.getPiece().isWhite() == this.isWhite()) {
			return false;
		}

		for (let i = 0; i < 8; i++) {
			if (start.getX() + this.movesX[i] == end.getX() && start.getY() + this.movesY[i] == end.getY()) {
				return true;
			}
		}

		return false;
	}
}
