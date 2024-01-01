export default defineAppConfig({
	unauthenticatedRoutes: {
		index: '/',
		login: '/login',
		register: '/register',
		story: '/story',
	},
	authenticatedRoutes: {
		appHome: '/daily',
	},
})
