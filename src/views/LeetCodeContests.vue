<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAppStore } from "../stores/appStore";
import Spinner from "../components/Spinner.vue";
import ErrorLog from "../components/ErrorLog.vue";
import { ref, watch, reactive } from "vue";
import { get_leetcode_contest_details } from "../utils/utils";
import { vAutoAnimate } from "@formkit/auto-animate";
import { ContestResult, FullContestResult } from "../models/lccontests.model";

let contestDetails = reactive([] as ContestResult[]);
let searchWiseFilteredContestDetails = reactive<ContestResult[]>([]);

const { currentPlatform, error } = storeToRefs(useAppStore());

const loading = ref(false);
const contestName = ref("weekly-contest-");
const contestNumber = ref("");
const isFiltered = ref("true");

const searchFilter = ref("");
async function searchContest() {
	loading.value = true;
	error.value = "";
	let req = "";
	req += contestName.value;
	req += contestNumber.value;
	if (isFiltered.value == "false") {
		req += "/full";
	}
	console.log("Current platform", currentPlatform.value);
	contestDetails = await get_leetcode_contest_details(req);
	searchWiseFilteredContestDetails = contestDetails;
	loading.value = false;
}
watch(searchFilter, () => {
	const filterValue = searchFilter.value.trim().toLowerCase();

	if (!filterValue) {
		searchWiseFilteredContestDetails = contestDetails;
		return;
	}

	const regex = new RegExp(filterValue, "i");

	searchWiseFilteredContestDetails =
		isFiltered.value === "true"
			? contestDetails.filter(
					(contestDetail) =>
						regex.test(contestDetail.username) ||
						regex.test(contestDetail.name) ||
						regex.test(contestDetail.dept) ||
						regex.test(contestDetail.batch)
			  )
			: contestDetails.filter((contestDetail) =>
					regex.test(contestDetail.username)
			  );
});

function downloadCSV() {
	let csvContent = "data:text/csv;charset=utf-8,";
	csvContent += Object.keys(contestDetails[0]).join(",") + "\n";
	csvContent += contestDetails
		.map((row) => Object.values(row).join(","))
		.join("\n");
	const encodedUri = encodeURI(csvContent);
	const link = document.createElement("a");
	link.setAttribute("href", encodedUri);
	link.setAttribute(
		"download",
		`${contestName.value + contestNumber.value}.csv`
	);
	document.body.appendChild(link); // Required for FF
	link.click();
}
</script>

<template>
	<div class="p-4 w-full overflow-y-scroll">
		<ErrorLog v-auto-animate v-if="error !== ''" :message="error" />
		<div v-else class="">
			<Spinner v-if="loading" />
			<div class="flex flex-row justify-between gap-10">
				<h1 class="text-7xl">Leetcode Contests</h1>
				<input
					type="text"
					v-model="searchFilter"
					class="bg-black border min-w-0 p-2"
					placeholder="Filter participants.."
				/>
			</div>
			<form class="flex flex-col gap-2" @submit.prevent="searchContest()">
				<div class="flex flex-row gap-2 mt-5">
					<select
						name="contestname"
						id="contestname"
						v-model="contestName"
						class="bg-zinc-500 p-4"
					>
						<option value="weekly-contest-">Weekly Contest</option>
						<option value="biweekly-contest-">
							Biweekly Contest
						</option>
					</select>
					<input
						type="text"
						v-model="contestNumber"
						class="bg-black border w-full p-2"
						placeholder="Contest number. eg. 100"
						required
					/>
					<select
						name=""
						id=""
						class="bg-zinc-500 p-4"
						v-model="isFiltered"
					>
						<option value="true">Get College Students</option>

						<option value="false">Get All Participants</option>
					</select>
				</div>
				<button class="btn-primary w-full" type="submit">
					Search {{ currentPlatform }} contest
				</button>
			</form>
			<div class="my-2" v-if="contestDetails.length > 0">
				Total Participants:
				{{ contestDetails.length }}
			</div>
			<table class="w-full" v-if="contestDetails.length > 0">
				<th class="border border-zinc-500">Username</th>
				<th class="border border-zinc-500">Rank</th>
				<th class="border border-zinc-500">Score</th>
				<th class="border border-zinc-500" v-if="isFiltered == 'true'">
					Name
				</th>
				<th class="border border-zinc-500" v-if="isFiltered == 'true'">
					Dept
				</th>
				<th class="border border-zinc-500" v-if="isFiltered == 'true'">
					Batch
				</th>
				<tr
					v-for="contestDetail in searchWiseFilteredContestDetails"
					:key="contestDetail.rank"
				>
					<td class="border border-zinc-500">
						{{ contestDetail.username }}
					</td>
					<td class="border border-zinc-500">
						{{ contestDetail.rank }}
					</td>
					<td class="border border-zinc-500">
						{{ contestDetail.score }}
					</td>
					<td
						class="border border-zinc-500"
						v-if="isFiltered === 'true'"
					>
						{{ contestDetail.name }}
					</td>
					<td
						class="border border-zinc-500"
						v-if="isFiltered === 'true'"
					>
						{{ contestDetail.dept }}
					</td>
					<td
						class="border border-zinc-500"
						v-if="isFiltered === 'true'"
					>
						{{ contestDetail.batch }}
					</td>
				</tr>
			</table>
			<div
				class="flex text-3xl w-full h-[70vh] items-center justify-center"
				v-else
				v-if="!loading"
			>
				No participants
			</div>
			<button
				class="w-min py-1 h-14 fixed bottom-10 right-10 z-50 btn-primary"
				@click="downloadCSV()"
			>
				Download CSV
			</button>
		</div>
	</div>
</template>
