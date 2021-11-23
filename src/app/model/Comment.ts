export class Comment {
	private readonly _commentId: number;
	private readonly _content: string;
	private readonly _createdAt: string;
	private readonly _author: string;


	constructor(commentId: number, content: string, createdAt: string, author: string) {
		this._commentId = commentId;
		this._content = content;
		this._createdAt = createdAt;
		this._author = author;
	}

	get commentId(): number {
		return this._commentId;
	}

	get content(): string {
		return this._content;
	}

	get createdAt(): string {
		return this._createdAt;
	}

	get author(): string {
		return this._author;
	}
}
