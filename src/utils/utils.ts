import { defaultStudentLeetCodeData } from "./../models/studentleetcode.model";
import { Student } from "./../models/student.model";
import axios from "axios";
import StudentLeetCodeData from "../models/studentleetcode.model";
import { storeToRefs } from "pinia";
import { useAppStore } from "../stores/appStore";
const { error } = storeToRefs(useAppStore());

const apiUrl = import.meta.env.VITE_API_URL;

export async function get_students_of_batch(batch: string): Promise<Student[]> {
	let students: Student[] = [
		{
			id: "",
			name: "",
			dept: "",
			batch: "",
			leetcode_username: "",
			codechef_username: "",
			codeforces_username: "",
		},
	];
	if (batch === "ALL") {
		await axios
			.get(`${apiUrl}/students`)
			.then((response) => {
				students = response.data;
			})
			.catch((e) => {
				error.value = e;
			});
	} else {
		await axios
			.get(`${apiUrl}/students/${batch}`)
			.then((response) => {
				students = response.data;
			})
			.catch((e) => {
				error.value = e;
			});
	}
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
	};
	await axios
		.get(`${apiUrl}/students/student/${id}`)
		.then((response) => {
			student = response.data;
		})
		.catch((e) => {
			error.value = e;
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
			error.value = e;
		});
	return studentLeetCodeData;
}
