// class ContestResult(BaseModel):
//     username: str
//     rank: int
//     score: int
//     name: str
//     dept: str
//     batch: str
//     codechef_username: str
//     codeforces_username: str

export interface ContestResult {
	username: string;
	rank: number;
	score: number;
	name: string;
	dept: string;
	batch: string;
	codechef_username: string;
	codeforces_username: string;
}

export interface FullContestResult {
	username: string;
	rank: number;
	score: number;
}
