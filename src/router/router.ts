import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: "/",
			name: "Home",
			component: () => import("../views/Home.vue"),
			children: [
				{
					path: "",
					redirect: "/ALL",
				},
				{
					path: "/:batch",
					name: "Batch",
					component: () => import("../views/Batch.vue"),
				},
				{
					path: "/:batch/:id",
					name: "Student",
					component: () => import("../views/Student.vue"),
				},
			],
		},
	],
});

export default router;
