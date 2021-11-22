import {Player} from "./Player";
import {Spot} from "./Spot";
import {Piece} from "./figures/Piece";

export class Move {
	private _player: Player;
	private _start: Spot;
	private _end: Spot;
	private _pieceMoved: Piece;
	private _pieceKilled?: Piece;
	private _castlingMove: boolean = false;

	constructor(player: Player, start: Spot, end: Spot) {
		this._player = player;
		this._start = start;
		this._end = end;
		this._pieceMoved = start.getPiece();
		// this._pieceKilled = end.getPiece();
	}

	public isCastlingMove(): boolean {
		return this._castlingMove;
	}

	public setCastlingMove(castlingMove: boolean) {
		this._castlingMove = castlingMove;
	}

	public setPieceKilled(piece: Piece) {
		this._pieceKilled = piece;
	}

	public getStart(): Spot {
		return this._start;
	}

	public getEnd(): Spot {
		return this._end;
	}
}
