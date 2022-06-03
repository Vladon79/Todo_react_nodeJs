import React, { useState } from "react"
import { Input, Modal } from "antd"
import DataPiker from "../DataPiker/DataPiker"
import { useDispatch } from "react-redux"
import { addTask } from "../../../bll/task-reducer"
import s from "./ModalAddTask.module.css"

const ModalAddTask = ({ isModalVisible, setIsModalVisible }) => {
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
		dispatch(addTask(inputValue, data))
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
