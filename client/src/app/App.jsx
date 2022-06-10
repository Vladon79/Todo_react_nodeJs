import React, { useEffect } from "react"
import s from "./App.module.css"
import { Button, PageHeader } from "antd"
import { Navigate, Route, Routes } from "react-router-dom"
import Todolist from "../Components/Todolist/Todolist"
import RegistrPage from "../Components/Login/RegistrPage/RegistrPage"
import LoginPage from "../Components/Login/LoginPage/LoginPage"
import { useDispatch, useSelector } from "react-redux"
import { auth, logOut } from "../Components/Login/auth-reducer"
import "antd/dist/antd.dark.less"
import 'antd/dist/antd.css'

const App = () => {
	const isAuth = useSelector((state) => state.auth.isAuth)
	const dispatch = useDispatch()

	const logOutHendler = () => {
		dispatch(logOut())
	}

	useEffect(() => {
		dispatch(auth())
	}, [])
	return (
		<div className={s.App}>
			<PageHeader
				className={s.pageHeader}
				style={{ color: "#fff", backgroundColor: "#000" }}
				ghost={false}
				title="Senama_Soft Todolist"
				extra={[
					isAuth && (
						<Button type="primary" danger style={{ color: "#f9f9f9" }} onClick={logOutHendler}>
							logOut
						</Button>
					)
				]}
			/>

			{!isAuth && (
				<Routes>
					<Route path="*" element={<Navigate to="/login" />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/registration" element={<RegistrPage />} />
				</Routes>
			)}
			{isAuth && (
				<Routes>
					<Route path="*" element={<Navigate to="/todolist" />} />
					<Route path="/todolist" element={<Todolist />} />
				</Routes>
			)}
		</div>
	)
}

export default App
