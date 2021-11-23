export class Comment {
	private readonly _content: string;
	private readonly _createdAt: string;
	private readonly _author: string;
	private readonly _profileId: number;


	constructor(content: string, createdAt: string, author: string, profileId: number) {
		this._content = content;
		this._createdAt = createdAt;
		this._author = author;
		this._profileId = profileId;
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

	get profileId(): number {
		return this._profileId;
	}
}
