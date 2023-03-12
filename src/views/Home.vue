<script setup lang="ts"></script>

<template>
	<div class="w-screen flex flex-row items-start">
		<!-- sidebar to select year batch -->
		<div
			class="absolute overflow-none left-0 top-0 bottom-0 min-w-[20vw] lg:min-w-[10vw] p-2 bg-[var(--light-sidebar)] dark:bg-[var(--dark-sidebar)] text-black flex flex-col items-center justify-center"
		>
			<RouterLink to="/ALL" class="btn-primary w-full text-center">
				<h1>All Batches</h1>
			</RouterLink>
			<RouterLink to="/2023" class="btn-primary w-full text-center">
				<h1>2023</h1>
			</RouterLink>
			<RouterLink to="/2024" class="btn-primary w-full text-center">
				<h1>2024</h1>
			</RouterLink>
			<RouterLink to="/2025" class="btn-primary w-full text-center">
				<h1>2025</h1>
			</RouterLink>
		</div>
		<!-- main content -->
		<!-- class="overflow-y-scroll" -->
		<div class="absolute left-[20vw] w-[80vw] lg:left-[10vw] lg:w-[90vw]">
			<RouterView :key="$route.fullPath" />
		</div>
	</div>
</template>
