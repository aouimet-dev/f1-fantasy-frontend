export type AuthUser = {
	id: string
	email: string | null
	name: string | null
	picture: string | null
	authenticated: boolean
}

const backendBaseUrl = (import.meta.env.VITE_BACKEND_BASE_URL as string | undefined)?.replace(/\/$/, '')

const withBackendBase = (path: string) => {
	if (!backendBaseUrl) {
		return path
	}

	return `${backendBaseUrl}${path}`
}

export const getCurrentUser = async (): Promise<AuthUser | null> => {
	const response = await fetch(withBackendBase('/api/auth/me'), {
		method: 'GET',
		credentials: 'include'
	})

	if (response.status === 401) {
		return null
	}

	if (!response.ok) {
		throw new Error(`Auth check failed (${response.status})`)
	}

	return response.json() as Promise<AuthUser>
}

export const startGoogleLogin = () => {
	window.location.assign(withBackendBase('/oauth2/authorization/google'))
}

export const logout = async () => {
	const response = await fetch(withBackendBase('/api/auth/logout'), {
		method: 'POST',
		credentials: 'include'
	})

	if (!response.ok && response.status !== 204) {
		throw new Error(`Logout failed (${response.status})`)
	}
}

