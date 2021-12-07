import {Component, OnInit} from '@angular/core';
import {Spot} from "../../model/chess/Spot";
import {Game} from "../../model/chess/Game";
import {Player} from "../../model/chess/Player";
import {Empty} from "../../model/chess/figures/Empty";
import {Pawn} from "../../model/chess/figures/Pawn";
import {WebsocketService} from "../../services/websocket.service";
import {GameState} from "../../model/GameState";

@Component({
	selector: 'app-board',
	templateUrl: './board.component.html',
	styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
	currentClicked?: Spot;
	state?: GameState;
	game: Game;
	whiteSide: boolean = true;

	constructor(private websocketService: WebsocketService) {
		this.game = new Game(new Player(true), new Player(false));
		this.websocketService.isConnected().subscribe((value) => {
			if (value) {
				this.websocketService.connectToGame('asd123');
				this.websocketService.getGameState('asd123').subscribe(
					state => {
						if (state) {
							if (state.boardState) {
								this.game.getBoard().fromString(state.boardState);
							}
							// if (state.boardState) {
							// 	console.log(state.boardState);
							// 	this.game.getBoard().fromString(state.boardState);
							// }
							// const parsed: string[][] = JSON.parse(state)
							// this.game.getBoard().fromString(parsed);
						}
					}
				);
			}
		});
	}

	//todo handle clicking at empty pieces
	handleSpotClicked(spot: Spot) {
		if (this.currentClicked == undefined && !(spot.getPiece() instanceof Empty)) {
			this.currentClicked = spot;
		} else {
			if (spot != this.currentClicked) {
				if (this.currentClicked?.getPiece().canMove(this.game.getBoard(), this.currentClicked!, spot)) {
					let sourceX = this.currentClicked?.getX();
					let sourceY = this.currentClicked?.getY();
					let targetX = spot.getX();
					let targetY = spot.getY();


					let source: Spot = this.game.getBoard().getSpot(sourceX!, sourceY!);
					let target: Spot = this.game.getBoard().getSpot(targetX!, targetY!);
					this.game.test(source, target);

					const board: string[][] = this.game.getBoard().toString()
					let gs: GameState = new GameState();
					gs.setBoardState(board);
					this.websocketService.sendGameState(gs, 'asd123');
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
	// 		if (spot != this.currentClicked/* && this.currentClicked?.getPiece().canMove(this.game.getBoard(), this.currentClicked!, spot)*/) {
	// 			let p = this.currentClicked!.getPiece();
	// 			// console.log(p.canMove(this.game.getBoard(), this.currentClicked!, spot));
	// 			// if (p instanceof King) {
	// 			// 	console.log("Castle: " + p.canCastle(this.game.getBoard()));
	// 			// }
	//
	// 			// if (this.reachedPromotion(this.currentClicked!, spot, this.currentClicked!.getPiece().isWhite())) {
	// 			// 	console.log("Reached promotion");
	// 			// 	spot = new Spot(spot.getX(), spot.getY(), new Queen(this.currentClicked!.getPiece().isWhite()))
	// 			// }
	//
	// 			this.game.test(this.currentClicked!, spot);
	// 			this.websocketService.sendGameState(new GameState(this.game), 'asd123');
	// 			if (p instanceof King) {
	// 				console.log("Castle: " + p.canCastle(this.game.getBoard()));
	// 			}
	// 			this.currentClicked = undefined;
	// 		}
	// 	}
	// }

	reachedPromotion(start: Spot, end: Spot, white: boolean): boolean {
		let out: boolean = false;
		if (start.getPiece() instanceof Pawn) {
			if (white && end.getY() == 0) {
				out = true;
			} else if (!white && end.getY() == 7) {
				out = true;
			}
		}
		return out;
	}

	changeSide() {
		this.whiteSide = !this.whiteSide;
	}

	ngOnInit(): void {
	}

}
