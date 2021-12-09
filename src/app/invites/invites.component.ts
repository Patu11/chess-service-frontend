import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {User} from "../model/User";
import {Friend} from "../model/Friend";
import {FriendService} from "../services/friend.service";
import {GameModel} from "../model/GameModel";
import {GameService} from "../services/game.service";
import {Router} from "@angular/router";

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

	isInGame: boolean = false;

	constructor(private friendService: FriendService, private gameService: GameService, private route: Router) {
	}

	onFriendAccept(friend: Friend) {
		this.friendService.acceptFriendship(friend.user1, friend.user2).subscribe(
			response => {
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
				if (game.player === this.user.username) {
					gamesTemp.push(game);
				}
			}
			this.games = gamesTemp;
		}
	}

	ngOnInit(): void {
		if (sessionStorage.getItem('USER_INGAME')) {
			this.isInGame = sessionStorage.getItem('USER_INGAME') === 'true';

		} else {
			this.isInGame = false;
		}
	}
}
