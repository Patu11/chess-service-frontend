export class GameModel {
	private _code: string;
	private _host: string;
	private _user: string;
	private _state: string;
	private _winner: string;
	private _currentTurn: string;
	private _started: boolean;
	private _accepted: boolean;
	private _ended: boolean;


	constructor(code: string, host: string, user: string, state: string, winner: string, currentTurn: string, started: boolean, accepted: boolean, ended: boolean) {
		this._code = code;
		this._host = host;
		this._user = user;
		this._state = state;
		this._winner = winner;
		this._currentTurn = currentTurn;
		this._started = started;
		this._accepted = accepted;
		this._ended = ended;
	}

	get code(): string {
		return this._code;
	}

	set code(value: string) {
		this._code = value;
	}

	get host(): string {
		return this._host;
	}

	set host(value: string) {
		this._host = value;
	}

	get user(): string {
		return this._user;
	}

	set user(value: string) {
		this._user = value;
	}

	get state(): string {
		return this._state;
	}

	set state(value: string) {
		this._state = value;
	}

	get started(): boolean {
		return this._started;
	}

	set started(value: boolean) {
		this._started = value;
	}

	get accepted(): boolean {
		return this._accepted;
	}

	set accepted(value: boolean) {
		this._accepted = value;
	}

	get ended(): boolean {
		return this._ended;
	}

	set ended(value: boolean) {
		this._ended = value;
	}

	get winner(): string {
		return this._winner;
	}

	set winner(value: string) {
		this._winner = value;
	}


	get currentTurn(): string {
		return this._currentTurn;
	}

	set currentTurn(value: string) {
		this._currentTurn = value;
	}
}
