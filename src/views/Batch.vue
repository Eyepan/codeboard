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
let filteredStudents = reactive([] as Student[]);
const loading = ref(false);
const selectedDepartment = ref("ALL");

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
			<h1 class="text-7xl hover:bg-black w-min">BATCHES</h1>
			<h3 class="text-2xl">
				Batch: {{ currentBatch }} Dept:
				{{ selectedDepartment }} Students:
				{{
					students.filter(
						(e) =>
							selectedDepartment === "ALL" ||
							e.dept === selectedDepartment
					).length
				}}
			</h3>
			<!-- filter by dept -->
			<div class="flex flex-row gap-5 mt-5">
				<button
					v-for="criteria in filterCriterias"
					:key="criteria"
					class="w-full bg-white dark:bg-black hover:bg-white darK:hover:bg-black hover:text-white dark:hover:text-black p-2"
					:class="
						selectedDepartment === criteria
							? '!bg-[var(--primary-color)] !hover:bg-[var(--primary-hover)]'
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
