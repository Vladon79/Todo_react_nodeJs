import React from "react"
import { useState, useContext } from "react"
import { AccountContext } from "./Account"

const SignIn = () => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const { authenticate } = useContext(AccountContext)

	const onSubmit = (event) => {
		event.preventDefault()
		authenticate(email, password)
			.then((data) => {
				console.log("Logged in!", data)
			})
			.catch((err) => {
				console.error("Faileed to login", err)
			})
	}
	return (
		<div>
			<form onSubmit={onSubmit}>
				<label htmlFor="email">Email</label>
				<input value={email} onChange={(e) => setEmail(e.currentTarget.value)} />
				<label htmlFor="password">Password</label>
				<input value={password} onChange={(e) => setPassword(e.currentTarget.value)} />
				<button type="submit">SignIn</button>
			</form>
		</div>
	)
}

export default SignIn
