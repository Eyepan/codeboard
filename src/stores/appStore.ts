import { defineStore } from "pinia";
import { ref } from "vue";

export const useAppStore = defineStore("app", () => {
	const currentBatch = ref("ALL");
	const currentPlatform = ref("leetcode");
	const error = ref("");
	return { currentBatch, error, currentPlatform };
});
