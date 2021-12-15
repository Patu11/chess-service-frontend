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
	tournament?: Tournament = new Tournament(-1, '', 8, '', '2021-01-01', '2021-01-01', [], [], []);

	firstRound: GameModel[] = [];
	secondRound: GameModel[] = [];
	thirdRound: GameModel[] = [];

	constructor(private tournamentService: TournamentService, private route: ActivatedRoute) {
	}


	ngOnInit(): void {

		this.route.params.subscribe(params => {
			this.link = params['id'];
			this.tournamentService.getTournament(Number(this.link)).subscribe(
				response => {
					this.tournament = response;
					this.firstRound = this.tournament.rounds.find(r => r.roundNumber == 1)!.games
					this.secondRound = this.tournament.rounds.find(r => r.roundNumber == 2)!.games
					this.thirdRound = this.tournament.rounds.find(r => r.roundNumber == 3)!.games
				},
				error => {
					console.log(error);
				}
			);
		});
	}
}
