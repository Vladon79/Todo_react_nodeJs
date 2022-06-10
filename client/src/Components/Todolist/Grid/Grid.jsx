import React from "react"
import Header from "./Table/Header"
import Table from "./Table/Table"
import s from "./Grid.module.css"
import { useDispatch, useSelector } from "react-redux"
import { Pagination } from "antd"
import { setGridOptionsAC } from "./grid-reducer"

const Grid = ({ todolist }) => {
	let tasksCount = useSelector((state) => state.grid.tasksCount)
	let page = useSelector((state) => state.grid.page)
	const pageCount = useSelector((state) => state.grid.pageCount)
	const dispatch = useDispatch()

	const onChangeCurrentPage = (page, pageCount1) => {
		dispatch(setGridOptionsAC(pageCount1, page))
	}
	return (
		<div className={s.grid}>
			<Header />
			{todolist.map((t) => (
				<Table key={t._id} type={t.type} data={t.data} created={t.created} _id={t._id} name={t.name} isChecked={t.isChecked} />
			))}
			<section className={s.paginationContainer}>
				<Pagination className={s.pagination}  showSizeChanger={true} hideOnSinglePage={false} current={page} onChange={onChangeCurrentPage} total={tasksCount} pageSize={pageCount} pageSizeOptions={[5, 10, 20, 50]} />
			</section>
		</div>
	)
}

export default Grid
