import { createWebHistory, createRouter } from 'vue-router';
import DashboardComponent from '@/components/DashboardComponent.vue';
import SearchComponent from '@/components/SearchComponent.vue';

const routes = [
	{
		path: '/',
		name: 'Dashboard',
		component: DashboardComponent
	},
	{
		path: '/search',
		name: 'Search',
		component: SearchComponent
	}
]

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;