<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAppStore } from "../stores/appStore";
import Batch from "../components/Dashboard.vue";

const { currentBatch } = storeToRefs(useAppStore());

const batches = ["ALL", "2023", "2024", "2025"];
</script>

<template>
	<div class="w-screen flex flex-row items-start">
		<!-- sidebar to select year batch -->
		<div
			class="absolute overflow-none left-0 top-0 bottom-0 min-w-[20vw] lg:min-w-[10vw] p-2 bg-[var(--light-sidebar)] dark:bg-[var(--dark-sidebar)] text-black flex flex-col items-center justify-center"
		>
			<button
				class="btn-primary"
				:class="
					currentBatch === batch ? '!bg-[var(--primary-hover)]' : ''
				"
				@click="currentBatch = batch"
				v-for="batch in batches"
			>
				{{ batch }}
			</button>
		</div>
		<!-- main content -->
		<!-- class="overflow-y-scroll" -->
		<div class="absolute left-[20vw] w-[80vw] lg:left-[10vw] lg:w-[90vw]">
			<Batch />
		</div>
	</div>
</template>
