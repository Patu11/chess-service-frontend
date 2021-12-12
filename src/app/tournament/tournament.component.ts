import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Tournament} from "../model/Tournament";
import {DataService} from "../services/data.service";
import {Subscription} from "rxjs";
import {TournamentService} from "../services/tournament.service";

@Component({
	selector: 'app-tournament',
	templateUrl: './tournament.component.html',
	styleUrls: ['./tournament.component.css']
})
export class TournamentComponent implements OnInit {
	subscription?: Subscription;
	@Input()
	tournament?: Tournament;

	role: string = '';
	username: string = '';
	alreadyJoined: boolean = false;
	currentNumberOfPlayers: number = 0;
	isFull: boolean = false;
	joinButtonContent: string = '';

	@Output()
	deleteId = new EventEmitter<number>();

	constructor(private tournamentService: TournamentService, private dataService: DataService) {
	}

	onDelete() {
		this.tournamentService.deleteTournament(this.tournament!.tournamentId).subscribe(
			response => {
				this.deleteId.emit(this.tournament!.tournamentId);
				console.log(response);
			},
			error => {
				console.log(error);
			}
		);
	}

	onJoin() {
		this.tournamentService.addUserToTournament(this.tournament!.tournamentId, this.username).subscribe(
			response => {
				this.alreadyJoined = true;
				this.currentNumberOfPlayers = response as number;
			},
			error => {
				console.log(error);
			}
		);
	}

	onLeave() {
		this.tournamentService.removeUserFromTournament(this.tournament!.tournamentId, this.username).subscribe(
			response => {
				this.alreadyJoined = false;
				this.currentNumberOfPlayers = response as number;
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
		this.alreadyJoined = this.tournament?.users.filter(u => u.username === this.username).length! > 0;
		this.isFull = this.tournament?.maxPlayers == this.tournament?.users.length;
		this.currentNumberOfPlayers = this.tournament!.users.length;
		this.joinButtonContent = this.isFull ? 'Full' : 'Join';
	}

	ngOnDestroy() {
		this.subscription?.unsubscribe();
	}

}
