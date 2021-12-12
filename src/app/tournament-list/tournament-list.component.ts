import {Component, OnInit} from '@angular/core';
import {Tournament} from "../model/Tournament";
import {TournamentService} from "../services/tournament.service";
import {DataService} from "../services/data.service";
import {Subscription} from "rxjs";

@Component({
	selector: 'app-tournament-list',
	templateUrl: './tournament-list.component.html',
	styleUrls: ['./tournament-list.component.css']
})
export class TournamentListComponent implements OnInit {
	tournaments: Tournament[] = [];

	constructor(private tournamentService: TournamentService) {
	}

	onDelete(tournamentId: number) {
		this.tournaments.forEach((item, index) => {
			if (item.tournamentId == tournamentId) this.tournaments.splice(index, 1);
		});
	}

	ngOnInit(): void {
		this.tournamentService.getAllTournaments().subscribe(
			response => {
				this.tournaments = response;
			},
			error => {
				console.log(error);
			}
		);
	}
}
