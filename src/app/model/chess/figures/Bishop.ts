import {Piece} from "./Piece";
import {Board} from "../Board";
import {Spot} from "../Spot";
import {Empty} from "./Empty";

export class Bishop extends Piece {
	private readonly _figureSvg: string;

	constructor(white: boolean) {
		super(white);
		this._figureSvg = white ? "w_bishop.svg" : "b_bishop.svg";
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

		if (Math.abs(start.getX() - end.getX()) == Math.abs(start.getY() - end.getY())) {
			let xMutator: number;
			let yMutator: number;

			if (start.getX() < end.getX()) {
				// Moving to the right
				xMutator = 1;
			} else {
				xMutator = -1;
			}

			if (start.getY() < end.getY()) {
				// if moving up
				yMutator = 1;
			} else {
				yMutator = -1;
			}


			let xIndex: number = start.getX() + xMutator;
			let yIndex: number = start.getY() + yMutator;

			while (xIndex != end.getX() && yIndex != end.getY()) {
				if (!(board.getSpot(xIndex, yIndex).getPiece() instanceof Empty) && xIndex != end.getX() && yIndex != end.getY()) {
					return false;
				}

				xIndex += xMutator;
				yIndex += yMutator;
			}

			return true;
		} else {
			return false;
		}
	}
}
