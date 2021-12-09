import {Component, OnInit} from '@angular/core';
import {Game} from "../model/chess/Game";
import {Player} from "../model/chess/Player";
import {WebsocketService} from "../services/websocket.service";
import {DataService} from "../services/data.service";
import {GameService} from "../services/game.service";
import {GameState} from "../model/GameState";
import {Move} from "../model/chess/Move";
import {GameModel} from "../model/GameModel";

@Component({
	selector: 'app-game',
	templateUrl: './game.component.html',
	styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

	game: Game = new Game(new Player('empty1', true), new Player('empty2', false));
	gameModel: GameModel = new GameModel('', 'empty1', 'empty2', this.game.getBoard().toFlatString(), '', '', false, false, false);
	player?: Player;
	username?: string;
	gameError: boolean = false;
	gameState: GameState = new GameState();
	currentTurn: string = '';

	constructor(private websocketService: WebsocketService, private dataService: DataService, private gameService: GameService) {
	}

	onNewGame() {
		this.game.getBoard().newBoard();
		let gs: GameState = new GameState();
		gs.setBoardState(this.game.getBoard().toString());
		gs.setCurrentTurn(this.gameModel.host);
		this.gameState = gs;
		this.gameService.updateGame(this.gameModel.code, this.gameModel.host, this.game.getBoard().toFlatString()).subscribe();
		this.websocketService.sendGameState(gs, this.gameModel.code);
	}

	makeMove(move: Move) {
		if (this.currentTurn === this.username) {
			this.game.test(move.getPlayer(), move.getStart(), move.getEnd());
			let gs: GameState = new GameState();
			gs.setBoardState(this.game.getBoard().toString());

			let players: Player[] = this.game.getPlayers();

			let tempCurrent: string = players[0].getUsername() === this.currentTurn ? players[1].getUsername() : players[0].getUsername();

			this.game.setCurrentPlayer(players.find(p => p.getUsername() === tempCurrent)!);
			gs.setCurrentTurn(tempCurrent);

			this.gameService.updateGame(this.gameModel.code, tempCurrent, this.game.getBoard().toFlatString()).subscribe();
			this.websocketService.sendGameState(gs, this.gameModel.code);
		}
	}

	ngOnInit(): void {
		//getting current login state (username etc.)
		this.dataService.currentMessage.subscribe(
			state => {
				this.username = state.username;
				//getting game that is already started
				this.gameService.getGameByHostOrUser(this.username).subscribe(
					response => {
						this.gameModel = response;
						let p1 = new Player(response.host, true);
						let p2 = new Player(response.user, false);
						this.currentTurn = response.currentTurn;
						this.game = new Game(p1, p2);
						this.game.getBoard().fromFlatString(response.state);
						this.game.setCurrentPlayer(p1.getUsername() === response.currentTurn ? p1 : p2);
						this.player = this.game.getPlayers().find(p => p.getUsername() === this.username);

						//connecting to websocket
						this.websocketService.isConnected().subscribe((value) => {
							if (value) {
								//subscribing to websocket topic (game)
								this.websocketService.connectToGame(response.code);
								//getting state of game to refresh board
								this.websocketService.getGameState(response.code).subscribe(
									state => {
										if (state) {
											this.gameState = state;
											if (state.currentTurn) {
												this.currentTurn = state.currentTurn;
											}
											if (state.boardState) {
												this.game.getBoard().fromString(state.boardState);
											}
										}
									}
								);
							}
						});
					},
					error => {
						this.gameError = true
					}
				);
			}
		);
	}
}
