import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TournamentService} from "../services/tournament.service";
import {Tournament} from "../model/Tournament";
import {GameModel} from "../model/GameModel";

@Component({
	selector: 'app-tournament-page',
	templateUrl: './tournament-page.component.html',
	styleUrls: ['./tournament-page.component.css']
})
export class TournamentPageComponent implements OnInit {

	link: string = '';
	tournament?: Tournament = new Tournament(-1, '', '', 8, '', '2021-01-01', '2021-01-01', [], []);

	secondRound = [];
	thirdRound = [];

	constructor(private tournamentService: TournamentService, private route: ActivatedRoute) {
	}

	ngOnInit(): void {
		this.route.params.subscribe(params => {
			this.link = params['id'];
			this.tournamentService.getTournament(Number(this.link)).subscribe(
				response => {
					this.tournament = response;
				},
				error => {
					console.log(error);
				}
			);
		});
	}
}
