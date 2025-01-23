import { createWebHistory, createRouter } from "vue-router";

import Home from "@/pages/Home/Home.vue";
import QuizPreview from "@/pages/QuizPreview/QuizPreview.vue";

const routes = [
    { path: '/', component: Home },
    { path: '/quiz/:id', component: QuizPreview }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;