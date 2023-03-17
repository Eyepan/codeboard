// {
//     "username": "pan-iyappan",
//     "ranking": 371820,
//     "totalQuestionsCount": 2590,
//     "totalQuestionsSolved": 164,
//     "easyQuestionsCount": 634,
//     "easyQuestionsSolved": 53,
//     "mediumQuestionsCount": 1377,
//     "mediumQuestionsSolved": 93,
//     "hardQuestionsCount": 579,
//     "hardQuestionsSolved": 18
//   }

export interface StudentLeetCodeData {
	username: string;
	ranking: number;
	totalQuestionsCount: number;
	totalQuestionsSolved: number;
	easyQuestionsCount: number;
	easyQuestionsSolved: number;
	mediumQuestionsCount: number;
	mediumQuestionsSolved: number;
	hardQuestionsCount: number;
	hardQuestionsSolved: number;
}
export const defaultStudentLeetCodeData: StudentLeetCodeData = {
	username: "",
	ranking: 0,
	totalQuestionsCount: 0,
	totalQuestionsSolved: 0,
	easyQuestionsCount: 0,
	easyQuestionsSolved: 0,
	mediumQuestionsCount: 0,
	mediumQuestionsSolved: 0,
	hardQuestionsCount: 0,
	hardQuestionsSolved: 0,
};
