import {Component, Input, OnInit} from '@angular/core';
import {User} from "../model/User";

@Component({
	selector: 'app-profile-card',
	templateUrl: './profile-card.component.html',
	styleUrls: ['./profile-card.component.css']
})
export class ProfileCardComponent implements OnInit {

	@Input()
	user: User = new User('', '', '', []);

	constructor() {
	}

	ngOnInit(): void {
	}

}
