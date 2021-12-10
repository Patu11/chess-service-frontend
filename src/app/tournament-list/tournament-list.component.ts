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
	subscription?: Subscription;
	tournaments: Tournament[] = [];
	role: string = '';
	username: string = '';

	constructor(private tournamentService: TournamentService, private dataService: DataService) {
	}

	onJoin(tournament: Tournament) {
		this.tournamentService.addUserToTournament(tournament.tournamentId, this.username).subscribe(
			response => {
				console.log(response);
			},
			error => {
				console.log(error);
			}
		);
	}

	ngOnInit(): void {
		this.subscription = this.dataService.currentMessage.subscribe(state => {
			this.username = state.username;
			this.role = state.role;
		});
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
