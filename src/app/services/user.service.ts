import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../models/User";

@Injectable({
	providedIn: 'root'
})
export class UserService {

	userUrl: string = 'http://localhost:8080/users'

	constructor(private http: HttpClient) {
	}

	createUser(user: User) {
		return this.http.post<User>(this.userUrl, user);
	}

}
