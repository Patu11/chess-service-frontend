import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {DataService} from "../services/data.service";
import {Subscription} from "rxjs";
import {LoginState} from "../model/LoginState";

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
	username: string = '';
	role: string = '';
	subscription?: Subscription;

	constructor(private route: Router, private dataService: DataService) {
	}

	onLogOut() {
		sessionStorage.clear();
		this.dataService.changeMessage(new LoginState('', '', '', ''));
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
		this.subscription = this.dataService.currentMessage.subscribe(state => {
			this.username = state.username
			this.role = state.role;
		});
	}

	ngOnDestroy() {
		this.subscription!.unsubscribe();
	}

}
