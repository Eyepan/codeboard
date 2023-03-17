<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import Spinner from "../components/Spinner.vue";
import { Student } from "../models/student.model";
import { get_student_by_id, get_student_leetcode_data } from "../utils/utils";
import {
	type StudentLeetCodeData,
	defaultStudentLeetCodeData,
} from "../models/studentleetcode.model";
import { Bar } from "vue-chartjs";
import { Pie } from "vue-chartjs";
import {
	Chart as ChartJS,
	Title,
	Tooltip,
	Legend,
	BarElement,
	CategoryScale,
	LinearScale,
	ArcElement,
} from "chart.js";
import { storeToRefs } from "pinia";
import { useAppStore } from "../stores/appStore";
import ErrorLog from "../components/ErrorLog.vue";
const { error } = storeToRefs(useAppStore());
const route = useRoute();
const loading = ref(false);
const student = ref({} as Student);
const studentLeetCodeData = ref<StudentLeetCodeData>(
	defaultStudentLeetCodeData
);

onMounted(async () => {
	loading.value = true;
	error.value = "";
	if (typeof route.params.id === "string") {
		student.value = await get_student_by_id(route.params.id);
	}
	studentLeetCodeData.value = await get_student_leetcode_data(
		student.value.leetcode_username
	);
	if (error.value !== "") {
		student.value = await {
			id: "Not Found",
			name: "Not Found",
			dept: "Not Found",
			batch: "Not Found",
			leetcode_username: "Not Found",
			codechef_username: "Not Found",
			codeforces_username: "Not Found",
		};
	}
	loading.value = false;
});
ChartJS.register(
	Title,
	Tooltip,
	Legend,
	BarElement,
	CategoryScale,
	LinearScale,
	ArcElement
);
</script>

<template>
	<div v-auto-animate class="p-4 h-screen overflow-y-scroll">
		<ErrorLog v-if="error !== ''" :message="error" />
		<Spinner v-if="loading" />
		<div v-else>
			<button
				class="btn-primary cursor-pointer w-1/12 p-0 my-2 bg-zinc-500"
				@click="$router.push('/')"
			>
				<span>Go back</span>
			</button>
			<h1 class="text-7xl mb-5">{{ student.name }}</h1>
			<h3 class="text-3xl">Student Details:</h3>
			<div class="grid grid-cols-3 my-5">
				<p class="">Name: {{ student.name }}</p>
				<p>Dept: {{ student.dept }}</p>
				<p>Batch: {{ student.batch }}</p>
				<p>
					Leetcode:
					<a
						:href="`https://www.leetcode.com/${student.leetcode_username}`"
						target="_blank"
						class="underline"
						>{{ student.leetcode_username }}</a
					>
				</p>
				<p>
					Codechef:
					<a
						:href="`https://www.codechef.com/users/${student.codechef_username}`"
						target="_blank"
						class="underline"
					>
						{{ student.codechef_username }}
					</a>
				</p>
				<p>
					CodeForces:
					<a
						class="underline"
						target="_blank"
						:href="`https://codeforces.com/profile/${student.codeforces_username}`"
					>
						{{ student.codeforces_username }}
					</a>
				</p>
			</div>
			<h3 class="text-3xl">Leetcode Details:</h3>
			<div class="grid grid-cols-3 my-5">
				<p>
					Total Solved: {{ studentLeetCodeData.totalQuestionsSolved }}
				</p>
				<p>
					Total Questions:
					{{ studentLeetCodeData.totalQuestionsCount }}
				</p>
				<p>
					Ranking:
					{{ studentLeetCodeData.ranking }}
				</p>

				<p>
					Easy Solved:
					{{ studentLeetCodeData.easyQuestionsSolved }}
				</p>
				<p>
					Medium Solved:
					{{ studentLeetCodeData.mediumQuestionsSolved }}
				</p>
				<p>
					Hard Solved:
					{{ studentLeetCodeData.hardQuestionsSolved }}
				</p>
			</div>
			<h3 class="text-3xl">Leetcode Progress:</h3>
			<div class="grid grid-cols-2 mt-5 lg:grid-cols-3 w-full gap-5">
				<div
					class="border flex items-center justify-center flex-col gap-10 h-96"
				>
					<Bar
						id="my-chart-id"
						:options="{
							responsive: true,
							maintainAspectRatio: false,
						}"
						:data="{
							labels: ['Easy', 'Medium', 'Hard'],
							datasets: [
								{
									label: 'Solved Questions',
									backgroundColor: [
										'#41B883',
										'#00D8FF',
										'#E46651',
									],
									data: [
										studentLeetCodeData.easyQuestionsSolved,
										studentLeetCodeData.mediumQuestionsSolved,
										studentLeetCodeData.hardQuestionsSolved,
									],
								},
							],
						}"
					/>
				</div>
				<!-- pie chart of completion -->
				<div
					class="border flex items-center justify-center flex-col h-96 p-4"
				>
					<Pie
						id="my-chart-id"
						:options="{
							responsive: true,
							animation: true,
						}"
						:data="{
							datasets: [
								{
									label: 'Questions',
									backgroundColor: [
										'#41B883',
										'#00D8FF',
										'#E46651',
									],
									data: [
										studentLeetCodeData.easyQuestionsSolved,
										studentLeetCodeData.mediumQuestionsSolved,
										studentLeetCodeData.hardQuestionsSolved,
									],
								},
							],
						}"
					/>
					<!-- legend -->
					<div class="flex flex-row gap-10">
						<div class="flex flex-row items-center">
							<div
								class="w-4 h-4 rounded-full mr-2"
								style="background-color: #41b883"
							></div>
							<p>Easy</p>
						</div>
						<div class="flex flex-row items-center">
							<div
								class="w-4 h-4 rounded-full mr-2"
								style="background-color: #00d8ff"
							></div>
							<p>Medium</p>
						</div>
						<div class="flex flex-row items-center">
							<div
								class="w-4 h-4 rounded-full mr-2"
								style="background-color: #e46651"
							></div>
							<p>Hard</p>
						</div>
					</div>
				</div>
				<div
					class="border flex items-center justify-center flex-col h-96 p-4"
				>
					<Pie
						class="w-full"
						id="my-chart-id"
						:options="{
							responsive: true,
							animation: true,
						}"
						:data="{
							datasets: [
								{
									label: 'Questions',
									backgroundColor: ['#41B883', '#E46651'],
									data: [
										studentLeetCodeData.totalQuestionsSolved,
										studentLeetCodeData.totalQuestionsCount -
											studentLeetCodeData.totalQuestionsSolved,
									],
								},
							],
						}"
					/>
					<!-- legend -->
					<div class="flex flex-row gap-10">
						<div class="flex flex-row items-center">
							<div
								class="w-4 h-4 rounded-full mr-2"
								style="background-color: #41b883"
							></div>
							<p>Solved</p>
						</div>
						<div class="flex flex-row items-center">
							<div
								class="w-4 h-4 rounded-full mr-2"
								style="background-color: #e46651"
							></div>
							<p>Unsolved</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
