import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
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
