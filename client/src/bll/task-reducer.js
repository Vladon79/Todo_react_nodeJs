import { tasksAPI } from "../api/api"
import { getGridOptionAC } from "./grid-reducer"

export const taskReducer = (state = [], action) => {
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
	const res = await tasksAPI.getTasks(pageCount, page, filter, sortName, findByName.name, findByName.method)
	dispatch(getTasksAC(res.data.tasks))
	dispatch(getGridOptionAC(res.data.tasksCount, res.data.pageCount, res.data.page))
}

export const addTask = (name, data) => async (dispatch, getState) => {
	const res = await tasksAPI.addTask(name, data)
	dispatch(addTaskAC(res.data))
	
	const state = getState()
	const gridState = state.grid
	await dispatch(getTasks(gridState.pageCount, gridState.page, gridState.filter, gridState.sort, gridState.findByName))
}
export const deleteTask = (_id) => async (dispatch, getState) => {
	await tasksAPI.deleteTask(_id)
	dispatch(deleteTaskAC(_id))

	const state = getState()
	const gridState = state.grid
	await dispatch(getTasks(gridState.pageCount, gridState.page, gridState.filter, gridState.sort, gridState.findByName))
}
export const checkTask = (_id) => async (dispatch, getTasks) => {
	const task = getTasks().task.find((t) => _id === t._id && t)
	const res = await tasksAPI.updateTask(task)
	dispatch(checkTaskAC(res.data))
}

export const updateTask = (task) => async (dispatch) => {
	const res = await tasksAPI.updateTask(task)
	dispatch(updateTaskAC(res.data))
}

export const uploadeFile = (file) => async (dispatch) => {
	console.log(file)
	const formData = new FormData()
	formData.append("file", file)
	console.log(formData)
	await tasksAPI.uploadeFile(formData)
}

export const addFile = (file) => async (dispatch) => {
	console.log(file)
	function getBase64(file) {
		var reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onload = function () {
			console.log(reader.result)
		}
		reader.onerror = function (error) {
			console.log("Error: ", error)
		}
	}
	const formData = new FormData()
	// formData.append('file',file)
	// console.log(formData)
	// const res= await tasksAPI.addFile(formData)
	// dispatch(addTaskAC(res.data))
}

// export const addFile  = (file) => async (dispatch) => {
// 	const reader = new FileReader()
// 	reader.readAsDataURL(file)
// 	reader.onload = function () {
// 		// const res= await tasksAPI.addFile(reader.result)
// 	  console.log(reader.result)
// 	}
// 	reader.onerror = function (error) {
// 	  console.log('Error: ', error)
// 	}

// }
// const getBase64 = (file) => {
// 	const reader = new FileReader()
// 	reader.readAsDataURL(file)
// 	reader.onload = function () {
// 	  console.log(reader.result)
// 	}
// 	reader.onerror = function (error) {
// 	  console.log('Error: ', error)
// 	}
//   }
