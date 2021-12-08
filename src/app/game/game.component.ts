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

	constructor(private websocketService: WebsocketService, private dataService: DataService, private gameService: GameService) {
	}

	onNewGame() {
		this.game.getBoard().newBoard();
		let gs: GameState = new GameState();
		gs.setBoardState(this.game.getBoard().toString());
		this.gameService.updateGameState(this.gameModel.code, this.game.getBoard().toFlatString()).subscribe(
			response => {

			}
		);
		this.websocketService.sendGameState(gs, this.gameModel.code);
	}

	makeMove(move: Move) {
		this.game.test(move.getPlayer(), move.getStart(), move.getEnd());
		let gs: GameState = new GameState();
		gs.setBoardState(this.game.getBoard().toString());
		gs.setCurrentTurn(this.game.getCurrentTurn().getUsername());
		this.gameService.updateGameState(this.gameModel.code, this.game.getBoard().toFlatString()).subscribe();
		this.websocketService.sendGameState(gs, this.gameModel.code);
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
						this.game = new Game(p1, p2);
						this.game.getBoard().fromFlatString(response.state);
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
