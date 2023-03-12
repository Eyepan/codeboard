import { defineStore } from "pinia";
import { ref } from "vue";

export const useAppStore = defineStore("app", () => {
	const currentBatch = ref("");
	const error = ref("");
	return { currentBatch, error };
});
