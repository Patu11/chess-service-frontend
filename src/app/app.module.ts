import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MainComponent} from './main/main.component';
import {LoginComponent} from './login/login.component';
import {FormsModule} from "@angular/forms";
import {SignupComponent} from './signup/signup.component';
import {HttpClientModule} from "@angular/common/http";
import {SquareComponent} from './chessview/square/square.component';
import {BoardComponent} from './chessview/board/board.component';
import { ProfileComponent } from './profile/profile.component';
import { CommentComponent } from './comment/comment.component';
import { CommentListComponent } from './comment-list/comment-list.component';

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
  CommentListComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		HttpClientModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
