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
	currentClicked?: Spot;

	@Output()
	move = new EventEmitter<Move>();

	@Input()
	board?: Board;

	@Input()
	player?: Player;

	constructor() {
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

	ngOnInit(): void {
	}

}
