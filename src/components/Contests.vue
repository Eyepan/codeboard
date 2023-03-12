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
const contestDetails = ref<ContestResult[]>([defaultContestResult]);
let searchWiseFilteredContestDetails = reactive<ContestResult[]>([
	defaultContestResult,
]);

const searchFilter = ref("");
async function searchContest() {
	loading.value = true;
	error.value = "";
	contestDetails.value = await get_leetcode_contest_details(
		contestName.value
	);
	searchWiseFilteredContestDetails = contestDetails.value;
	loading.value = false;
}

watch(searchFilter, () => {
	if (searchFilter.value === "") {
		searchWiseFilteredContestDetails = contestDetails.value;
	} else {
		searchWiseFilteredContestDetails = contestDetails.value.filter(
			(contestDetail) =>
				contestDetail.username
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
		<div class="my-2">Total Participants: {{ contestDetails.length }}</div>
		<table class="w-full" v-if="contestDetails.length > 1">
			<th class="border border-slate-500">Username</th>
			<th class="border border-slate-500">Rank</th>
			<th class="border border-slate-500">Score</th>
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
			</tr>
		</table>
	</div>
</template>
