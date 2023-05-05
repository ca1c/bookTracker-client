import { createWebHistory, createRouter } from 'vue-router';
import DashboardComponent from '@/components/DashboardComponent.vue';
import SearchComponent from '@/components/SearchComponent.vue';
import LoginComponent from '@/components/LoginComponent.vue';
import RegisterComponent from '@/components/RegisterComponent.vue';
import LogoutComponent from '@/components/LogoutComponent.vue';
import MainpageComponent from '@/components/MainpageComponent.vue';

const routes = [
	{
		path: '/',
		name: 'Mainpage',
		component: MainpageComponent
	},
	{
		path: '/dashboard',
		name: 'Dashboard',
		component: DashboardComponent
	},
	{
		path: '/search',
		name: 'Search',
		component: SearchComponent
	},
	{
		path: '/login',
		name: 'Login',
		component: LoginComponent
	},
	{
		path: '/register',
		name: 'Register',
		component: RegisterComponent
	},
	{
		path: '/logout',
		name: 'Logout',
		component: LogoutComponent 
	}
]

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;