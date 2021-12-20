import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {User} from "../model/User";
import {Friend} from "../model/Friend";
import {FriendService} from "../services/friend.service";
import {GameModel} from "../model/GameModel";
import {GameService} from "../services/game.service";
import {Router} from "@angular/router";
import {TournamentService} from "../services/tournament.service";

@Component({
	selector: 'app-invites',
	templateUrl: './invites.component.html',
	styleUrls: ['./invites.component.css']
})
export class InvitesComponent implements OnInit {

	@Input()
	user: User = new User('', '', '', [], [], new Set(), []);

	@Input()
	games: GameModel[] = [];

	friends: Friend[] = [];

	isInGame: boolean = false;

	constructor(private friendService: FriendService, private gameService: GameService, private tournamentService: TournamentService, private route: Router) {
	}

	onFriendAccept(friend: Friend) {
		this.friendService.acceptFriendship(friend.user1, friend.user2).subscribe(
			response => {
				this.friends.forEach((item, index) => {
					if (item.user1 === friend.user1 && item.user2 === friend.user2) this.friends.splice(index, 1);
				});
				console.log(response);
			},
			error => {
				console.log(error);
			}
		);
	}

	onFriendDecline(friend: Friend) {
		this.friendService.declineFriendship(friend.user1, friend.user2).subscribe(
			response => {
				this.friends.forEach((item, index) => {
					if (item.user1 === friend.user1 && item.user2 === friend.user2) this.friends.splice(index, 1);
				});
				console.log(response);
			},
			error => {
				console.log(error)
			}
		);
	}

	onGameAccept(game: GameModel) {
		this.gameService.acceptGameInvite(game.code).subscribe(
			response => {
				sessionStorage.setItem('USER_INGAME', 'true');
				this.isInGame = true;
				this.route.navigate(['/game']);
			},
			error => {
				console.log(error);
			}
		);
	}

	onGameDecline(game: GameModel) {
		this.gameService.declineGameInvite(game.code).subscribe(
			response => {
				sessionStorage.setItem('USER_INGAME', 'false');
				this.isInGame = false;
				console.log(response);
			},
			error => {
				console.log(error);
			}
		);
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes['games']) {
			let gamesTemp: GameModel[] = [];
			for (let game of this.games) {
				if (game.tournamentId && game.tournamentId != -1) {
					this.tournamentService.getTournament(game.tournamentId).subscribe(
						response => {
							let now = Date.now();
							let endDate = Date.parse(response.endDate);
							let isOver = now >= endDate;
							if (game.player === this.user.username && !game.accepted && !isOver) {
								gamesTemp.push(game);
							}
						},
						error => {
							console.log(error);
						}
					);
				} else {
					if (game.player === this.user.username && !game.accepted) {
						gamesTemp.push(game);
					}
				}
			}
			this.games = gamesTemp;
		}
	}

	ngOnInit(): void {
		this.friends = this.user.friends.filter(f => !f.status && f.sender !== this.user.username);
		if (sessionStorage.getItem('USER_INGAME')) {
			this.isInGame = sessionStorage.getItem('USER_INGAME') === 'true';

		} else {
			this.isInGame = false;
		}
	}
}
