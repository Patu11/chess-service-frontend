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
		return this.http.get<GameModel>(this.gameUrl + '/' + name + '/' + name);
	}

	updateGameState(code: string, state: string) {
		return this.http.put(this.gameUrl + '/status/' + code, state);
	}

	updateGameTurn(code: string, username: string) {
		return this.http.put(this.gameUrl + '/turn/' + code, username);
	}

	updateGame(code: string, currentTurn: string, state: string) {
		const body = {
			currentTurn: currentTurn,
			state: state
		};
		return this.http.put(this.gameUrl + '/update/' + code, body);
	}
}
