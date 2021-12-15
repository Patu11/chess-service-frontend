import {Component, Input, OnInit} from '@angular/core';
import {GameModel} from "../model/GameModel";

@Component({
	selector: 'app-tournament-game',
	templateUrl: './tournament-game.component.html',
	styleUrls: ['./tournament-game.component.css']
})
export class TournamentGameComponent implements OnInit {

	@Input()
	game?: GameModel;

	constructor() {
	}

	ngOnInit(): void {
	}

}
