import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {ProfileService} from "../services/profile.service";
import {ActivatedRoute} from "@angular/router";

@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.css'],
	providers: [UserService, ProfileService]
})
export class MainComponent implements OnInit {
	constructor() {

	}

	ngOnInit(): void {
	}

}
