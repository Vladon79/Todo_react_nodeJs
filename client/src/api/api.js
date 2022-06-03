import axios from "axios"

export const instance = axios.create({
	baseURL: "http://localhost:5000/api/",
	withCredentials: true
})

export const tasksAPI = {
	getTasks(pageCount, page, filter, sort, findByName, findMethod) {
		return instance.get(`task`, {
			params: {
				page,
				pageCount,
				filter,
				sort,
				findByName,
				findMethod
			}
		})
	},
	addTask(name, data) {
		return instance.post("task", { name, data, isChecked: false, type: "task" })
	},
	addFile(file) {
		return instance.post("task/file", file)
	},
	updateTask(task) {
		return instance.put("task", task)
	},
	deleteTask(_id) {
		return instance.delete(`task/${_id}`)
	},
	uploadeFile(file) {
		return instance.post(`file`, file)
	}
}

export const downlandFile = async (file) => {
	const res = await fetch(`http://localhost:5000/api/task/file/download?id=${file._id}`)
	if (res.status === 200) {
		const blob = await res.blob()
		const downlandUrl = window.URL.createObjectURL(blob)
		const link = document.createElement("a")
		link.href = downlandUrl
		link.download = file.name
		document.body.appendChild(link)
		link.click()
		link.remove()
	} else {
		
	}
}
