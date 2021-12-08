import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Spot} from "../../model/chess/Spot";
import {Game} from "../../model/chess/Game";
import {Player} from "../../model/chess/Player";
import {Empty} from "../../model/chess/figures/Empty";
import {Pawn} from "../../model/chess/figures/Pawn";
import {WebsocketService} from "../../services/websocket.service";
import {GameState} from "../../model/GameState";
import {DataService} from "../../services/data.service";
import {Board} from "../../model/chess/Board";
import {Move} from "../../model/chess/Move";

@Component({
	selector: 'app-board',
	templateUrl: './board.component.html',
	styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
	// currentClicked?: Spot;
	// state?: GameState;
	// game: Game;
	// @Input()
	// board?: Board;
	// whiteSide: boolean = true;
	// username: string = '';

	currentClicked?: Spot;

	@Output()
	move = new EventEmitter<Move>();

	@Input()
	board?: Board;

	@Input()
	player?: Player;

	constructor() {
		// this.game = new Game(new Player('chrome', true), new Player('firefox', false));
		// this.websocketService.isConnected().subscribe((value) => {
		// 	if (value) {
		// 		this.websocketService.connectToGame('asd123');
		// 		this.websocketService.getGameState('asd123').subscribe(
		// 			state => {
		// 				if (state) {
		// 					if (state.boardState) {
		// 						this.game.getBoard().fromString(state.boardState);
		// 					}
		// 				}
		// 			}
		// 		);
		// 	}
		// });
	}

	//todo handle clicking at empty pieces
	handleSpotClicked(spot: Spot) {
		if (this.currentClicked == undefined && !(spot.getPiece() instanceof Empty)) {
			this.currentClicked = spot;
		} else {
			if (spot != this.currentClicked) {
				if (this.currentClicked?.getPiece().canMove(this.board!, this.currentClicked!, spot)) {
					let sourceX = this.currentClicked?.getX();
					let sourceY = this.currentClicked?.getY();
					let targetX = spot.getX();
					let targetY = spot.getY();

					let source: Spot = this.board!.getSpot(sourceX!, sourceY!);
					let target: Spot = this.board!.getSpot(targetX!, targetY!);

					let m: Move = new Move(this.player!, source, target, true);
					this.move.emit(m);

				}
				this.currentClicked = undefined;
			}
		}
	}

	// //todo handle clicking at empty pieces
	// handleSpotClicked(spot: Spot) {
	// 	if (this.currentClicked == undefined && !(spot.getPiece() instanceof Empty)) {
	// 		this.currentClicked = spot;
	// 	} else {
	// 		if (spot != this.currentClicked) {
	// 			if (this.currentClicked?.getPiece().canMove(this.game.getBoard(), this.currentClicked!, spot)) {
	// 				let sourceX = this.currentClicked?.getX();
	// 				let sourceY = this.currentClicked?.getY();
	// 				let targetX = spot.getX();
	// 				let targetY = spot.getY();
	//
	// 				let source: Spot = this.game.getBoard().getSpot(sourceX!, sourceY!);
	// 				let target: Spot = this.game.getBoard().getSpot(targetX!, targetY!);
	//
	//
	// 				// this.game.test(source, target);
	//
	// 				let gs: GameState = new GameState();
	// 				gs.setBoardState(this.game.getBoard().toString());
	// 				console.log(this.game.getCurrentTurn());
	// 				this.websocketService.sendGameState(gs, 'asd123');
	// 			}
	// 			this.currentClicked = undefined;
	// 		}
	// 	}
	// }

	// changeSide() {
	// 	this.whiteSide = !this.whiteSide;
	// }

	ngOnInit(): void {
		// this.dataService.currentMessage.subscribe(
		// 	data => {
		// 		this.username = data.username;
		// 	}
		// );
	}

}
