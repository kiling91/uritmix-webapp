import { Api, dto } from 'uritmix.api'
import CustomStore from 'devextreme/data/custom_store'
import { Paginator } from '../../base/paginator'
import { checkErrors, catchHttp } from '../../base/catchError'

export interface room {
	id: number
	color: string
}

const colors: string[] = [
	'#cb6bb2',
	'#56ca85',
	'#1e90ff',
	'#ff9747',
	'#f05797',
	'#2a9010'
]

class EventsStore {
	private _events: dto.Event[] = []
	private _rooms: room[] = []
	private store: any | null = null

	private createStore() {
		return new CustomStore({
			key: 'id',
			load: async options => {
				if (options.searchOperation != 'contains') return []

				try {
					const [start, end] = Paginator.dateRange(options.filter)
					const response = await Api.eventApi.apiV1EventGet(start, end)
					checkErrors(response)
					this._events = response.data.result

					await this.loadRooms()

					return this._events
				} catch (error) {
					catchHttp(error, (errorMessage: string) => {
						throw errorMessage
					})
				}
				return []
			}
		})
	}

	private async loadRooms() {
		if (this._rooms.length > 0) {
			return
		}
		const response = await Api.roomApi.apiV1RoomGet(20, 1)
		checkErrors(response)

		var index = 0
		for (const room of response.data.result.results) {
			this._rooms.push({ id: room.id, color: colors[index] })
			index++
			if (index > colors.length - 1) {
				index = 0
			}
		}
	}

	public getStore() {
		if (this.store == null) {
			this.store = this.createStore()
		}
		return this.store
	}

	public getRooms() {
		return this._rooms
	}
}

export default EventsStore
