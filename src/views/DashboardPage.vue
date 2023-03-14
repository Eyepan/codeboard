<script setup lang="ts">
import { computed, onMounted, ref, watch, watchEffect, reactive } from "vue";
import { useRoute } from "vue-router";
import { get_students } from "../utils/utils";
import { Student } from "../models/student.model";
import Spinner from "../components/Spinner.vue";
import { storeToRefs } from "pinia";
import { useAppStore } from "../stores/appStore";
import ErrorLog from "../components/ErrorLog.vue";
const { currentBatch, error } = storeToRefs(useAppStore());
const route = useRoute();
let students = reactive([] as Student[]);
let batchWiseFilteredStudents = reactive([] as Student[]);
let departmentWiseFilteredStudents = reactive([] as Student[]);
let searchWiseFilteredStudents = reactive([] as Student[]);
const loading = ref(false);
const selectedDepartment = ref("ALL");
const searchFilter = ref("");

onMounted(async () => {
	loading.value = true;
	error.value = "";
	if (typeof route.params.batch === "string") {
		currentBatch.value = route.params.batch;
	}
	students = await get_students();
	batchWiseFilteredStudents = students;
	departmentWiseFilteredStudents = batchWiseFilteredStudents;
	searchWiseFilteredStudents = departmentWiseFilteredStudents;
	loading.value = false;
});

watch(currentBatch, () => {
	console.log(currentBatch.value);
	batchWiseFilteredStudents = students.filter(
		(e) => currentBatch.value === "ALL" || currentBatch.value === e.batch
	);
	departmentWiseFilteredStudents = batchWiseFilteredStudents;
	searchWiseFilteredStudents = departmentWiseFilteredStudents;
});

watch(selectedDepartment, () => {
	console.log(selectedDepartment.value);
	console.log(batchWiseFilteredStudents);
	departmentWiseFilteredStudents = batchWiseFilteredStudents.filter(
		(e) =>
			selectedDepartment.value === "ALL" ||
			e.dept === selectedDepartment.value
	);
	searchWiseFilteredStudents = departmentWiseFilteredStudents;
});

watch(searchFilter, () => {
	if (searchFilter.value !== "") {
		searchWiseFilteredStudents = departmentWiseFilteredStudents.filter(
			(e) =>
				e.name
					.toLowerCase()
					.includes(searchFilter.value.toLowerCase()) ||
				e.id.toLowerCase().includes(searchFilter.value.toLowerCase()) ||
				e.dept
					.toLowerCase()
					.includes(searchFilter.value.toLowerCase()) ||
				e.batch
					.toLowerCase()
					.includes(searchFilter.value.toLowerCase()) ||
				e.codechef_username
					.toLowerCase()
					.includes(searchFilter.value.toLowerCase()) ||
				e.codeforces_username
					.toLowerCase()
					.includes(searchFilter.value.toLowerCase()) ||
				e.leetcode_username
					.toLowerCase()
					.includes(searchFilter.value.toLowerCase())
		);
	} else {
		searchWiseFilteredStudents = departmentWiseFilteredStudents;
	}
});

const departments = [
	"ALL",
	"CSE",
	"IT",
	"ECE",
	"EEE",
	"MECH",
	"CIVIL",
	"AIDS",
	"CSBS",
];

// watch(filterCriteria, () => {
//   console.log(
//     students.filter(
//       (e) => e.dept === filterCriteria.value || filterCriteria.value === "ALL"
//     )
//   );
//   console.log(filterCriteria.value);
//   console.log(students);
// });
</script>

<template>
	<div class="p-4 w-full overflow-y-scroll">
		<Spinner v-if="loading" />
		<ErrorLog v-if="error !== ''" :message="error" />
		<div v-else>
			<div class="flex flex-row justify-between gap-10">
				<h1 class="text-7xl">Dashboard</h1>
				<input
					type="text"
					v-model="searchFilter"
					class="bg-black border min-w-0 p-2"
					placeholder="Filter students.."
				/>
			</div>
			<h3 class="text-2xl flex flex-row justify-between">
				<div>Batch: {{ currentBatch }}</div>
				<div>Dept: {{ selectedDepartment }}</div>
				<div>Students: {{ batchWiseFilteredStudents.length }}</div>
				<div>Total Students: {{ students.length }}</div>
			</h3>
			<!-- filter by dept -->
			<div class="flex flex-row gap-5 mt-5">
				<button
					v-for="department in departments"
					:key="department"
					class="btn-secondary w-full"
					:class="
						selectedDepartment === department
							? '!bg-[var(--primary-hover)] border'
							: ''
					"
					@click="selectedDepartment = department"
				>
					{{ department }}
				</button>
			</div>
			<div class="h-1 my-5 dark:bg-white bg-black w-full"></div>

			<table class="w-full">
				<th class="border border-zinc-500">Name</th>
				<th class="border border-zinc-500">Dept</th>
				<th class="border border-zinc-500">Batch</th>
				<th class="border border-zinc-500">Leetcode ID</th>
				<th class="border border-zinc-500">Codechef ID</th>
				<th class="border border-zinc-500">Codeforces ID</th>
				<tr
					v-for="student in searchWiseFilteredStudents"
					:key="student.id"
				>
					<td class="border border-zinc-500">
						<RouterLink :to="`/${student.id}`" class="underline">
							{{ student.name }}
						</RouterLink>
					</td>
					<td class="border border-zinc-500">{{ student.dept }}</td>
					<td class="border border-zinc-500">{{ student.batch }}</td>
					<td class="border border-zinc-500">
						<a
							target="_blank"
							class="underline"
							:href="`https://leetcode.com/${student.leetcode_username}`"
						>
							{{ student.leetcode_username }}
						</a>
					</td>
					<td class="border border-zinc-500">
						<a
							:href="`https://www.codechef.com/users/${student.codechef_username}`"
							target="_blank"
							class="underline"
						>
							{{ student.codechef_username }}
						</a>
					</td>
					<td class="border border-zinc-500">
						<a
							class="underline"
							target="_blank"
							:href="`https://codeforces.com/profile/${student.codeforces_username}`"
						>
							{{ student.codeforces_username }}
						</a>
					</td>
				</tr>
			</table>
		</div>
	</div>
</template>
