import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Empty} from "../../model/chess/figures/Empty";
import {Spot} from "../../model/chess/Spot";

@Component({
	selector: 'app-square',
	templateUrl: './square.component.html',
	styleUrls: ['./square.component.scss']
})
export class SquareComponent implements OnInit {
	@Input()
	isWhite: boolean | undefined;

	@Input()
	spot?: Spot;

	@Output()
	clickedSpot = new EventEmitter<Spot>();

	isEmptyFigure: boolean = true;
	imageSrc: string | undefined;
	color: string = '';

	constructor() {

	}

	onPieceClick() {
		// console.log(this.spot?.getPiece());
		// console.log("X: " + this.spot!.getX() + " Y: " + this.spot!.getY() + " NOTATION: " + this.spot?.getNotation() + ' PIECE: ' + this.spot!.getPiece().getFigureSvg());
		this.clickedSpot.emit(this.spot);
	}

	ngOnInit(): void {
		this.isEmptyFigure = this.spot!.getPiece() instanceof Empty;
		this.imageSrc = this.spot?.getPiece().getFigureSvg();
		this.isWhite = (this.spot!.getX() + this.spot!.getY()) % 2 == 0;
		this.color = this.isWhite ? '#eeeed2' : '#769656';
	}
}
