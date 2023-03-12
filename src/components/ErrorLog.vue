<script setup lang="ts">
const { message } = defineProps<{ message: string }>();
</script>

<template>
	<div
		class="z-50 absolute w-screen h-screen top-0 left-0 right-0 bottom-0 bg-red-500 flex flex-col items-center justify-center gap-5"
	>
		<h1 class="text-5xl">Error</h1>
		<h1 class="text-3xl">{{ message }}</h1>
		<button class="btn-primary" @click="$router.replace('/')">
			Go back to safety
		</button>
	</div>
</template>
