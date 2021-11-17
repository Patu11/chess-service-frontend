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

export class Board {
	private _boxes: Spot[][];

	constructor() {
		this._boxes = [];
		//Initialize array
		for (let i = 0; i < 8; i++) {
			this._boxes[i] = [];
			for (let j = 0; j < 8; j++) {
				this._boxes[i][j] = new Spot(i, j, new Empty(false));
			}
		}

		//Initialize white
		this._boxes[0][0] = new Spot(0, 0, new Rook(false));
		this._boxes[0][1] = new Spot(0, 1, new Knight(false));
		this._boxes[0][2] = new Spot(0, 2, new Bishop(false));
		this._boxes[0][3] = new Spot(0, 3, new Queen(false));
		this._boxes[0][4] = new Spot(0, 4, new King(false));
		this._boxes[0][5] = new Spot(0, 5, new Bishop(false));
		this._boxes[0][6] = new Spot(0, 6, new Knight(false));
		this._boxes[0][7] = new Spot(0, 7, new Rook(false));

		//Initialize black
		this._boxes[7][0] = new Spot(7, 0, new Rook(true));
		this._boxes[7][1] = new Spot(7, 1, new Knight(true));
		this._boxes[7][2] = new Spot(7, 2, new Bishop(true));
		this._boxes[7][3] = new Spot(7, 3, new Queen(true));
		this._boxes[7][4] = new Spot(7, 4, new King(true));
		this._boxes[7][5] = new Spot(7, 5, new Bishop(true));
		this._boxes[7][6] = new Spot(7, 6, new Knight(true));
		this._boxes[7][7] = new Spot(7, 7, new Rook(true));

		// //Initialize pawns
		for (let i = 0; i < 8; i++) {
			this._boxes[1][i] = new Spot(1, 0, new Pawn(false));
			this._boxes[6][i] = new Spot(6, 0, new Pawn(true));
		}

		// this._boxes = this.parseFEN('rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR');
		// console.log(this._boxes);
	}

	private parseFEN(fen: string): Spot[][] {
		let tab: Spot[][] = [];
		for (let i = 0; i < 8; i++) {
			tab[i] = [];
			for (let j = 0; j < 8; j++) {
				tab[i][j] = new Spot(i, j, new Empty(false));
			}
		}

		let parts = fen.split('/');
		for (let i = 0; i < parts.length; i++) {
			for (let j = 0; j < parts[i].length; j++) {
				let el = parts[i][j];
				if (isNumeric(el)) {
					for (let k = 0; k < Number(el); k++) {
						tab[i][j + k] = new Spot(i, j, new Empty(false));
					}
				} else {
					tab[i][j] = new Spot(i, j, this.getPieceFromLetter(el));
				}
			}
		}

		return tab;
	}

	getPieceFromLetter(letter: string): Piece {
		let out: Piece = new Empty(false);
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

	public getBox(x: number, y: number): Spot {
		if (x < 0 || x > 7 || y < 0 || y > 7) {
			throw new Error("Index out of bounds");
		}

		return this._boxes[x][y];
	}

	public getBoxes(): Spot[][] {
		return this._boxes;
	}

	public printBoard() {
		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				console.log(this._boxes[i][j]);
			}
		}
	}
}
