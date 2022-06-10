import React, { useState } from "react"
import { Input, Modal } from "antd"
import DataPiker from "../DataPiker/DataPiker"
import { useDispatch, useSelector } from "react-redux"
import s from "./ModalAddTask.module.css"
import { addTask } from "../../todolist-reducer"

const ModalAddTask = ({ isModalVisible, setIsModalVisible }) => {
	const userEmail = useSelector((state) => state.auth.currentUser.email)
	const userId = useSelector((state) => state.auth.currentUser.id)
	const dispatch = useDispatch()
	const [inputValue, setInputValue] = useState("")
	const [data, setData] = useState("")
	const okDisadled = inputValue === "" || data === "" ? true : false
	const onChangeInputValue = (e) => {
		setInputValue(e.currentTarget.value)
	}
	const handleOk = () => {
		setInputValue("")
		setIsModalVisible(false)
		dispatch(addTask(inputValue, data, userEmail, userId))
	}

	const handleCancel = () => {
		setIsModalVisible(false)
	}
	return (
		<Modal className={s.modal} title="Create new task" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} okButtonProps={{ disabled: okDisadled }}>
			<section className={s.modalContainer}>
				<Input className={s.input} placeholder="Task name" value={inputValue} onChange={onChangeInputValue} />
				<DataPiker className={s.input} data={data} setData={setData} />
			</section>
		</Modal>
	)
}

export default ModalAddTask
