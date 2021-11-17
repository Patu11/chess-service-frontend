import {Component, OnInit} from '@angular/core';
import {Board} from "../../chess/Board";
import {Spot} from "../../chess/Spot";
import {Piece} from "../../chess/figures/Piece";
import {Empty} from "../../chess/figures/Empty";

@Component({
	selector: 'app-board',
	templateUrl: './board.component.html',
	styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
	board: Board = new Board();
	boxes: Spot[][];

	constructor() {
		this.boxes = this.board.getBoxes();
	}

	ngOnInit(): void {
	}

}
