import React from "react"
import { tasksAPI } from "./api/api"
import "./App.css"
import Todolist from "./ui/Todolist/Todolist"
import { saveAs } from "file-saver"

const App = () => {
	return (
		<div className="App">
			<Todolist />
		</div>
	)
}

export default App
