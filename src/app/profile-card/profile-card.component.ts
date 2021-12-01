import {Component, Input, OnInit} from '@angular/core';
import {User} from "../model/User";
import {FriendService} from "../services/friend.service";

@Component({
	selector: 'app-profile-card',
	templateUrl: './profile-card.component.html',
	styleUrls: ['./profile-card.component.css']
})
export class ProfileCardComponent implements OnInit {

	@Input()
	user: User = new User('', '', '', [], []);

	constructor(private friendService: FriendService) {
	}

	//TODO fill data from localstorage
	onAddFriend() {
		this.friendService.createFriendship("test1", "test2").subscribe(
			(response) => {
				console.log(response);
			},
			(error) => {
				console.log(error);
			}
		);
	}

	ngOnInit(): void {
	}

}
