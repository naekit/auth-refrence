import { json, redirect } from "react-router-dom"
import AuthForm from "../components/AuthForm"

function AuthenticationPage() {
	return <AuthForm />
}

export default AuthenticationPage

export async function authAction({ request }) {
	const searchParams = new URL(request.url).searchParams
	const mode = searchParams.get("mode") || "signup"

	if (mode !== "login" && mode !== "signup") {
		throw json({ message: "Invalid mode" }, { status: 422 })
	}

	const data = await request.formData()
	const authData = {
		email: data.get("email"),
		password: data.get("password"),
	}

	const res = await fetch("http://localhost:8080/" + mode, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(authData),
	})

	if (res.status === 422 || res.status === 401) {
		return res
	}

	if (!res.ok) {
		throw json({ message: "Could not authenticate" }, { status: 500 })
	}

	const resData = await res.json()
	const token = resData.token

	// Store token in localStorage
	localStorage.setItem("token", token)

	// return token
	return redirect("/")
}
