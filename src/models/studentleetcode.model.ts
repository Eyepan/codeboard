export interface ProblemsCount {
	difficulty: string;
	count: number;
}

export interface ProblemsPercentage {
	difficulty: string;
	percentage: number;
}

export interface SubmitStatsGlobal {
	acSubmissionNum: ProblemsCount[];
}

export interface Profile {
	ranking: number;
}

export interface MatchedUser {
	username: string;
	profile: Profile;
	problemsSolvedBeatsStats: ProblemsPercentage[];
	submitStatsGlobal: SubmitStatsGlobal;
}

export default interface StudentLeetCodeData {
	allQuestionsCount: ProblemsCount[];
	matchedUser: MatchedUser;
}
export const defaultStudentLeetCodeData: StudentLeetCodeData = {
	allQuestionsCount: [
		{
			difficulty: "",
			count: 0,
		},
		{
			difficulty: "",
			count: 0,
		},
		{
			difficulty: "",
			count: 0,
		},
		{
			difficulty: "",
			count: 0,
		},
	],
	matchedUser: {
		username: "",
		profile: {
			ranking: 0,
		},
		problemsSolvedBeatsStats: [
			{
				difficulty: "",
				percentage: 0.0,
			},
			{
				difficulty: "",
				percentage: 0.0,
			},
			{
				difficulty: "",
				percentage: 0.0,
			},
		],
		submitStatsGlobal: {
			acSubmissionNum: [
				{
					difficulty: "",
					count: 0,
				},
				{
					difficulty: "",
					count: 0,
				},
				{
					difficulty: "",
					count: 0,
				},
				{
					difficulty: "",
					count: 0,
				},
			],
		},
	},
};
