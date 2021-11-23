import {Piece} from "./Piece";
import {Board} from "../Board";
import {Spot} from "../Spot";
import {Empty} from "./Empty";

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
		if (!(end.getPiece() instanceof Empty)) {
			if (end.getPiece().isWhite() == this.isWhite()) {
				// can't kill piece of same color
				return false;
			}
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

		if (start.getX() == end.getX()) {
			//moving vertically
			if (start.getY() > end.getY()) {
				for (let i = start.getY() - 1; i > end.getY(); i--) {
					if (!(board.getSpot(start.getX(), i).getPiece() instanceof Empty)) {
						//if there are pieces in the way
						return false;
					}
				}
			} else {
				for (let i = start.getY() + 1; i < end.getY(); i++) {
					if (!(board.getSpot(start.getX(), i).getPiece() instanceof Empty)) {
						//if there are pieces in the way
						return false;
					}
				}
			}
		} else if (start.getY() == end.getY()) {
			//moving horizontally
			if (start.getX() < end.getX()) {
				for (let i = start.getX() - 1; i > end.getX(); i--) {
					if (!(board.getSpot(start.getX(), i).getPiece() instanceof Empty)) {
						//if there are pieces in the way
						return false;
					}
				}
			} else {
				for (let i = start.getX() + 1; i < end.getX(); i++) {
					if (!(board.getSpot(start.getX(), i).getPiece() instanceof Empty)) {
						//if there are pieces in the way
						return false;
					}
				}
			}
		} else if (start.getY() != end.getY() || start.getX() != end.getX()) {
			return false;
		}
		this.setMoved(true);
		return true;
	}

}
