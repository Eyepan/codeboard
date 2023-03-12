// class ContestResult(BaseModel):
//     username: str
//     rank: int
//     score: int
//     finish_time: str

// class ContestResults(BaseModel):
//     results: list[ContestResult]

export interface ContestResult {
	username: string;
	rank: number;
	score: number;
	finishTime: number;
}
