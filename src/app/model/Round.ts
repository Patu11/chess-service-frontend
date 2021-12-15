import {GameModel} from "./GameModel";

export class Round {
	private _id: number;
	private _roundNumber: number;
	private _games: Array<GameModel>;


	constructor(id: number, roundNumber: number, games: Array<GameModel>) {
		this._id = id;
		this._roundNumber = roundNumber;
		this._games = games;
	}
	
	get id(): number {
		return this._id;
	}

	set id(value: number) {
		this._id = value;
	}

	get roundNumber(): number {
		return this._roundNumber;
	}

	set roundNumber(value: number) {
		this._roundNumber = value;
	}

	get games(): Array<GameModel> {
		return this._games;
	}

	set games(value: Array<GameModel>) {
		this._games = value;
	}
}
