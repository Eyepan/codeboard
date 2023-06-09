import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: "/",
			redirect: "/home",
		},
		{
			path: "/home",
			component: () => import("../views/HomePage.vue"),
			children: [
				// dashboard
				{
					path: "",
					name: "Dashboard",
					component: () => import("../views/DashboardPage.vue"),
				},
				{
					path: "/:id",
					name: "Student",
					component: () => import("../views/StudentPage.vue"),
				},

				// student
			],
		},
		{
			path: "/home",
			name: "Home",
			component: () => import("../views/HomePage.vue"),
		},
		{
			path: "/contests",
			name: "Contests",
			component: () => import("../views/ContestPage.vue"),
			children: [
				{
					path: "leetcode",
					name: "leetcode",
					component: () => import("../views/LeetCodeContests.vue"),
				},
				{
					path: "codechef",
					name: "codechef",
					component: () => import("../views/CodeChefContests.vue"),
				},
			],
		},
	],
});

export default router;
