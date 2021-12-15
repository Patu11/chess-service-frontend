import {Component, Input, OnInit} from '@angular/core';
import {GameModel} from "../model/GameModel";

@Component({
	selector: 'app-tournament-game-list',
	templateUrl: './tournament-game-list.component.html',
	styleUrls: ['./tournament-game-list.component.css']
})
export class TournamentGameListComponent implements OnInit {

	@Input()
	games?: GameModel[];

	@Input()
	roundTitle: string = '';

	constructor() {
	}

	ngOnInit(): void {
	}

}
