import {Spot} from "./Spot";
import {Rook} from "./figures/Rook";
import {Knight} from "./figures/Knight";
import {Bishop} from "./figures/Bishop";
import {Pawn} from "./figures/Pawn";
import {Queen} from "./figures/Queen";
import {King} from "./figures/King";
import {Empty} from "./figures/Empty";
import {isNumeric} from "rxjs/internal-compatibility";
import {Piece} from "./figures/Piece";
import {Move} from "./Move";

export class Board {
	private _spots: Spot[][];

	constructor() {
		this._spots = this.createBoard();
	}

	public getKing(white: boolean): King {
		let out: King = new King(white);
		for (let spots of this._spots) {
			for (let spot of spots) {
				if (spot.getPiece() instanceof King && spot.getPiece().isWhite() == white) {
					out = spot.getPiece() as King;
				}
			}
		}
		return out;
	}

	public fromString(board: string[][]) {
		let spots: Spot[][] = [];
		for (let i = 0; i < 8; i++) {
			spots[i] = [];
			for (let j = 0; j < 8; j++) {
				let p: Piece = this.getPieceFromLetter(board[i][j]);
				spots[i][j] = new Spot(i, j, p);
			}
		}
		this._spots = spots;
	}

	public toString(): string[][] {
		let spots: string[][] = [];
		for (let i = 0; i < 8; i++) {
			spots[i] = [];
			for (let j = 0; j < 8; j++) {
				let p: Piece = this._spots[i][j].getPiece();
				spots[i][j] = this.getLetterFromPiece(p);
			}
		}
		return spots;
	}

	getLetterFromPiece(piece: Piece): string {
		let out: string;

		if (piece instanceof King) {
			out = piece.isWhite() ? 'K' : 'k';
		} else if (piece instanceof Rook) {
			out = piece.isWhite() ? 'R' : 'r';
		} else if (piece instanceof Knight) {
			out = piece.isWhite() ? 'N' : 'n';
		} else if (piece instanceof Bishop) {
			out = piece.isWhite() ? 'B' : 'b';
		} else if (piece instanceof Queen) {
			out = piece.isWhite() ? 'Q' : 'q';
		} else if (piece instanceof Pawn) {
			out = piece.isWhite() ? 'P' : 'p';
		} else {
			out = ' ';
		}

		return out;
	}

	getPieceFromLetter(letter: string): Piece {
		let out: Piece;
		switch (letter) {
			case 'r':
				out = new Rook(false);
				break;
			case 'n':
				out = new Knight(false);
				break;
			case 'b':
				out = new Bishop(false);
				break;
			case 'q':
				out = new Queen(false);
				break;
			case 'k':
				out = new King(false);
				break;
			case 'p':
				out = new Pawn(false);
				break;
			case 'R':
				out = new Rook(true);
				break;
			case 'N':
				out = new Knight(true);
				break;
			case 'B':
				out = new Bishop(true);
				break;
			case 'Q':
				out = new Queen(true);
				break;
			case 'K':
				out = new King(true);
				break;
			case 'P':
				out = new Pawn(true);
				break;
			default:
				out = new Empty(false);
				break;
		}
		return out;
	}

	public createBoard(): Spot[][] {
		let board: Spot[][] = [];
		for (let i = 0; i < 8; i++) {
			board[i] = [];
			for (let j = 0; j < 8; j++) {
				board[i][j] = new Spot(i, j, new Empty(false));
			}
		}

		//Initialize black
		board[0][0] = new Spot(0, 0, new Rook(false));
		board[1][0] = new Spot(1, 0, new Knight(false));
		board[2][0] = new Spot(2, 0, new Bishop(false));
		board[3][0] = new Spot(3, 0, new Queen(false));
		board[4][0] = new Spot(4, 0, new King(false));
		board[5][0] = new Spot(5, 0, new Bishop(false));
		board[6][0] = new Spot(6, 0, new Knight(false));
		board[7][0] = new Spot(7, 0, new Rook(false));

		//Initialize white
		board[0][7] = new Spot(0, 7, new Rook(true));
		board[1][7] = new Spot(1, 7, new Knight(true));
		board[2][7] = new Spot(2, 7, new Bishop(true));
		board[3][7] = new Spot(3, 7, new Queen(true));
		board[4][7] = new Spot(4, 7, new King(true));
		board[5][7] = new Spot(5, 7, new Bishop(true));
		board[6][7] = new Spot(6, 7, new Knight(true));
		board[7][7] = new Spot(7, 7, new Rook(true));

		// //Initialize pawns
		for (let i = 0; i < 8; i++) {
			board[i][1] = new Spot(i, 1, new Pawn(false));
			board[i][6] = new Spot(i, 6, new Pawn(true));
		}
		return board;
	}

	public getSpot(x: number, y: number): Spot {
		if (x < 0 || x > 7 || y < 0 || y > 7) {
			throw new Error("Index out of bounds");
		}

		return this._spots[x][y];
	}

	public setSpots(spots: Spot[][]) {
		this._spots = spots;
	}

	public getSpots(): Spot[][] {
		return this._spots;
	}

	public printBoard() {
		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				console.log(this._spots[i][j]);
			}
		}
	}
}
