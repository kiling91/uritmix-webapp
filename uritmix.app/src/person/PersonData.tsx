import React, { useEffect } from 'react'
import { dto } from 'uritmix.api'
import ShowErrors from '../ui/ShowErrors'
import { RuleCaption } from '../base/ruleCaption'
import { useParams } from 'react-router-dom'
import { observer, useLocalObservable } from 'mobx-react-lite'
import PersonStore from './store/personStore'
import Loading from '../ui/Loading'
import PersonCard from './PersonCard'

const PersonData = observer(() => {
	const { id } = useParams<{ id: string }>()
	const personId = Number(id)
	if (!personId)
		return <ShowErrors errors={[RuleCaption.parameterError('id')]} />

	const store = useLocalObservable(() => new PersonStore())

	useEffect(() => {
		store.get(personId).then()
		return () => store.init()
	}, [])

	const drawStatus = (status: dto.AuthStatusView) => {
		switch (status) {
			case dto.AuthStatusView.NotActivated:
				return (
					<span className='badge rounded-pill text-bg-warning me-1'>
						{'Not activated'}
					</span>
				)
			case dto.AuthStatusView.Activated:
				return (
					<span className='badge rounded-pill text-bg-primary me-1'>
						{'Activated'}
					</span>
				)
			case dto.AuthStatusView.Blocked:
				return (
					<span className='badge rounded-pill text-bg-danger me-1'>
						{'Blocked'}
					</span>
				)
		}

		return <p>{status}</p>
	}

	const drawRole = (role: dto.AuthRoleView) => {
		switch (role) {
			case dto.AuthRoleView.Manager:
				return (
					<span className='badge rounded-pill text-bg-success me-1'>
						{'Manager'}
					</span>
				)
			case dto.AuthRoleView.Admin:
				return (
					<span className='badge rounded-pill text-bg-danger me-1'>
						{'Admin'}
					</span>
				)
		}

		return <p>{role}</p>
	}

	const personData = () => {
		const data = store.value
		return (
			<div>
				<h4>{'Person data'}</h4>
				<table className='table table-bordered table-striped'>
					<colgroup>
						<col className='col-md-4' />
						<col className='col-md-8' />
					</colgroup>
					<tbody>
						<tr>
							<td>
								<b>{'Firstname'}</b>
							</td>
							<td>{data.firstName}</td>
						</tr>
						<tr>
							<td>
								<b>{'Lastname'}</b>
							</td>
							<td>{data.lastName}</td>
						</tr>
						<tr>
							<td>
								<b>{'Description'}</b>
							</td>
							<td>{data.description}</td>
						</tr>
						<tr>
							<td colSpan={2}>
								{data.isTrainer && (
									<span className='badge rounded-pill text-bg-primary me-1'>
										{'Trainer'}
									</span>
								)}
								{/*TODO: Client*/}
								{data.haveAuth && (
									<span className='badge rounded-pill text-bg-warning me-1'>
										{'Account'}
									</span>
								)}
							</td>
						</tr>
						<tr>
							<td colSpan={2}>
								<button type='button' className='btn btn-success btn-sm mx-1'>
									{'Create account'}
								</button>
								<button type='button' className='btn btn-info btn-sm mx-1'>
									{'Make trainer'}
								</button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		)
	}

	const accountData = () => {
		const data = store.value.auth
		return (
			<div>
				<h4>{'Account'}</h4>
				<table className='table table-bordered table-striped'>
					<colgroup>
						<col className='col-md-4' />
						<col className='col-md-8' />
					</colgroup>
					<tbody>
						<tr>
							<td>
								<b>{'Email'}</b>
							</td>
							<td>{data.email}</td>
						</tr>
						<tr>
							<td>
								<b>{'Status'}</b>
							</td>
							<td>{drawStatus(data.status)}</td>
						</tr>
						<tr>
							<td>
								<b>{'Role'}</b>
							</td>
							<td>{drawRole(data.role)}</td>
						</tr>
						<tr>
							<td colSpan={2}>
								<button type='button' className='btn btn-danger btn-sm mx-1'>
									{'Block'}
								</button>
								<button type='button' className='btn btn-warning btn-sm mx-1'>
									{'Reset password'}
								</button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		)
	}

	const data = () => {
		return (
			<div className='container text-center'>
				<div className='row g-2'>
					<div className='col-md-6'>
						<div className='p-3'>{personData()}</div>
					</div>

					{store.value.auth != null && (
						<div className='col-md-6'>
							<div className='p-3'>{accountData()}</div>
						</div>
					)}
				</div>
			</div>
		)
	}

	return (
		<PersonCard
			body={
				<>
					<ShowErrors errors={store.errors} />
					{store.loading || store.value == null ? <Loading /> : data()}
				</>
			}
			toolbar={<></>}
		/>
	)
})

export default PersonData
