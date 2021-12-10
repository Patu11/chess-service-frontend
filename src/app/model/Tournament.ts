import {User} from "./User";
import {GameModel} from "./GameModel";

export class Tournament {
	private _tournamentId: number;
	private _title: string;
	private _maxPlayers: number;
	private _winner: string;
	private _startDate: string;
	private _endDate: string;
	private _users: Set<User>;
	private _games: Array<GameModel>;

	constructor(tournamentId: number, title: string, maxPlayers: number, winner: string, startDate: string, endDate: string, users: Set<User>, games: Array<GameModel>) {
		this._tournamentId = tournamentId;
		this._title = title;
		this._maxPlayers = maxPlayers;
		this._winner = winner;
		this._startDate = startDate;
		this._endDate = endDate;
		this._users = users;
		this._games = games;
	}

	get tournamentId(): number {
		return this._tournamentId;
	}

	set tournamentId(value: number) {
		this._tournamentId = value;
	}

	get title(): string {
		return this._title;
	}

	set title(value: string) {
		this._title = value;
	}

	get maxPlayers(): number {
		return this._maxPlayers;
	}

	set maxPlayers(value: number) {
		this._maxPlayers = value;
	}

	get winner(): string {
		return this._winner;
	}

	set winner(value: string) {
		this._winner = value;
	}

	get startDate(): string {
		return this._startDate;
	}

	set startDate(value: string) {
		this._startDate = value;
	}

	get endDate(): string {
		return this._endDate;
	}

	set endDate(value: string) {
		this._endDate = value;
	}

	get users(): Set<User> {
		return this._users;
	}

	set users(value: Set<User>) {
		this._users = value;
	}

	get games(): Array<GameModel> {
		return this._games;
	}

	set games(value: Array<GameModel>) {
		this._games = value;
	}
}
