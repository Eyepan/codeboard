<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAppStore } from "../stores/appStore";
import Spinner from "./Spinner.vue";
import ErrorLog from "./ErrorLog.vue";
import { ref, watch, reactive } from "vue";
import { get_leetcode_contest_details } from "../utils/utils";
import {
	ContestResult,
	defaultContestResult,
} from "../models/lccontests.model";

const { currentPlatform, error } = storeToRefs(useAppStore());
const loading = ref(false);
const contestName = ref("");
let contestDetails = reactive([] as ContestResult[]);
let searchWiseFilteredContestDetails = reactive<ContestResult[]>([
	defaultContestResult,
]);

const searchFilter = ref("");
async function searchContest() {
	loading.value = true;
	error.value = "";
	contestDetails = await get_leetcode_contest_details(contestName.value);
	searchWiseFilteredContestDetails = contestDetails;
	loading.value = false;
}

watch(searchFilter, () => {
	if (searchFilter.value === "") {
		searchWiseFilteredContestDetails = contestDetails;
	} else {
		searchWiseFilteredContestDetails = contestDetails.filter(
			(contestDetail) =>
				contestDetail.username
					.toLowerCase()
					.includes(searchFilter.value.toLowerCase()) ||
				contestDetail.name
					.toLowerCase()
					.includes(searchFilter.value.toLowerCase()) ||
				contestDetail.dept
					.toLowerCase()
					.includes(searchFilter.value.toLowerCase()) ||
				contestDetail.batch
					.toLowerCase()
					.includes(searchFilter.value.toLowerCase())
		);
	}
});
</script>

<template>
	<div class="p-4 w-full overflow-y-scroll">
		<ErrorLog v-if="error !== ''" :message="error" />
		<Spinner v-if="loading" />
		<div class="flex flex-row justify-between gap-10">
			<h1 class="text-7xl">Contests</h1>
			<input
				type="text"
				v-model="searchFilter"
				class="bg-black border min-w-0 p-2"
				placeholder="Filter participants.."
			/>
		</div>

		<form @submit.prevent="searchContest()">
			<input
				type="text"
				v-model="contestName"
				class="bg-black border w-full my-5 p-2"
				:placeholder="`Search ${currentPlatform} contest`"
			/>
			<button class="btn-primary w-full" type="submit">
				Search {{ currentPlatform }} contest
			</button>
		</form>
		<div class="my-2" v-if="contestDetails.length > 0">
			Total Participants:
			{{ contestDetails.length }}
		</div>
		<table class="w-full" v-if="contestDetails.length > 0">
			<!-- export interface ContestResult {
            	username: string;
            	rank: number;
            	score: number;
            	name: string;
            	dept: string;
            	batch: string;
            	codechef_username: string;
            	codeforces_username: string;
            }
             -->
			<th class="border border-slate-500">Username</th>
			<th class="border border-slate-500">Rank</th>
			<th class="border border-slate-500">Score</th>
			<th class="border border-slate-500">Name</th>
			<th class="border border-slate-500">Dept</th>
			<th class="border border-slate-500">Batch</th>
			<tr
				v-for="contestDetail in searchWiseFilteredContestDetails"
				:key="contestDetail.rank"
			>
				<td class="border border-slate-500">
					{{ contestDetail.username }}
				</td>
				<td class="border border-slate-500">
					{{ contestDetail.rank }}
				</td>
				<td class="border border-slate-500">
					{{ contestDetail.score }}
				</td>
				<td class="border border-slate-500">
					{{ contestDetail.name }}
				</td>
				<td class="border border-slate-500">
					{{ contestDetail.dept }}
				</td>
				<td class="border border-slate-500">
					{{ contestDetail.batch }}
				</td>
			</tr>
		</table>
	</div>
</template>
