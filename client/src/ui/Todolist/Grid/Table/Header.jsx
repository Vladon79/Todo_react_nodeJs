import { Button, Popover, Select } from "antd"
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons"
import { Option } from "antd/lib/mentions"
import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import s from "./Header.module.css"
import { setFilterAC, setNameSortAC } from "../../../../bll/grid-reducer"
import MyPopover from "./Popover/MyPopover"

const Header = () => {
	const { Option } = Select
	const handleChange = (value) => {
		if (value === "Completed") {
			dispatch(setFilterAC("Completed"))
		} else if (value === "Active") {
			dispatch(setFilterAC("Active"))
		} else {
			dispatch(setFilterAC("All"))
		}
	}

	const filter = useSelector((state) => state.grid.filter)
	const sort = useSelector((state) => state.grid.sort)
	const dispatch = useDispatch()
	const nameSortClickHandler = () => {
		if (sort !== "AscName" && sort !== "DescName") {
			dispatch(setNameSortAC("AscName"))
		} else if (sort === "AscName") {
			dispatch(setNameSortAC("DescName"))
		} else {
			dispatch(setNameSortAC("AscName"))
		}
	}
	const dataSortClickHandler = () => {
		if (sort !== "AscData" && sort !== "DescData") {
			dispatch(setNameSortAC("AscData"))
		} else if (sort === "AscData") {
			dispatch(setNameSortAC("DescData"))
		} else {
			dispatch(setNameSortAC("AscData"))
		}
	}

	return (
		<header>
			<div className={s.name}>
				<div className={s.nameTitle} onClick={nameSortClickHandler}>
					Name
					{sort === "AscName" && (
						<span className={s.arrow}>
							<ArrowUpOutlined />
						</span>
					)}
					{sort === "DescName" && (
						<span className={s.arrow}>
							<ArrowDownOutlined />
						</span>
					)}
				</div>
				<MyPopover />
			</div>
			<div className={s.data} onClick={dataSortClickHandler}>
				Data
				{sort === "AscData" && (
					<span className={s.arrow}>
						<ArrowUpOutlined />
					</span>
				)}
				{sort === "DescData" && (
					<span className={s.arrow}>
						<ArrowDownOutlined />
					</span>
				)}
			</div>
			<div className={s.check}>
				<Select
					defaultValue="All"
					style={{
						width: 100
					}}
					onChange={handleChange}
				>
					<Option value="All">All</Option>
					<Option value="Active">Active</Option>
					<Option value="Completed">Completed</Option>
				</Select>
			</div>
			<div className={s.download}>Download</div>
			<div className={s.delete}>Delete</div>
		</header>
	)
}

export default Header
