import { message } from "antd"
import { tasksAPI } from "../../api/api"
import { getGridOptionAC } from "./Grid/grid-reducer"

export const todolistReducer = (state = [], action) => {
	switch (action.type) {
		case "GET_TASKS": {
			return action.tasks
		}
		case "DELETE_TASK": {
			return state.filter((t) => t._id !== action._id && t)
		}
		case "ADD_TASK": {
			return [action.task, ...state]
		}
		case "CHECK_TASK": {
			return state.map((t) => (t._id === action.task._id ? action.task : t))
		}
		case "UPDATE_TASK": {
			return state.map((t) => (t._id === action.task._id ? action.task : t))
		}
		default:
			return state
	}
}
export const getTasksAC = (tasks) => {
	return {
		type: "GET_TASKS",
		tasks
	}
}

export const deleteTaskAC = (_id) => {
	return {
		type: "DELETE_TASK",
		_id
	}
}

export const addTaskAC = (task) => {
	return {
		type: "ADD_TASK",
		task
	}
}

export const checkTaskAC = (task) => {
	return {
		type: "CHECK_TASK",
		task
	}
}
export const updateTaskAC = (task) => {
	return {
		type: "UPDATE_TASK",
		task
	}
}

export const getTasks = (pageCount, page, filter, sortName, findByName) => async (dispatch) => {
	try {
		const res = await tasksAPI.getTasks(pageCount, page, filter, sortName, findByName.name, findByName.method)
		if (res.status === 200) {
			dispatch(getTasksAC(res.data.tasks))
			dispatch(getGridOptionAC(res.data.tasksCount, res.data.page))
		} else {
			message.error("Error")
		}
	} catch (e) {
		return message.error(e.message)
	}
}

export const addTask = (name, data, userEmail, userId) => async (dispatch, getState) => {
	try {
		const res = await tasksAPI.addTask(name, data, userEmail, userId)
		if (res.status === 200) {
			message.success(`Task ${res.data.name} has been added`)
			dispatch(addTaskAC(res.data))
			const state = getState()
			const gridState = state.grid
			await dispatch(getTasks(gridState.pageCount, gridState.page, gridState.filter, gridState.sort, gridState.findByName))
		} else {
			message.error("Error")
		}
	} catch (e) {
		return message.error(e.message)
	}
}
export const deleteTask = (_id) => async (dispatch, getState) => {
	try {
		const res = await await tasksAPI.deleteTask(_id)
		if (res.status === 200) {
			message.success(`Task ${res.data.name} has been removed`)
			dispatch(deleteTaskAC(_id))
			const state = getState()
			const gridState = state.grid
			await dispatch(getTasks(gridState.pageCount, gridState.page, gridState.filter, gridState.sort, gridState.findByName))
		} else {
			message.error("Error")
		}
	} catch (e) {
		return message.error(e.message)
	}
}

export const updateTask = (task) => async (dispatch) => {
	try {
		const res = await tasksAPI.updateTask(task)
		if (res.status === 200) {
			dispatch(updateTaskAC(res.data))
		} else {
			message.error("Error")
		}
	} catch (e) {
		return message.error(e.message)
	}
}
