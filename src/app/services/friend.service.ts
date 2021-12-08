import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
	providedIn: 'root'
})
export class FriendService {
	friendUrl: string = 'http://localhost:8080/friends'

	constructor(private http: HttpClient) {
	}

	createFriendship(user1: string, user2: string) {
		const body = {
			user1: user1,
			user2: user2,
			status: false
		}
		return this.http.post(this.friendUrl, body);
	}

	acceptFriendship(user1: string, user2: string) {
		const body = {
			user1: user1,
			user2: user2,
			status: false
		}

		return this.http.put(this.friendUrl + '/accept', body);
	}

	checkFriendship(user1: string, user2: string) {
		return this.http.get(this.friendUrl + '/' + user1 + '/' + user2, {responseType: 'json'});
	}

	deleteFriendship(user1: string, user2: string) {
		return this.http.delete(this.friendUrl + '/delete/' + user1 + "/" + user2);
	}

	declineFriendship(user1: string, user2: string) {
		return this.http.delete(this.friendUrl + '/delete/' + user1 + "/" + user2);
	}
}
