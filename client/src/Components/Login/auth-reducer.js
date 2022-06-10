import { message } from "antd"
import { authAPI } from "./auth-api"

const defaultState = {
	currentUser: {},
	isAuth: false
}

export const authReducer = (state = defaultState, action) => {
	switch (action.type) {
		case "SET_USER": {
			return {
				...state,
				currentUser: action.currentUser,
				isAuth: true
			}
		}
		case "LOG_OUT": {
			return {
				...state,
				currentUser: {},
				isAuth: false
			}
		}
		default:
			return state
	}
}

const setUser = (currentUser) => ({ type: "SET_USER", currentUser })
export const logOutAC = () => ({ type: "LOG_OUT" })

export const login = (email, password) => async (dispatch) => {
	try {
		const res = await authAPI.login(email, password)
		if (res.status === 200) {
			dispatch(setUser(res.data.user))
			message.success(`Hello, ${res.data.user.email}, you autorithed`)
		}
	} catch (e) {
		return message.error(e.message)
	}
}

export const registration = (email, password, navigate) => async (dispatch) => {
	try {
		const res = await authAPI.registration(email, password)
		if (res.status === 200) {
			message.success(res.data.message, 5)
			message.warning(res.data.warning, 10)
			navigate("/login")
		}
	} catch (e) {
		return message.error(e.message)
	}
}

export const auth = () => async (dispatch) => {
	try {
		const res = await authAPI.auth()
		if (res.status === 200) {
			dispatch(setUser(res.data.user))
			message.success(`Hello, ${res.data.user.email}`)
		}
	} catch (e) {
		return message.error(e.message)
	}
}
export const logOut = () => async (dispatch) => {
	try {
		const res = await authAPI.logOut()
		if (res.status === 204) {
			dispatch(logOutAC())
		}
	} catch (e) {
		 return message.error(e.message)
	}
}
