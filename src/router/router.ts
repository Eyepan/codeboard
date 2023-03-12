import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: "/",
			name: "Home",
			component: () => import("../views/Home.vue"),
		},
		{
			path: "/:id",
			name: "Student",
			component: () => import("../views/Student.vue"),
		},
	],
});

export default router;
