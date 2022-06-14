import React from "react"
import { useState } from "react"
import UserPool from "./UserPool"

const SignUp = () => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const onSubmit = (event) => {
		event.preventDefault()
		UserPool.signUp(email, password, [], null, (err, data) => {
			if (err) {
				console.error(err)
			}
			console.log(data)
		})
	}
	return (
		<div>
			<form onSubmit={onSubmit}>
				<label htmlFor="email">Email</label>
				<input value={email} onChange={(e) => setEmail(e.currentTarget.value)} />
				<label htmlFor="password">Password</label>
				<input value={password} onChange={(e) => setPassword(e.currentTarget.value)} />
				<button type="submit">SignUp</button>
			</form>
		</div>
	)
}

export default SignUp
