import React from 'react'
import { Link } from 'react-router-dom'
import img404A from '../public/assets/img/illustrations/404-error-with-a-cute-animal.svg'
import img404B from '../public/assets/img/illustrations/404-error.svg'
import img401 from '../public/assets/img/illustrations/401-error-unauthorized.svg'

export enum ErrorPageType {
	Error404,
	Error401
}

const GenericErrorPage = ({ type }: { type: ErrorPageType }) => {
	const errorType = () => {
		switch (type) {
			case ErrorPageType.Error404:
				return error404()
			case ErrorPageType.Error401:
				return error401()
		}
	}

	const returnPath = () => {
		switch (type) {
			case ErrorPageType.Error404:
				return '/'
			case ErrorPageType.Error401:
				return '/login'
		}
	}

	const returnCaption = () => {
		switch (type) {
			case ErrorPageType.Error404:
				return 'На главную страницу'
			case ErrorPageType.Error401:
				return 'На станицу авторизации'
		}
	}

	const error401 = () => {
		return (
			<div>
				<img className='img-fluid p-4' src={img401} alt='' />
				<p className='lead'>
					{'Для просмотра этой страницы вам необходимо авторизоваться'}
				</p>
			</div>
		)
	}

	const error404 = () => {
		let rand = Math.floor(Math.random() * 2)
		let image404 = rand == 0 ? img404A : img404B
		return (
			<div>
				<img className='img-fluid p-4' src={image404} alt='' />
				<p className='lead'>{'Запрошенный URL-адрес не был найден'}</p>
			</div>
		)
	}

	return (
		<div className='bg-light'>
			<div id='layoutAuthentication'>
				<div className='container-xl px-4'>
					<div className='row justify-content-center'>
						<div className='col-lg-6'>
							<div className='text-center mt-4'>
								{errorType()}
								<Link to={returnPath()} className='text-arrow-icon'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										width='24'
										height='24'
										viewBox='0 0 24 24'
										fill='none'
										stroke='currentColor'
										strokeWidth='2'
										strokeLinecap='round'
										strokeLinejoin='round'
										className='feather feather-arrow-left ms-0 me-1'
									>
										<line x1='19' y1='12' x2='5' y2='12'></line>
										<polyline points='12 19 5 12 12 5'></polyline>
									</svg>
									{returnCaption()}
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default GenericErrorPage
