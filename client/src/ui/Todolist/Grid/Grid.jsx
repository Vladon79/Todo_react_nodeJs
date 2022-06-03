import React from "react"
import Header from "./Table/Header"
import Table from "./Table/Table"
import s from "./Grid.module.css"
import { useDispatch, useSelector } from "react-redux"
import { Pagination } from "antd"
import "antd/dist/antd.css"
import { setGridOptionsAC } from "../../../bll/grid-reducer"

const Grid = ({ tasks }) => {
	let tasksCount = useSelector((state) => state.grid.tasksCount)
	let page = useSelector((state) => state.grid.page)
	const pageCount = useSelector((state) => state.grid.pageCount)
	const dispatch = useDispatch()

	const onChangeCurrentPage = (page, pageCount) => {
		dispatch(setGridOptionsAC(pageCount, page))
	}
	return (
		<div className={s.grid}>
			<Header />
			{tasks.map((t) => (
				<Table key={t._id} type={t.type} data={t.data} created={t.created} _id={t._id} name={t.name} isChecked={t.isChecked} />
			))}
			<section className={s.paginationContainer}>
				<Pagination showSizeChanger={true} hideOnSinglePage={false} current={page} onChange={onChangeCurrentPage} total={tasksCount} pageSize={pageCount} pageSizeOptions={[5, 10, 20, 50]} />
			</section>
		</div>
	)
}

export default Grid
