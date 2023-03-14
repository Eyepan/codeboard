<script setup lang="ts">
import { ref } from "vue";
import Contests from "../components/Contests.vue";
import { storeToRefs } from "pinia";
import { useAppStore } from "../stores/appStore";
const { currentPlatform } = storeToRefs(useAppStore());

const platforms = ["leetcode", "codechef"];
</script>

<template>
	<div class="w-screen flex flex-row items-start">
		<!-- sidebar to select year platform -->
		<div
			class="fixed h-screen w-[20vw] lg:w-[10vw] p-2 bg-[var(--light-sidebar)] dark:bg-[var(--dark-sidebar)] text-black flex flex-col items-center justify-center"
		>
			<button
				class="btn-primary bg-zinc-500 hover:bg-zinc-800"
				@click="$router.replace('/')"
			>
				Go back to dashboard
			</button>
			<!-- spacer -->
			<div class="flex-1"></div>
			<RouterLink
				class="btn-primary"
				:class="
					currentPlatform === platform
						? '!bg-[var(--primary-hover)] border'
						: ''
				"
				v-for="platform in platforms"
				:to="`/contests/${platform}`"
				@click="currentPlatform = platform"
			>
				{{ platform }}
			</RouterLink>
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
