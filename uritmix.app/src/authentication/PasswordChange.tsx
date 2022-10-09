import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { observer, useLocalObservable } from 'mobx-react-lite'
import { TextBox, Validator } from 'devextreme-react'
import { RequiredRule, StringLengthRule } from 'devextreme-react/validator'
import { AppUrl } from '../config'
import { RuleCaption } from '../base/ruleCaption'
import { AuthDomain } from '../domainConfig'
import BtnLoading from '../ui/BtnLoading'
import ShowErrors from '../ui/ShowErrors'
import PasswordChangeStore from './store/passwordChangeStore'

const PasswordChange = observer(() => {
	const { token } = useParams<{ token: string }>()
	const [successChangePassword, setSuccessChangePassword] =
		useState<boolean>(false)
	const [password, setPassword] = useState<string>('')
	const [passwordConfirm, setPasswordConfirm] = useState<string>('')

	const store = useLocalObservable(() => new PasswordChangeStore())

	useEffect(() => {
		return () => store.init()
	}, [])

	const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault()
		store.clearErrors()
		if (password && passwordConfirm) {
			if (await store.change(token, password, passwordConfirm)) {
				setSuccessChangePassword(true)
			}
		} else {
			store.addError(RuleCaption.requiredFieldsNotAssigned())
		}
	}

	const formPasswordChange = () => {
		return (
			<form onSubmit={handleSubmit}>
				<fieldset disabled={store.loading}>
					{/*Password*/}
					<div className='my-3 required'>
						<label className='small mb-1' htmlFor='inputPassword'>
							{'Password'}
						</label>
						<TextBox
							mode='password'
							placeholder={'Enter password'}
							value={password}
							onValueChanged={e => setPassword(e.value)}
						>
							<Validator>
								<RequiredRule message={RuleCaption.required('Password')} />
								<StringLengthRule
									trim
									min={AuthDomain.PasswordMinLength}
									max={AuthDomain.PasswordMaxLength}
									message={RuleCaption.length(
										AuthDomain.PasswordMinLength,
										AuthDomain.PasswordMaxLength
									)}
								/>
							</Validator>
						</TextBox>
					</div>
					{/*PasswordConfrim*/}
					<div className='my-3 required'>
						<label className='small mb-1' htmlFor='inputPassword'>
							{'Confirm password'}
						</label>
						<TextBox
							mode='password'
							placeholder={'Enter confirm password'}
							value={passwordConfirm}
							onValueChanged={e => setPasswordConfirm(e.value)}
						>
							<Validator>
								<RequiredRule
									message={RuleCaption.required('Confirm password')}
								/>
								<StringLengthRule
									trim
									min={AuthDomain.PasswordMinLength}
									max={AuthDomain.PasswordMaxLength}
									message={RuleCaption.length(
										AuthDomain.PasswordMinLength,
										AuthDomain.PasswordMaxLength
									)}
								/>
							</Validator>
						</TextBox>
					</div>
				</fieldset>

				{/*Bottom*/}
				<button
					type='submit'
					className='btn btn-primary'
					disabled={store.loading}
				>
					{store.loading ? <BtnLoading /> : 'Change password'}
				</button>
			</form>
		)
	}

	const formSuccess = () => {
		return (
			<div className='text-center mt-4'>
				<p className='lead'>{`Your password has been successfully changed`}</p>
				<Link to={AppUrl.Login}>{'Return to login page'}</Link>
			</div>
		)
	}

	return (
		<div className='card w-25 mx-auto mt-5' style={{ minWidth: '320px' }}>
			<div className='card-header'>
				{'Change password'}
				{store.loading && ''}
			</div>
			<div className='card-body'>
				<ShowErrors errors={store.errors} />
				{!successChangePassword ? formPasswordChange() : formSuccess()}
			</div>
		</div>
	)
})

export default PasswordChange
