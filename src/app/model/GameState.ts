import {Game} from "./chess/Game";
import {Type} from "class-transformer";

export class GameState {
	@Type(() => Game)
	_game: Game;

	constructor(game: Game) {
		this._game = game;
	}

	public getGame(): Game {
		return this._game;
	}

	get game(): Game {
		return this._game;
	}

	set game(value: Game) {
		this._game = value;
	}
}
