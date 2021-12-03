import {Component, Input, OnInit} from '@angular/core';
import {Friend} from "../model/Friend";
import {FriendService} from "../services/friend.service";

@Component({
	selector: 'app-friend-list',
	templateUrl: './friend-list.component.html',
	styleUrls: ['./friend-list.component.css']
})
export class FriendListComponent implements OnInit {

	@Input()
	friends!: Friend[];

	constructor(private friendService: FriendService) {
	}

	onRemoveFriend(friend: Friend) {
		this.friendService.deleteFriendship(friend.user1, friend.user2).subscribe(
			response => {
				console.log(response);
			},
			error => {
				console.log(error);
			}
		);
	}

	ngOnInit(): void {
	}

}
