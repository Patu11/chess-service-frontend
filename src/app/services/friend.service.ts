import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
	providedIn: 'root'
})
export class FriendService {
	profileUrl: string = 'http://localhost:8080/friends'

	constructor(private http: HttpClient) {
	}

	createFriendship(user1: string, user2: string) {
		const body = {
			user1: user1,
			user2: user2,
			status: false
		}
		return this.http.post(this.profileUrl, body);
	}
}
