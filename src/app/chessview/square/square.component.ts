import {Component, Input, OnInit} from '@angular/core';
import {Piece} from "../../chess/figures/Piece";
import {Empty} from "../../chess/figures/Empty";

@Component({
	selector: 'app-square',
	templateUrl: './square.component.html',
	styleUrls: ['./square.component.scss']
})
export class SquareComponent implements OnInit {
	@Input()
	isWhite: boolean | undefined;

	@Input()
	piece: Piece = new Empty(false);

	@Input()
	coordX: number | undefined;

	@Input()
	coordY: number | undefined;

	isEmptyFigure: boolean = true;
	imageSrc: string | undefined;
	color: string = '';
	opacity: number = 1;
	letters: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

	constructor() {

	}

	onPieceClick() {
		this.opacity = 0.5;
		let notation = this.letters[this.coordY!] + (8 - this.coordX!);
		console.log(this.piece);
		console.log(notation);
	}

	ngOnInit(): void {
		this.isEmptyFigure = this.piece instanceof Empty;
		this.imageSrc = this.piece.getFigureSvg();
		this.isWhite = (this.coordX! + this.coordY!) % 2 == 0;
		this.color = this.isWhite ? '#eeeed2' : '#769656';
	}
}
