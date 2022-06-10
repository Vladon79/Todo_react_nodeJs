import { Button, message } from "antd"
import React from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useInput } from "../../../hooks/useInput"
import { registration } from "../auth-reducer"
import RegistrInputSecton from "../common/RegistrInputSecton"
import RegistrPasswordInputSecton from "../common/RegistrPasswordInputSecton"
import s from "./RegistrPage.module.css"

const RegistrPage = () => {
	const emailInput = useInput("", ["isEmail", "isEmpty"])
	const passwordInput = useInput("", ["minLength", "maxLength", "isEmpty"])
	const confirmPasswordlInput = useInput("", ["minLength", "maxLength", "isEmpty"])
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const loginPageOnClick = () => {
		navigate("/login")
	}

	const registrationClickHandler = () => {
		if (passwordInput.value === confirmPasswordlInput.value) {
			dispatch(registration(emailInput.value, passwordInput.value, navigate))
		} else {
			message.error("Passwords are not exactly same")
		}
	}
	const formIsValid = !(emailInput.value && !emailInput.error && !passwordInput.error && passwordInput.value && confirmPasswordlInput.value && !confirmPasswordlInput.error)

	return (
		<div className={s.loginPageContainer}>
			<h2>Registration</h2>
			<section className={s.emailPasswordContainer}>
				<section className={s.stringContainer}>
					<p className={s.p}>Email:</p>
					<p className={s.p}>Password:</p>
					<p className={s.p}>Confirm password:</p>
				</section>
				<section className={s.inputContainer}>
					<RegistrInputSecton placeholder={"Email"} nameInput={emailInput} />
					<RegistrPasswordInputSecton placeholder={"Password"} nameInput={passwordInput} />
					<RegistrPasswordInputSecton placeholder={"Confirm password"} nameInput={confirmPasswordlInput} />
				</section>
			</section>
			<section className={s.buttonContainer}>
				<Button type="link" size="large" onClick={loginPageOnClick}>
					Login
				</Button>
				<Button disabled={formIsValid} type="primary" style={{ marginTop: 50 }} size="large" block onClick={registrationClickHandler}>
					Registration
				</Button>
			</section>
		</div>
	)
}

export default RegistrPage
