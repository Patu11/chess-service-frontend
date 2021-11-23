import {Player} from "./Player";
import {Spot} from "./Spot";
import {Piece} from "./figures/Piece";

export class Move {
	private _player: Player;
	private _start: Spot;
	private _end: Spot;
	private _whiteMove: boolean;

	constructor(player: Player, start: Spot, end: Spot, whiteMove: boolean) {
		this._player = player;
		this._start = start;
		this._end = end;
		this._whiteMove = whiteMove;
	}

	public getPlayer(): Player {
		return this._player;
	}

	public setPlayer(player: Player) {
		this._player = player;
	}

	public isWhiteMove(): boolean {
		return this._whiteMove;
	}

	public setWhiteMove(whiteMove: boolean) {
		this._whiteMove = whiteMove;
	}

	public getStart(): Spot {
		return this._start;
	}

	public getEnd(): Spot {
		return this._end;
	}
}
