import {Component, OnInit} from '@angular/core';
import {Tournament} from "../model/Tournament";
import {TournamentService} from "../services/tournament.service";

@Component({
	selector: 'app-create-tournament',
	templateUrl: './create-tournament.component.html',
	styleUrls: ['./create-tournament.component.css']
})
export class CreateTournamentComponent implements OnInit {

	title: string = '';
	startDate?: string = new Date().toISOString().split('T')[0];
	endDate?: string;

	dateError: boolean = false;
	titleError: boolean = false;

	addingSuccess: boolean = false;

	constructor(private tournamentService: TournamentService) {
	}

	onAddTournament() {
		let startDate: Date = new Date(this.startDate!);
		let endDate: Date = new Date(this.endDate!);
		if (startDate >= endDate) {
			this.dateError = true;
		}

		if (!this.title) {
			this.titleError = true;
		}

		if (this.title && this.startDate && this.endDate && endDate > startDate) {
			let tournament: Tournament = new Tournament(-1, this.title, 8, '', this.startDate, this.endDate, [], [], []);
			this.tournamentService.createTournament(tournament).subscribe(
				response => {
					console.log(response);
					this.resetFields();
					this.addingSuccess = true;
				},
				error => {
					console.log(error);
				}
			);
		}

	}

	resetFields() {
		this.dateError = false;
		this.titleError = false;
		this.title = '';
		this.startDate = new Date().toISOString().split('T')[0];
		this.endDate = undefined;
	}

	ngOnInit(): void {
	}

}
