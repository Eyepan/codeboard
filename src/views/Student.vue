<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import Spinner from "../components/Spinner.vue";
import { Student } from "../models/student.model";
import { get_student_by_id, get_student_leetcode_data } from "../utils/utils";
import StudentLeetcode from "../models/studentleetcode.model";
import { Bar } from "vue-chartjs";
import { Pie } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
} from "chart.js";

const route = useRoute();
const loading = ref(false);
const student = ref({} as Student);
const studentLeetCodeData = ref({} as StudentLeetcode);
onMounted(async () => {
  loading.value = true;
  if (typeof route.params.id === "string") {
    student.value = await get_student_by_id(route.params.id);
  }
  studentLeetCodeData.value = await get_student_leetcode_data(
    student.value.leetcode_username
  );
  loading.value = false;
});
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement
);
</script>

<template>
  <div v-auto-animate class="p-4 w-full">
    <Spinner v-if="loading" />
    <h1 class="text-7xl">{{ student.name }}</h1>
    <h3 class="text-3xl">Student Details:</h3>
    <div class="grid grid-cols-3">
      <p class="">Name: {{ student.name }}</p>
      <p>Dept: {{ student.dept }}</p>
      <p>Batch: {{ student.batch }}</p>
      <p>
        Leetcode:
        <a
          :href="`https://www.leetcode.com/${student.leetcode_username}`"
          target="_blank"
          class="underline"
          >{{ student.leetcode_username }}</a
        >
      </p>
      <p>Codechef: {{ student.codechef_username }}</p>
      <p>CodeForces: {{ student.codeforces_username }}</p>
    </div>
    <h3 class="text-3xl">Leetcode Details:</h3>
    <div class="grid grid-cols-3">
      <p>Total Solved: {{ studentLeetCodeData.totalSolved }}</p>
      <p>Total Questions: {{ studentLeetCodeData.totalQuestions }}</p>
      <p>Ranking: {{ studentLeetCodeData.ranking }}</p>

      <p>
        Easy Solved:
        {{
          (
            (studentLeetCodeData.easySolved / studentLeetCodeData.totalEasy) *
            100
          ).toFixed(2)
        }}%
      </p>
      <p>
        Medium Solved:
        {{
          (
            (studentLeetCodeData.mediumSolved /
              studentLeetCodeData.totalMedium) *
            100
          ).toFixed(2)
        }}%
      </p>
      <p>
        Hard Solved:
        {{
          (
            (studentLeetCodeData.hardSolved / studentLeetCodeData.totalHard) *
            100
          ).toFixed(2)
        }}%
      </p>
      <p>Acceptance Rate: {{ studentLeetCodeData.acceptanceRate }}%</p>
      <p>Contribution Points: {{ studentLeetCodeData.contributionPoints }}</p>

      <p>Reputation: {{ studentLeetCodeData.reputation }}</p>
    </div>
    <h3 class="text-3xl">Leetcode Progress:</h3>
    <div class="grid grid-cols-2 lg:grid-cols-3 w-full gap-5">
      <div class="h-full border rounded-xl flex items-center justify-center">
        <!-- {
                backgroundColor: ['#41B883', '#E46651', '#00D8FF'],
                data: [
                  (studentLeetCodeData.easySolved /
                    studentLeetCodeData.totalEasy) *
                    100,
                  (studentLeetCodeData.mediumSolved /
                    studentLeetCodeData.totalMedium) *
                    100,
                  (studentLeetCodeData.hardSolved /
                    studentLeetCodeData.totalHard) *
                    100,
                ],
              }, -->
        <Bar
          id="my-chart-id"
          :options="{
            responsive: true,
            maintainAspectRatio: false,
          }"
          :data="{
            labels: ['Easy', 'Medium', 'Hard'],
            datasets: [
              {
                label: 'Solved Percentage',
                backgroundColor: ['#41B883', '#E46651', '#00D8FF'],
                data: [
                  (studentLeetCodeData.easySolved /
                    studentLeetCodeData.totalEasy) *
                    100,
                  (studentLeetCodeData.mediumSolved /
                    studentLeetCodeData.totalMedium) *
                    100,
                  (studentLeetCodeData.hardSolved /
                    studentLeetCodeData.totalHard) *
                    100,
                ],
              },
            ],
          }"
        />
      </div>
      <!-- pie chart of completion -->
      <div class="w-full border rounded-xl">
        <Pie
          id="my-chart-id"
          :options="{
            responsive: true,
            animation: false,
          }"
          :data="{
            datasets: [
              {
                label: 'Solved',
                backgroundColor: ['#41B883', '#E46651', '#00D8FF'],
                data: [
                  (studentLeetCodeData.easySolved /
                    studentLeetCodeData.totalEasy) *
                    100,
                  (studentLeetCodeData.mediumSolved /
                    studentLeetCodeData.totalMedium) *
                    100,
                  (studentLeetCodeData.hardSolved /
                    studentLeetCodeData.totalHard) *
                    100,
                ],
              },
            ],
          }"
        />
        <!-- legend -->
        <div class="flex flex-row justify-around">
          <div class="flex flex-row items-center">
            <div
              class="w-4 h-4 rounded-full mr-2"
              style="background-color: #41b883"
            ></div>
            <p>Easy</p>
          </div>
          <div class="flex flex-row items-center">
            <div
              class="w-4 h-4 rounded-full mr-2"
              style="background-color: #e46651"
            ></div>
            <p>Medium</p>
          </div>
          <div class="flex flex-row items-center">
            <div
              class="w-4 h-4 rounded-full mr-2"
              style="background-color: #00d8ff"
            ></div>
            <p>Hard</p>
          </div>
        </div>
      </div>
      <div class="w-full border rounded-xl">
        <Pie
          class="w-full"
          id="my-chart-id"
          :options="{
            responsive: true,
            animation: false,
          }"
          :data="{
            datasets: [
              {
                label: 'Solved',
                backgroundColor: ['#41B883', '#E46651'],
                data: [
                  studentLeetCodeData.totalSolved,
                  studentLeetCodeData.totalQuestions -
                    studentLeetCodeData.totalSolved,
                ],
              },
            ],
          }"
        />
        <!-- legend -->
        <div class="flex flex-row justify-around">
          <div class="flex flex-row items-center">
            <div
              class="w-4 h-4 rounded-full mr-2"
              style="background-color: #41b883"
            ></div>
            <p>Solved</p>
          </div>
          <div class="flex flex-row items-center">
            <div
              class="w-4 h-4 rounded-full mr-2"
              style="background-color: #e46651"
            ></div>
            <p>Unsolved</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
