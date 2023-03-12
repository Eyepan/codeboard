<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAppStore } from "../stores/appStore";
import Spinner from "./Spinner.vue";
import ErrorLog from "./ErrorLog.vue";
import { ref } from "vue";
const { currentPlatform, error } = storeToRefs(useAppStore());
const loading = ref(false);
const contestName = ref("");

async function searchContest() {
	loading.value = true;
	console.log("hi mom");
	// TODO: Search contest
	loading.value = false;
}
</script>

<template>
	<div class="p-4 w-full overflow-y-scroll">
		<ErrorLog v-if="error !== ''" :message="error" />
		<Spinner v-if="loading" />
		<div>
			<div class="flex flex-row justify-between">
				<h1 class="text-7xl w-min">Contests</h1>
				<input
					type="text"
					v-model="contestName"
					class="bg-black border min-w-0 p-2"
					:placeholder="`Search ${currentPlatform} contest`"
				/>
			</div>
			<button class="btn-primary w-full my-10" @click="searchContest()">
				Search {{ currentPlatform }} contest
			</button>
		</div>
	</div>
</template>
