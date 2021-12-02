import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MainComponent} from './main/main.component';
import {LoginComponent} from './login/login.component';
import {FormsModule} from "@angular/forms";
import {SignupComponent} from './signup/signup.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {SquareComponent} from './chessview/square/square.component';
import {BoardComponent} from './chessview/board/board.component';
import {ProfileComponent} from './profile/profile.component';
import {CommentComponent} from './comment/comment.component';
import {CommentListComponent} from './comment-list/comment-list.component';
import {ProfileCardComponent} from './profile-card/profile-card.component';
import {FriendListComponent} from './friend-list/friend-list.component';
import {ModifyAccountComponent} from './modify-account/modify-account.component';
import {UserListComponent} from './user-list/user-list.component';
import {FriendInvitesComponent} from './friend-invites/friend-invites.component';
import {TokenInterceptorService} from "./services/token-interceptor.service";

@NgModule({
	declarations: [
		AppComponent,
		MainComponent,
		LoginComponent,
		SignupComponent,
		SquareComponent,
		BoardComponent,
		ProfileComponent,
		CommentComponent,
		CommentListComponent,
		ProfileCardComponent,
		FriendListComponent,
		ModifyAccountComponent,
		UserListComponent,
		FriendInvitesComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		HttpClientModule
	],
	providers: [{provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true}],
	bootstrap: [AppComponent]
})
export class AppModule {
}
