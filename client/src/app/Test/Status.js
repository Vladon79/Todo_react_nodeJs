import React, { useState } from "react"
import { useEffect } from "react"
import { useContext } from "react"
import { AccountContext } from "./Account"

const Status = () => {
	const [status, setStatus] = useState(false)

	const { getSession, logOut } = useContext(AccountContext)

	useEffect(() => {
		getSession().then((session) => {
			console.log("Session", session)
			setStatus(true)
		})
	}, [])
	return <div>{status ? <button onClick={logOut}>LogOut</button> : <h2>"Please login"</h2>}</div>
}

export default Status
