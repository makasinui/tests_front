import { createWebHistory, createRouter } from "vue-router";

import Home from "@/pages/Home/Home.vue";
import QuizPreview from "@/pages/QuizPreview/QuizPreview.vue";
import Quiz from "@/pages/Quiz/Quiz.vue";

const routes = [
    { path: '/', component: Home },
    { path: '/quiz/:id', component: QuizPreview },
    { path: '/quiz/:id/start', component: Quiz }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;