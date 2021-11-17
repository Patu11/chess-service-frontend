import {Component, OnInit} from '@angular/core';
import {Board} from "../chess/Board";

@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
	board: Board = new Board();

	constructor() {
		this.board.printBoard();}

	ngOnInit(): void {
	}

}
