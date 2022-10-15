import React, { useEffect } from 'react'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import Login from '../authentication/Login'
import GenericErrorPage, { ErrorPageType } from './GenericErrorPage'
import { AppUrl, PROJECT_NAME } from '../config'
import PasswordReset from '../authentication/PasswordReset'
import PasswordChange from '../authentication/PasswordChange'
import Persons from '../person/Persons'
import PersonData from '../person/PersonData'
import { IAccount } from '../base/account'
import TopNavbar from './TopNavbar'
import SoldAbonnements from '../soldAbonnement/SoldAbonnements'
import Abonnements from '../abonnement/Abonnements'
import Rooms from '../room/Rooms'
import Lessons from '../lesson/Lessons'

const AppWrapper = () => {
	const account = IAccount.load()
	if (account) {
		return (
			<>
				<TopNavbar />
				<main className='container'>
					<Outlet />
				</main>
			</>
		)
	} else {
		return <Navigate to={AppUrl.Login} />
	}
}

const App = () => {
	useEffect(() => {
		document.title = PROJECT_NAME
	})

	return (
		<Routes>
			<Route path={'/'} element={<AppWrapper />}>
				<Route index element={<h1>Home</h1>} />
				<Route path={AppUrl.Abonnements} element={<Abonnements />} />
				<Route path={AppUrl.Rooms} element={<Rooms />} />
				<Route path={AppUrl.Lessons} element={<Lessons />} />
				<Route path={AppUrl.Persons} element={<Persons />} />
				<Route path={AppUrl.Person}>
					<Route index element={<PersonData />} />
					<Route path={'abonnements'} element={<SoldAbonnements />} />
				</Route>
				<Route path={'about'} element={<h1>About</h1>} />
			</Route>
			<Route path={AppUrl.Login} element={<Login />} />
			<Route path={AppUrl.PasswordReset} element={<PasswordReset />} />
			<Route path={AppUrl.PasswordChange} element={<PasswordChange />} />
			{/*Errors*/}
			<Route
				path={AppUrl.Error404}
				element={<GenericErrorPage type={ErrorPageType.Error404} />}
			/>
			<Route
				path={AppUrl.Error401}
				element={<GenericErrorPage type={ErrorPageType.Error401} />}
			/>
			<Route
				path='*'
				element={<GenericErrorPage type={ErrorPageType.Error404} />}
			/>
		</Routes>
	)
}

export default App
