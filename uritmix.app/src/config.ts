import { PositionConfig } from 'devextreme/animation/position'

export const PROJECT_NAME = process.env.PROJECT_NAME || 'ProjectName'

export enum AppUrl {
	Home = '/',
	Login = '/login',
	PasswordReset = '/password-reset',
	PasswordChange = '/password-change/:token',
	Events = '/events',
	Abonnements = '/abonnements',
	Rooms = '/rooms',
	Lessons = '/lessons',
	Persons = '/persons',
	Person = '/persons/:id',
	Error404 = '/404',
	Error401 = '/401'
}

export const POPUP_FORM_WIDTH = 600
export const POPUP_DIALOG_WIDTH = 480
export const POPUP_POSITION: PositionConfig = {
	at: 'top',
	my: 'top',
	of: '#root',
	offset: {
		y: 80
	}
}
