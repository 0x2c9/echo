export default defineNuxtRouteMiddleware((to) => {
	const authStore = useAuth()
	const appConfig = useAppConfig()
	authStore.syncLocalStorage()

	const unauthenticatedRoutes = [
		appConfig.unauthenticatedRoutes.index,
		appConfig.unauthenticatedRoutes.story,
		appConfig.unauthenticatedRoutes.login,
		appConfig.unauthenticatedRoutes.register,
	]

	if (!authStore.isAuthenticated && !unauthenticatedRoutes.includes(to.path)) {
		return navigateTo(appConfig.unauthenticatedRoutes.index)
	}

	if (authStore.isAuthenticated && unauthenticatedRoutes.includes(to.path)) {
		return navigateTo(appConfig.authenticatedRoutes.appHome)
	}
})
