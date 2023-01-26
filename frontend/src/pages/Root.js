import {
	Outlet,
	useLoaderData,
	useNavigation,
	useSubmit,
} from "react-router-dom"
import { useEffect } from "react"

import MainNavigation from "../components/MainNavigation"

function RootLayout() {
	// const navigation = useNavigation();
	const token = useLoaderData()
	const submit = useSubmit()

	useEffect(() => {
		if (!token) {
			return
		}

		setTimeout(() => {
			submit(null, { action: "/logout", method: "POST" })
		}, 1000 * 60 * 60)
	}, [token, submit])

	return (
		<>
			<MainNavigation />
			<main>
				{/* {navigation.state === 'loading' && <p>Loading...</p>} */}
				<Outlet />
			</main>
		</>
	)
}

export default RootLayout
