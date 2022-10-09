import React from 'react'
import * as Icon from 'react-feather'
import { AppUrl, PROJECT_NAME } from '../config'
import { IAccount } from '../base/account'
import profile1 from '../public/assets/img/illustrations/profiles/profile-1.png'
import { NavLink, useNavigate } from 'react-router-dom'

const TopNavbar = () => {
	const navigate = useNavigate()
	const account = IAccount.load()

	const logout = () => {
		IAccount.logout()
		navigate(AppUrl.Login)
	}

	return (
		<div className='container'>
			<header className='d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom'>
				<a
					href={AppUrl.Home}
					className='d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none'
				>
					<Icon.Activity className='me-2' />
					<span className='fs-4'>{PROJECT_NAME}</span>
				</a>

				<ul className='nav nav-pills col-md-auto mb-2 justify-content-center mb-md-0'>
					<li className='nav-item'>
						<NavLink to={AppUrl.Home} className='nav-link ' aria-current='page'>
							{'Home'}
						</NavLink>
					</li>
					<li className='nav-item'>
						<NavLink
							to={AppUrl.Persons}
							className='nav-link'
							aria-current='page'
						>
							{'Persons'}
						</NavLink>
					</li>
					<li className='nav-item'>
						<NavLink to={AppUrl.Abonnements} className='nav-link'>
							{'Abonnements'}
						</NavLink>
					</li>
					<li className='nav-item'>
						<NavLink to={AppUrl.Rooms} className='nav-link'>
							{'Rooms'}
						</NavLink>
					</li>
				</ul>

				<div className='col-md-3'>
					<div className='dropend text-end'>
						<a
							href='#'
							className='d-block link-dark text-decoration-none dropdown-toggle'
							data-bs-toggle='dropdown'
							aria-expanded='false'
						>
							<img
								src={profile1}
								alt='mdo'
								width='40'
								height='40'
								className='rounded-circle'
							/>
						</a>
						<ul className='dropdown-menu'>
							<li>
								<h4 className='dropdown-header d-flex align-items-center'>
									<Icon.Activity className='me-2' />
									<div>
										<div>{`${account?.firstName} ${account?.lastName}`}</div>
										<div>{account?.email}</div>
									</div>
								</h4>
							</li>

							{/*
              <li><hr className="dropdown-divider" /></li>
              <li><a className="dropdown-item" href="#">Settings</a></li>
              <li><a className="dropdown-item" href="#">Profile</a></li>
              */}

							<li>
								<hr className='dropdown-divider' />
							</li>
							<li>
								<a className='dropdown-item' onClick={logout}>
									{'Sign out'}
								</a>
							</li>
						</ul>
					</div>
				</div>
			</header>
		</div>
	)
}

export default TopNavbar
