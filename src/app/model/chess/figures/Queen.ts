import {Piece} from "./Piece";
import {Board} from "../Board";
import {Spot} from "../Spot";
import {Empty} from "./Empty";

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
		if (!(end.getPiece() instanceof Empty) && end.getPiece().isWhite() == this.isWhite()) {
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

		if (start.getX() == end.getX()) {
			for (let i = Math.min(start.getY(), end.getY()) + 1; i < Math.max(start.getY(), end.getY()); i++) {
				if (!(board.getSpot(start.getX(), i).getPiece() instanceof Empty)) {
					return false;
				}
			}
			return true;
		} else if (start.getY() == end.getY()) {
			for (let i = Math.min(start.getX(), end.getX()) + 1; i < Math.max(start.getX(), end.getX()); i++) {
				if (!(board.getSpot(i, start.getY()).getPiece() instanceof Empty)) {
					return false;
				}
			}
			return true;
		} else if (Math.abs(start.getX() - end.getX()) == Math.abs(start.getY() - end.getY())) {
			let lowerX: number = Math.min(start.getX(), end.getX());
			let upperX: number = Math.max(start.getX(), end.getX());

			let lowerY: number = Math.min(start.getY(), end.getY());
			let upperY: number = Math.max(start.getY(), end.getY());

			let xIndex: number = lowerX + 1;
			let yIndex: number = lowerY + 1;

			while (xIndex < upperX && yIndex < upperY) {
				if (!(board.getSpot(xIndex, yIndex).getPiece() instanceof Empty)) {
					return false;
				}

				xIndex++;
				yIndex++;
			}
			return true;
		} else {
			return false;
		}
	}

}
