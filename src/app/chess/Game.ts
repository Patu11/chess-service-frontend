import {Player} from "./Player";
import {Board} from "./Board";
import {GameStatus} from "./GameStatus";
import {Move} from "./Move";
import {Spot} from "./Spot";
import {Piece} from "./figures/Piece";
import {Empty} from "./figures/Empty";

export class Game {
	private _players: Player[] = [];
	private _board: Board;
	private _currentTurn: Player;
	private _status: GameStatus;
	private _movesPlayed: Array<Move>;

	constructor(p1: Player, p2: Player) {
		this._players[0] = p1;
		this._players[1] = p2;

		this._board = new Board();

		this._currentTurn = p1.isWhiteSide() ? p1 : p2;
		this._status = GameStatus.ACTIVE;
		this._movesPlayed = new Array<Move>();
	}

	public isEnd(): boolean {
		return this._status != GameStatus.ACTIVE;
	}

	public getStatus(): GameStatus {
		return this._status;
	}

	public setStatus(status: GameStatus) {
		this._status = status;
	}

	public playerMove(player: Player, startX: number, startY: number, endX: number, endY: number): boolean {
		let startBox: Spot = this._board.getBox(startX, startY);
		let endBox: Spot = this._board.getBox(endX, endY);
		let move: Move = new Move(player, startBox, endBox);
		return this.makeMove(move, player);
	}

	public makeMove(move: Move, player: Player): boolean {
		let sourcePiece: Piece = move.getStart().getPiece();

		if (sourcePiece === undefined) {
			return false;
		}
		// valid player
		if (player != this._currentTurn) {
			return false;
		}

		if (sourcePiece.isWhite() != player.isWhiteSide()) {
			return false;
		}
		// valid move?
		if (!sourcePiece.canMove(this._board, move.getStart(), move.getEnd())) {
			return false;
		}
		// kill?
		let destPiece: Piece = move.getStart().getPiece();
		if (!(destPiece instanceof Empty)) {
			destPiece.setKilled(true);
			move.setPieceKilled(destPiece);
		}

		//todo castling?

		this._movesPlayed.push(move);


		//changing turn
		this._currentTurn = this._currentTurn == this._players[0] ? this._players[0] : this._players[1];

		return true;
	}
}
