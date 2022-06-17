import { Button } from "antd"
import React from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useInput } from "../../../hooks/useInput"
import RegistrInputSecton from "../common/RegistrInputSecton"
import { login } from "../auth-reducer"
import s from "./LoginPage.module.css"
import RegistrPasswordInputSecton from "../common/RegistrPasswordInputSecton"

const LoginPage = () => {
	const emailInput = useInput("", ["isEmail", "isEmpty"])
	const passwordInput = useInput("", ["minLength", "maxLength", "isEmpty"])
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const registrPageOnClick = () => {
		navigate("/registration")
	}
	const loginClickHandler = () => {
		dispatch(login(emailInput.value, passwordInput.value))
	}
	const formIsValid = !(emailInput.value && !emailInput.error && passwordInput.value &&!passwordInput.error)
	return (
		<div className={s.loginPageContainer}>
			<h2>Login</h2>
			<section className={s.emailPasswordContainer}>
				<section className={s.stringContainer}>
					<p className={s.p}>Email:</p>
					<p className={s.p}>Password:</p>
				</section>
				<section className={s.inputContainer}>
					<RegistrInputSecton placeholder={"Email"} nameInput={emailInput} />
					<RegistrPasswordInputSecton placeholder={"Password"} nameInput={passwordInput} />
				</section>
			</section>
			<section className={s.buttonContainer}>
				<Button type="link" size="large" onClick={registrPageOnClick}>
					Registration
				</Button>
				<Button disabled={formIsValid} onClick={loginClickHandler} type="primary" style={{ marginTop: 50 }} size="large" block>
					Login
				</Button>
			</section>
		</div>
	)
}

export default LoginPage
