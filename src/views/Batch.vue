<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useAppStore } from "../stores/appStore";
import { get_students_of_batch } from "../utils/utils";
import { Student } from "../models/student.model";
import Spinner from "../components/Spinner.vue";

const { currentBatch } = storeToRefs(useAppStore());
const route = useRoute();
const students = ref([] as Student[]);
const loading = ref(false);
const filterCriteria = ref("ALL");

onMounted(async () => {
	loading.value = true;
	if (typeof route.params.batch === "string") {
		currentBatch.value = route.params.batch;
	}
	students.value = await get_students_of_batch(currentBatch.value);
	loading.value = false;
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
//     students.value.filter(
//       (e) => e.dept === filterCriteria.value || filterCriteria.value === "ALL"
//     )
//   );
//   console.log(filterCriteria.value);
//   console.log(students.value);
// });
</script>

<template>
	<div class="p-4 w-full">
		<Spinner v-if="loading" />
		<div v-else>
			<h1 class="text-7xl hover:bg-black w-min">BATCHES</h1>
			<h3 class="text-2xl">Batch: {{ currentBatch }}</h3>
			<!-- filter by dept -->
			<div class="flex flex-row gap-5">
				<button
					v-for="criteria in filterCriterias"
					:key="criteria"
					class="w-full bg-white dark:bg-black hover:bg-white darK:hover:bg-black rounded-xl hover:text-white dark:hover:text-black p-2"
					:class="filterCriteria === criteria ? '!bg-gray-500' : ''"
					@click="filterCriteria = criteria"
				>
					{{ criteria }}
				</button>
			</div>
			<div class="h-1 bg-white dark:bg-black w-full"></div>
			<!-- show students filtered by dept -->
			{{
				filterCriteria === "ALL"
					? ""
					: `Students of
    ${filterCriteria} Department`
			}}
			<table class="table-auto w-full">
				<th class="border border-slate-500">Name</th>
				<th class="border border-slate-500">Dept</th>
				<th class="border border-slate-500">Batch</th>
				<th class="border border-slate-500">Leetcode</th>
				<th class="border border-slate-500">Codechef</th>
				<th class="border border-slate-500">Codeforces</th>
				<tr
					v-for="student in students.filter(
						(e) =>
							e.dept === filterCriteria ||
							filterCriteria === 'ALL'
					)"
					:key="student.id"
				>
					<td class="border border-slate-500">
						<RouterLink
							:to="`/${currentBatch}/${student.id}`"
							class="underline"
						>
							{{ student.name }}
						</RouterLink>
					</td>
					<td class="border border-slate-500">{{ student.dept }}</td>
					<td class="border border-slate-500">{{ student.batch }}</td>
					<td class="border border-slate-500">
						{{ student.leetcode_username }}
					</td>
					<td class="border border-slate-500">
						{{ student.codechef_username }}
					</td>
					<td class="border border-slate-500">
						{{ student.codeforces_username }}
					</td>
				</tr>
			</table>
		</div>
	</div>
</template>
