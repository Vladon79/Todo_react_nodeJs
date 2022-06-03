import React from "react"
import { Button } from "antd"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getTasks } from "../../bll/task-reducer"
import { setFilterAC, setNameSortAC, findByNameAC, setGridOptionsAC, setGridPageAC } from "../../bll/grid-reducer"
import s from "./Todolist.module.css"

import ModalAddTask from "../common/ModalAddTask/ModalAddTask"
import { SyncOutlined } from "@ant-design/icons"
import Grid from "./Grid/Grid"

const Todolist = () => {
	const dispatch = useDispatch()
	const tasks = useSelector((state) => state.task)
	const page = useSelector((state) => state.grid.page)
	const pageCount = useSelector((state) => state.grid.pageCount)
	const filter = useSelector((state) => state.grid.filter)
	const sort = useSelector((state) => state.grid.sort)
	const findByName = useSelector((state) => state.grid.findByName)

	const showModal = () => {
		setIsModalVisible(true)
	}

	const rerenderPage = () => {
		dispatch(setFilterAC("All"))
		dispatch(setNameSortAC(""))
		dispatch(findByNameAC({ name: "", method: "Equals" }))
		dispatch(setGridPageAC(1))
	}

	useEffect(() => {
		dispatch(getTasks(pageCount, page, filter, sort, findByName))
	}, [page, pageCount, filter, sort, findByName])

	const [isModalVisible, setIsModalVisible] = useState(false)

	return (
		<div className={s.todolistContainer}>
			<ModalAddTask isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />
			<section className={s.buttonContainer}>
				<Button type="link" onClick={rerenderPage} style={{ fontSize: 20, marginBottom: 10 }}>
					<SyncOutlined />
				</Button>
			</section>
			<section className={s.h2ButtonContainer}>
				<h2>Todolist</h2>
			</section>
			<section className={s.inputButtonSection}>
				{/* <Input value={inputValue} onChange={onChangeInputValue} /> */}
				<Button type="primary" style={{ marginLeft: 8 }} onClick={showModal}>
					Add new task
				</Button>
			</section>
			{/* <input type="file" onChange={(e) => addFileHandler(e)} /> */}

			<Grid tasks={tasks} />
		</div>
	)
}

export default Todolist
