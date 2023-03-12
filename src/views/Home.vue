<script setup lang="ts"></script>

<template>
	<div class="w-screen h-screen flex flex-row items-start">
		<!-- sidebar to select year batch -->
		<div
			class="w-1/5 h-screen rounded-r-xl p-2 dark:bg-[var(--light-background)] bg-[var(--dark-background)] text-black flex flex-col items-center justify-center"
		>
			<RouterLink to="/all" class="btn-primary w-full">
				All Batches
			</RouterLink>
			<RouterLink to="/2023" class="btn-primary w-full">
				2023
			</RouterLink>
			<RouterLink to="/2024" class="btn-primary w-full">
				2024
			</RouterLink>
			<RouterLink to="/2025" class="btn-primary w-full">
				2025
			</RouterLink>
		</div>
		<!-- main content -->
		<RouterView :key="$route.fullPath" />
	</div>
</template>
