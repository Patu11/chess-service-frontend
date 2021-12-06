import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {ProfileService} from "../services/profile.service";
import {Router} from "@angular/router";
import {WebsocketService} from "../services/websocket.service";

@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.css'],
	providers: [UserService, ProfileService, WebsocketService]
})
export class MainComponent implements OnInit {

	username: string = '';

	constructor(private route: Router) {

	}

	onLogOut() {
		sessionStorage.clear();
		this.username = '';
	}

	onProfileClick() {
		if (!sessionStorage.getItem('USER_USERNAME')) {
			this.username = '';
			this.route.navigateByUrl('/profile/');
		} else {
			this.username = sessionStorage.getItem('USER_USERNAME')!;
			this.route.navigateByUrl('/profile/' + this.username);
		}
	}

	ngOnInit(): void {
		if (sessionStorage.getItem('USER_USERNAME')) {
			this.username = sessionStorage.getItem('USER_USERNAME')!;
		}
	}

}
