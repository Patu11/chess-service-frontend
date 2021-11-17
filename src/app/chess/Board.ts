import {Spot} from "./Spot";
import {Rook} from "./figures/Rook";
import {Knight} from "./figures/Knight";
import {Bishop} from "./figures/Bishop";
import {Pawn} from "./figures/Pawn";
import {Queen} from "./figures/Queen";
import {King} from "./figures/King";
import {Empty} from "./figures/Empty";

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
		this._boxes[0][0] = new Spot(0, 0, new Rook(true));
		this._boxes[0][1] = new Spot(0, 1, new Knight(true));
		this._boxes[0][2] = new Spot(0, 2, new Bishop(true));
		this._boxes[0][3] = new Spot(0, 3, new Queen(true));
		this._boxes[0][4] = new Spot(0, 4, new King(true));
		this._boxes[0][5] = new Spot(0, 5, new Bishop(true));
		this._boxes[0][6] = new Spot(0, 6, new Knight(true));
		this._boxes[0][7] = new Spot(0, 7, new Rook(true));

		//Initialize black
		this._boxes[7][0] = new Spot(0, 0, new Rook(false));
		this._boxes[7][1] = new Spot(0, 1, new Knight(false));
		this._boxes[7][2] = new Spot(0, 2, new Bishop(false));
		this._boxes[7][3] = new Spot(0, 3, new Queen(false));
		this._boxes[7][4] = new Spot(0, 4, new King(false));
		this._boxes[7][5] = new Spot(0, 5, new Bishop(false));
		this._boxes[7][6] = new Spot(0, 6, new Knight(false));
		this._boxes[7][7] = new Spot(0, 7, new Rook(false));

		//Initialize pawns
		for (let i = 0; i < 8; i++) {
			this._boxes[1][i] = new Spot(1, 0, new Pawn(true));
			this._boxes[6][i] = new Spot(6, 0, new Pawn(false));
		}

		// //Initialize empty
		// for (let i = 2; i < 6; i++) {
		// 	for (let j = 0; j < 8; j++) {
		// 		this._boxes[i][j] = new Spot(i, j, new Empty(false));
		// 	}
		// }
	}

	public printBoard() {
		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				console.log(this._boxes[i][j]);
			}
		}
	}
}
