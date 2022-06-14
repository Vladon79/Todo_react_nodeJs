import React, { createContext } from "react"
import Pool from "./UserPool"
import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js"

const AccountContext = createContext()

const Account = (props) => {
	const getSession = async () => {
		return await new Promise((res, rej) => {
			const user = Pool.getCurrentUser()
			if (user) {
				user.getSession(async (err, session) => {
					if (err) {
						rej()
					} else {
						const attributes = await new Promise((res, rej) => {
							user.getUserAttributes((err, attributes) => {
								if (err) {
									rej(err)
								} else {
									const results = {}
									for (let attribute of attributes) {
										const { Name, Value } = attribute
										results[Name] = Value
									}
									res(results)
								}
							})
						})
						res({ user, ...session, ...attributes })
					}
				})
			} else {
				rej()
			}
		})
	}
	const authenticate = async (Username, Password) => {
		return await new Promise((resolve, reject) => {
			const user = new CognitoUser({ Username, Pool })

			const authDetails = new AuthenticationDetails({ Username, Password })

			user.authenticateUser(authDetails, {
				onSuccess: (data) => {
					console.log("onSuccess: ", data)
					resolve(data)
				},
				onFailure: (err) => {
					console.error("onFailure: ", err)
					reject(err)
				},
				newPasswordRequired: (data) => {
					console.log("newPasswordRequired: ", data)
					resolve(data)
				}
			})
		})
	}

	const logOut = () => {
		const user = Pool.getCurrentUser()
		if (user) {
			user.signOut()
		}
	}
	return <AccountContext.Provider value={{ authenticate, getSession, logOut }}>{props.children}</AccountContext.Provider>
}

export { Account, AccountContext }
