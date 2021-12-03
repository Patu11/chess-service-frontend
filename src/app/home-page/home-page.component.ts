import {Component, OnInit} from '@angular/core';

@Component({
	selector: 'app-home-page',
	templateUrl: './home-page.component.html',
	styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

	loggedIn: boolean = false;

	constructor() {
	}

	ngOnInit(): void {
		if (sessionStorage.getItem('USER_USERNAME')) {
			this.loggedIn = true;
		}
	}
}
