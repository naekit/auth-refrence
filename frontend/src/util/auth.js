import { redirect } from "react-router-dom"

export function getToken() {
	const token = localStorage.getItem("token")
	return token
}

export function tokenLoader() {
	return getToken()
}

export function checkAuthLoader() {
	const token = getToken()
	if (!token) {
		return redirect("/auth")
	}
	return null
}
