import {Piece} from "./Piece";
import {Board} from "../Board";
import {Spot} from "../Spot";
import {Empty} from "./Empty";

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
			//Can't kill or move over piece of same color
			return false;
		}
		if (!(end.getPiece() instanceof Empty) && start.getX() == end.getX()) {
			// can't kill piece moving forwards
			return false;
		}

		if (!this.isMoved() && start.getX() == end.getX() && Math.abs(end.getY() - start.getY()) <= 2) {
			if (end.getY() < start.getY() && this.isWhite()) {
				this.setMoved(true);
				return true;
			} else {
				if (end.getY() > start.getY() && !this.isWhite()) this.setMoved(true);
				return end.getY() > start.getY() && !this.isWhite();
			}
		} else if (start.getX() == end.getX() && Math.abs(start.getY() - end.getY()) < 2) {
			if (end.getY() > start.getY() && this.isWhite()) {
				this.setMoved(true);
				return true;
			} else {
				if (end.getY() < start.getY() && !this.isWhite()) this.setMoved(true);
				return end.getY() < start.getY() && !this.isWhite();
			}
		} else if (end.getX() == start.getX() - 1 || end.getX() == start.getX() + 1) {
			if (!(end.getPiece() instanceof Empty) && end.getPiece().isWhite() != this.isWhite()) {
				if (this.isWhite() ? end.getY() == start.getY() - 1 : end.getY() == start.getY() + 1) this.setMoved(true);
				return this.isWhite() ? end.getY() == start.getY() - 1 : end.getY() == start.getY() + 1;
			}
		}

		return false;
	}

}
