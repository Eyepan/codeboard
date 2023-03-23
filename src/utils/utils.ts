import { ContestResult as CCContestResult } from "../models/cccontests.model";
import { ContestResult as LCContestResult } from "../models/lccontests.model";
import { Student } from "./../models/student.model";
import axios from "axios";
import {
	type StudentLeetCodeData,
	defaultStudentLeetCodeData,
} from "./../models/studentleetcode.model";
import { storeToRefs } from "pinia";
import { useAppStore } from "../stores/appStore";

const { error } = storeToRefs(useAppStore());

const apiUrl = import.meta.env.VITE_API_URL;

export async function get_students(): Promise<Student[]> {
	let students: Student[] = [
		{
			id: "",
			name: "",
			dept: "",
			batch: "",
			leetcode_username: "",
			codechef_username: "",
			codeforces_username: "",
			leetcode_easy_problems: 0,
			leetcode_medium_problems: 0,
			leetcode_hard_problems: 0,
			leetcode_total_problems: 0,
		},
	];
	await axios
		.get(`${apiUrl}/students`)
		.then((response) => {
			students = response.data;
		})
		.catch((e) => {
			if (e.response) {
				error.value = e.response.data;
			}
		});
	return students;
}

export async function get_student_by_id(id: string): Promise<Student> {
	let student: Student = {
		id: "",
		name: "",
		dept: "",
		batch: "",
		leetcode_username: "",
		codechef_username: "",
		codeforces_username: "",
		leetcode_easy_problems: 0,
		leetcode_medium_problems: 0,
		leetcode_hard_problems: 0,
		leetcode_total_problems: 0,
	};
	await axios
		.get(`${apiUrl}/students/student/${id}`)
		.then((response) => {
			student = response.data;
		})
		.catch((e) => {
			if (e.response) {
				error.value = e.response.data;
			}
		});
	return student;
}

export async function get_student_leetcode_data(
	username: string
): Promise<StudentLeetCodeData> {
	let studentLeetCodeData = defaultStudentLeetCodeData;

	await axios
		.get(`${apiUrl}/leetcode/user/${username}`)
		.then((response) => {
			studentLeetCodeData = response.data;
		})
		.catch((e) => {
			if (e.response) {
				error.value = e.response.data["detail"];
			}
		});
	return studentLeetCodeData;
}

export async function get_leetcode_contest_details(contestCode: string) {
	let contestResultData: LCContestResult[] = [];
	console.log(`${apiUrl}/leetcode/${contestCode}`);
	await axios
		.get(`${apiUrl}/leetcode/${contestCode}`)
		.then((response) => {
			contestResultData = response.data;
		})
		.catch((e) => {
			if (e.response) {
				error.value = e.response.data["detail"];
			}
		});
	return contestResultData;
}

export async function get_codechef_contest_details(contestCode: string) {
	let contestResultData: CCContestResult[] = [];
	console.log(`${apiUrl}/codechef/${contestCode}`);
	await axios
		.get(`${apiUrl}/codechef/${contestCode}`)
		.then((response) => {
			contestResultData = response.data;
		})
		.catch((e) => {
			if (e.response) {
				error.value = e.response.data["detail"];
			}
		});
	return contestResultData;
}
