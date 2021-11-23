import {Component, OnInit} from '@angular/core';
import {Spot} from "../../model/chess/Spot";
import {Game} from "../../model/chess/Game";
import {Player} from "../../model/chess/Player";
import {Empty} from "../../model/chess/figures/Empty";
import {Pawn} from "../../model/chess/figures/Pawn";
import {King} from "../../model/chess/figures/King";

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
			if (spot != this.currentClicked/* && this.currentClicked?.getPiece().canMove(this.game.getBoard(), this.currentClicked!, spot)*/) {
				let p = this.currentClicked!.getPiece();
				// console.log(p.canMove(this.game.getBoard(), this.currentClicked!, spot));
				if (p instanceof King) {
					console.log("Castle: " + p.canCastle(this.game.getBoard()));
				}

				// if (this.reachedPromotion(this.currentClicked!, spot, this.currentClicked!.getPiece().isWhite())) {
				// 	console.log("Reached promotion");
				// 	spot = new Spot(spot.getX(), spot.getY(), new Queen(this.currentClicked!.getPiece().isWhite()))
				// }

				this.game.test(this.currentClicked!, spot);

				this.currentClicked = undefined;

				console.log(this.game.getBoard().getSpots());
			}
		}
	}

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
