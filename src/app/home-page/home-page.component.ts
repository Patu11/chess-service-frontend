import {Component, OnInit} from '@angular/core';
import {DataService} from "../services/data.service";
import {Subscription} from "rxjs";

@Component({
	selector: 'app-home-page',
	templateUrl: './home-page.component.html',
	styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

	subscription?: Subscription;
	loggedIn: boolean = false;
	username: string = '';

	constructor(private dataService: DataService) {
	}

	ngOnInit(): void {
		this.subscription = this.dataService.currentMessage.subscribe(
			status => {
				this.username = status.username;
				this.loggedIn = !!status.username;
			}
		);
	}

	ngOnDestroy() {
		this.subscription!.unsubscribe();
	}
}
