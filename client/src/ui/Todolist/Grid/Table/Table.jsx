import { DeleteFilled } from "@ant-design/icons"
import { Button, Checkbox, Input, Modal } from "antd"
import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { downlandFile } from "../../../../api/api"
import { deleteTask, updateTask } from "../../../../bll/task-reducer"
import s from "./Table.module.css"

const Table = (task) => {
	const [onChangeTaskName, setOnChangeTaskName] = useState(false)
	const [newName, setNewName] = useState(task.name)
	const dispatch = useDispatch()
	const [isModalVisible, setModalIsOpen] = useState(false)
	const onChangeCheck = () => {
		const newTask = { ...task, isChecked: !task.isChecked }
		dispatch(updateTask(newTask))
	}
	const updateTaskName = () => {
		const newTask = { ...task, name: newName }
		setOnChangeTaskName(false)
		dispatch(updateTask(newTask))
	}
	const deleteHandler = () => {
		setModalIsOpen(true)
	}
	const handleOk = () => {
		dispatch(deleteTask(task._id))
		setModalIsOpen(false)
	}
	const handleCancel = () => {
		setModalIsOpen(false)
	}
	const downlandHandler = () => {
		downlandFile({
			_id: task._id
		})
	}

	return (
		<div className={s.grid}>
			<Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}></Modal>
			<div className={s.name}>
				{!onChangeTaskName ? (
					<p onDoubleClick={() => setOnChangeTaskName(true)}>{task.name}</p>
				) : (
					<section>
						<Input value={newName} autoFocus onChange={(e) => setNewName(e.currentTarget.value)} onBlur={updateTaskName} />
					</section>
				)}
			</div>
			<div className={s.data}>{task.data}</div>
			<div className={s.check}>
				<Checkbox checked={task.isChecked} onChange={onChangeCheck} style={{ marginRight: 5 }} />
			</div>
			<div className={s.download}>
				{task.type !== "task" && (
					<Button type="primary" onClick={downlandHandler} style={{ padding: 5 }}>
						Download
					</Button>
				)}
			</div>
			<div className={s.delete}>
				<Button type="link" danger onClick={deleteHandler} style={{ padding: 2 }}>
					<DeleteFilled />
				</Button>
			</div>
		</div>
	)
}

export default Table
