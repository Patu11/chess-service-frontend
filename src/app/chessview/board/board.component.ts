import {Component, OnInit} from '@angular/core';
import {Spot} from "../../model/chess/Spot";
import {Game} from "../../model/chess/Game";
import {Player} from "../../model/chess/Player";
import {Empty} from "../../model/chess/figures/Empty";

@Component({
	selector: 'app-board',
	templateUrl: './board.component.html',
	styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
	currentClicked?: Spot;
	game: Game;
	whiteSide: boolean = true;

	constructor() {
		this.game = new Game(new Player(true), new Player(false));
	}

	//todo handle clicking at empty pieces
	handleSpotClicked(spot: Spot) {
		if (this.currentClicked == undefined && !(spot.getPiece() instanceof Empty)) {
			this.currentClicked = spot;
		} else {
			if (spot != this.currentClicked) {
				let p = this.currentClicked!.getPiece();
				console.log(p.canMove(this.game.getBoard(), this.currentClicked!, spot));

				this.game.test(this.currentClicked!, spot);

				this.currentClicked = undefined;

				console.log(this.game.getBoard().getSpots());
			} else if (this.currentClicked == spot) {
				console.log("Same piece");
			}
		}
	}

	changeSide() {
		this.whiteSide = !this.whiteSide;
	}

	ngOnInit(): void {
	}

}
