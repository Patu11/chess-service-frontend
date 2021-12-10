import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Tournament} from "../model/Tournament";

@Injectable({
	providedIn: 'root'
})
export class TournamentService {

	tournamentUrl: string = 'http://localhost:8080/tournaments'

	constructor(private http: HttpClient) {
	}

	addUserToTournament(tournamentId: number, username: string) {
		const body = {
			username: username
		};
		return this.http.put(this.tournamentUrl + '/join/' + tournamentId, body);
	}

	getAllTournaments() {
		return this.http.get<Tournament[]>(this.tournamentUrl + '/all');
	}

	createTournament(tournament: Tournament) {
		return this.http.post(this.tournamentUrl, tournament);
	}
}
