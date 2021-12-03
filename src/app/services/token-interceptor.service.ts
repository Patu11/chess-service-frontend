import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
	providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		if (!req.url.includes('/users/login') && !req.url.includes('/users/signup') && !req.url.includes('/users/delete')) {
			const email = sessionStorage.getItem('USER_EMAIL');
			const password = sessionStorage.getItem('USER_PASSWORD');
			let userToken = '';
			if (email && password) {
				userToken = this.createBasicToken(email, password);
			}

			const modifiedReq = req.clone({
				headers: req.headers.set('authorization', userToken),
			});
			return next.handle(modifiedReq);
		}
		return next.handle(req);
	}

	createBasicToken(email: string, password: string) {
		return 'Basic ' + btoa(email + ':' + password);
	}
}
