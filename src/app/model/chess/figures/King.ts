import {Piece} from "./Piece";
import {Board} from "../Board";
import {Spot} from "../Spot";
import {Empty} from "./Empty";
import {Rook} from "./Rook";

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

	public canCastleQueenside(board: Board): boolean {
		if (this.canCastle(board)) {
			if (this.isWhite()) {
				return !board.getSpot(2, 0).getPiece().isMoved();
			} else {
				return !board.getSpot(2, 7).getPiece().isMoved();
			}
		} else {
			return false;
		}
	}

	public canCastleKingside(board: Board): boolean {
		if (this.canCastle(board)) {
			if (this.isWhite()) {
				return !board.getSpot(6, 0).getPiece().isMoved();
			} else {
				return !board.getSpot(6, 7).getPiece().isMoved();
			}
		} else {
			return false;
		}
	}

	public canCastle(board: Board): boolean {if (!this.isMoved() && !this.inCheck(board)) {
			for (let spots of board.getSpots()) {
				for (let spot of spots) {
					if ((spot.getPiece() instanceof Rook) && (spot.getPiece().isWhite() == this.isWhite()) && !spot.getPiece().isMoved()) {
						return true;
					}
				}
			}
		}

		return false;
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
		if (this.canCastle(board)) {
			if (end.getX() == 2) {
				for (let i = this.getSpot(board).getX() - 1; i > 0; i--) {
					if (!(board.getSpot(i, end.getY()).getPiece() instanceof Empty)) {
						return false;
					}
				}

				for (let i = this.getSpot(board).getX() - 1; i > 0; i--) {
					let tempSpot: Spot = this.getSpot(board);
					let tempPiece: Piece = board.getSpot(i, end.getY()).getPiece();

					board.getSpot(i, end.getY()).setPiece(this);
					tempSpot.setPiece(new Empty(false));

					if (this.inCheck(board)) {
						board.getSpot(i, end.getY()).setPiece(tempPiece);
						tempSpot.setPiece(this);
						return false;
					}

					board.getSpot(i, end.getY()).setPiece(tempPiece);
					tempSpot.setPiece(this);
				}
				this.setMoved(true);
				return true;
			} else if (end.getX() == 6) {
				for (let i = this.getSpot(board).getX() + 1; i < 7; i++) {
					if (!(board.getSpot(i, end.getY()).getPiece() instanceof Empty)) {
						return false;
					}
				}

				for (let i = this.getSpot(board).getX() + 1; i < 7; i++) {
					let tempSpot: Spot = this.getSpot(board);
					let tempPiece: Piece = board.getSpot(i, end.getY()).getPiece();

					board.getSpot(i, end.getY()).setPiece(this);
					tempSpot.setPiece(new Empty(false));

					if (this.inCheck(board)) {
						board.getSpot(i, end.getY()).setPiece(tempPiece);
						tempSpot.setPiece(this);
						return false;
					}

					board.getSpot(i, end.getY()).setPiece(tempPiece);
					tempSpot.setPiece(this);
				}
				this.setMoved(true);
				return true;
			}
		}

		if (!(end.getPiece() instanceof Empty) && end.getPiece().isWhite() == this.isWhite()) {
			return false;
		}

		let endTemp: Piece = end.getPiece();
		let tempSpot: Spot = this.getSpot(board);
		end.setPiece(this);
		this.getSpot(board).setPiece(new Empty(false));
		for (let spots of board.getSpots()) {
			for (let spot of spots) {
				if (!(spot.getPiece() instanceof Empty) && !(spot.getPiece() instanceof King) && spot.getPiece().isWhite() != this.isWhite() && spot.getPiece().canMove(board, spot, end)) {
					end.setPiece(endTemp);
					tempSpot.setPiece(this);
					return false; //if any piece on the board can kill the king after it has made its move, you will be unable to make the move.
				}
			}
		}
		end.setPiece(endTemp);
		tempSpot.setPiece(this);

		if (start.getX() == end.getX()) {
			if (Math.abs(start.getY() - end.getY()) <= 1) this.setMoved(true);
			return Math.abs(start.getY() - end.getY()) <= 1;
		} else if (start.getY() == end.getY()) {
			if (Math.abs(start.getX() - end.getX()) <= 1) this.setMoved(true);
			return Math.abs(start.getX() - end.getX()) <= 1;
		} else if (Math.abs(start.getX() - end.getX()) + Math.abs(start.getY() - end.getY()) > 2) {
			return false;
		}
		this.setMoved(true);
		return true;
	}
}
