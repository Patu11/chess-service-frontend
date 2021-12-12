import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Tournament} from "../model/Tournament";
import {GameModel} from "../model/GameModel";

@Injectable({
	providedIn: 'root'
})
export class TournamentService {

	tournamentUrl: string = 'http://localhost:8080/tournaments'

	constructor(private http: HttpClient) {
	}

	removeUserFromTournament(tournamentId: number, username: string) {
		const body = {
			username: username
		};
		return this.http.put(this.tournamentUrl + '/leave/' + tournamentId, body);
	}

	addUserToTournament(tournamentId: number, username: string) {
		const body = {
			username: username
		};
		return this.http.put(this.tournamentUrl + '/join/' + tournamentId, body);
	}

	getAllTournamentGames(tournamentId: number) {
		return this.http.get<GameModel[]>(this.tournamentUrl + '/games/' + tournamentId);
	}

	getAllTournaments() {
		return this.http.get<Tournament[]>(this.tournamentUrl + '/all');
	}

	getTournament(tournamentId: number) {
		return this.http.get<Tournament>(this.tournamentUrl + '/' + tournamentId);
	}

	createTournament(tournament: Tournament) {
		const body = {
			tournamentId: tournament.tournamentId,
			title: tournament.title,
			maxPlayers: tournament.maxPlayers,
			startDate: tournament.startDate,
			endDate: tournament.endDate,
			users: tournament.users,
			games: tournament.games
		};
		return this.http.post(this.tournamentUrl + '/create', body);
	}

	deleteTournament(tournamentId: number) {
		return this.http.delete(this.tournamentUrl + '/delete/' + tournamentId);
	}
}
