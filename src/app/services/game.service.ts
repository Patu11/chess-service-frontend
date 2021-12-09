import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GameModel} from "../model/GameModel";

@Injectable({
	providedIn: 'root'
})
export class GameService {

	gameUrl: string = 'http://localhost:8080/games'

	constructor(private http: HttpClient) {
	}

	getGameByHostOrUser(name: string) {
		return this.http.get<GameModel>(this.gameUrl + '/' + name);
	}

	createGame(gameModel: GameModel) {
		const body = {
			code: gameModel.code,
			host: gameModel.host,
			player: gameModel.player,
			state: gameModel.state,
			winner: gameModel.winner,
			currentTurn: gameModel.currentTurn,
			started: gameModel.started,
			accepted: gameModel.accepted,
			ended: gameModel.ended
		};

		return this.http.post(this.gameUrl, body);
	}

	getAllGames() {
		return this.http.get(this.gameUrl + '/all');
	}

	acceptGameInvite(code: string) {
		return this.http.put(this.gameUrl + "/accept/" + code, {});
	}

	declineGameInvite(code: string) {
		return this.http.delete(this.gameUrl + '/delete/' + code);
	}

	getAllCodes() {
		return this.http.get(this.gameUrl + '/codes');
	}

	updateWinner(code: string, winner: string) {
		const body = {
			winner: winner
		};

		return this.http.put(this.gameUrl + '/winner/' + code, body);
	}

	updateGame(code: string, currentTurn: string, state: string) {
		const body = {
			currentTurn: currentTurn,
			state: state
		};
		return this.http.put(this.gameUrl + '/update/' + code, body);
	}
}
