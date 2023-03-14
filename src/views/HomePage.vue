<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAppStore } from "../stores/appStore";
import DashBoard from "./DashboardPage.vue";

const { currentBatch } = storeToRefs(useAppStore());

const batches = ["ALL", "2023", "2024", "2025"];
</script>

<template>
	<div class="w-screen flex flex-row items-start">
		<!-- sidebar to select year batch -->
		<div
			class="fixed h-screen w-[20vw] lg:w-[10vw] p-2 bg-[var(--light-sidebar)] dark:bg-[var(--dark-sidebar)] text-black flex flex-col items-center justify-center"
		>
			<button
				class="btn-primary bg-slate-500 hover:bg-slate-800"
				@click="$router.replace('/contests')"
			>
				Go to contests page
			</button>
			<!-- spacer -->
			<div class="flex-1"></div>
			<button
				class="btn-primary"
				:class="
					currentBatch === batch
						? '!bg-[var(--primary-hover)] border'
						: ''
				"
				@click="currentBatch = batch"
				v-for="batch in batches"
			>
				{{ batch }}
			</button>
			<div class="flex-1"></div>
		</div>
		<!-- main content -->
		<!-- class="overflow-y-scroll" -->
		<div
			class="overflow-y-scroll ml-[20vw] lg:ml-[10vw] w-[80vw] lg:w-[90vw]"
		>
			<RouterView />
		</div>
	</div>
</template>
