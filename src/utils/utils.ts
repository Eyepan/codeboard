import { Student } from "./../models/student.model";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

export async function get_students_of_batch(batch: string): Promise<Student[]> {
	if (batch !== "all") {
		const response = await axios.get(`${apiUrl}/students/${batch}`);
		return response.data;
	} else {
		const response = await axios.get(`${apiUrl}/students`);
		return response.data;
	}
}

export async function get_student_by_id(id: string): Promise<Student> {
	const response = await axios.get(`${apiUrl}/students/student/${id}`);
	return response.data;
}

export async function get_student_leetcode_data(
	username: string
): Promise<any> {
	const response = await axios.get(`${apiUrl}/leetcode/user/${username}`);
	return response.data;
}
