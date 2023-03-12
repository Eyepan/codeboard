<script setup lang="ts">
import { computed, onMounted, ref, watch, watchEffect, reactive } from "vue";
import { useRoute } from "vue-router";
import { get_students } from "../utils/utils";
import { Student } from "../models/student.model";
import Spinner from "./Spinner.vue";
import { storeToRefs } from "pinia";
import { useAppStore } from "../stores/appStore";
import ErrorLog from "./ErrorLog.vue";
const { currentBatch, error } = storeToRefs(useAppStore());
const route = useRoute();
let students = reactive([] as Student[]);
let filteredStudents = reactive([] as Student[]);
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
	filteredStudents = students;
	loading.value = false;
});

watch(selectedDepartment, () => {
	filteredStudents = students.filter(
		(e) =>
			((selectedDepartment.value === "ALL" ||
				e.dept === selectedDepartment.value) &&
				true) ||
			currentBatch.value === e.batch
	);
});

watch(searchFilter, () => {
	if (searchFilter.value !== "") {
		filteredStudents = students.filter(
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
		filteredStudents = students;
	}
});

watch(currentBatch, () => {
	filteredStudents = students.filter(
		(e) => currentBatch.value === "ALL" || currentBatch.value === e.batch
	);
});

const filterCriterias = [
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
			<div class="flex flex-row justify-between">
				<h1 class="text-7xl hover:bg-black w-min">Dashboard</h1>
				<input
					type="text"
					v-model="searchFilter"
					class="bg-black border ml-4 my-4 p-2 min-w-[300px]"
					placeholder="Filter students.."
				/>
			</div>
			<!-- TODO: Search bar -->
			<h3 class="text-2xl flex flex-row justify-between">
				<div>Batch: {{ currentBatch }}</div>
				<div>Dept: {{ selectedDepartment }}</div>
				<div>Students: {{ filteredStudents.length }}</div>
				<div>Total Students: {{ students.length }}</div>
			</h3>
			<!-- filter by dept -->
			<div class="flex flex-row gap-5 mt-5">
				<button
					v-for="criteria in filterCriterias"
					:key="criteria"
					class="btn-secondary w-full"
					:class="
						selectedDepartment === criteria
							? '!bg-[var(--primary-hover)]'
							: ''
					"
					@click="selectedDepartment = criteria"
				>
					{{ criteria }}
				</button>
			</div>
			<div class="h-1 my-5 dark:bg-white bg-black w-full"></div>

			<table class="w-full">
				<th class="border border-slate-500">Name</th>
				<th class="border border-slate-500">Dept</th>
				<th class="border border-slate-500">Batch</th>
				<th class="border border-slate-500">Leetcode ID</th>
				<th class="border border-slate-500">Codechef ID</th>
				<th class="border border-slate-500">Codeforces ID</th>
				<tr v-for="student in filteredStudents" :key="student.id">
					<td class="border border-slate-500">
						<RouterLink :to="`/${student.id}`" class="underline">
							{{ student.name }}
						</RouterLink>
					</td>
					<td class="border border-slate-500">{{ student.dept }}</td>
					<td class="border border-slate-500">{{ student.batch }}</td>
					<td class="border border-slate-500">
						<a
							target="_blank"
							class="underline"
							:href="`https://leetcode.com/${student.leetcode_username}`"
						>
							{{ student.leetcode_username }}
						</a>
					</td>
					<td class="border border-slate-500">
						<a
							:href="`https://www.codechef.com/users/${student.codechef_username}`"
							target="_blank"
							class="underline"
						>
							{{ student.codechef_username }}
						</a>
					</td>
					<td class="border border-slate-500">
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
