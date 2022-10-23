import CustomStore from 'devextreme/data/custom_store'
import { catchHttp, checkErrors } from '../base/catchError'
import { Api, dto } from 'uritmix.api'
import { Paginator } from '../base/paginator'

export const createRoomLookupStore = () => {
	let rooms: dto.Room[] = []
	return {
		store: new CustomStore({
			key: 'id',
			load: async options => {
				if (options.searchOperation === 'contains') {
					try {
						const skip = options.skip ?? 0
						const take = options.take ?? 10

						const response = await Api.roomApi.apiV1RoomGet(
							Paginator.paginatorPageSize(skip, take),
							Paginator.paginatorPageNumber(skip, take)
						)

						checkErrors(response)
						rooms = response.data.result?.results!
						return rooms
					} catch (error) {
						catchHttp(error, (errorMessage: string) => {
							throw errorMessage
						})
					}
				}

				return []
			},
			byKey: async (key: number) => {
				const find = rooms.find(m => m.id == key)
				if (find) return find

				try {
					const response = await Api.roomApi.apiV1RoomRoomIdGet(key)
					checkErrors(response)
					rooms.push(response.data.result)
					return response.data.result
				} catch (error) {
					catchHttp(error, (errorMessage: string) => {
						throw errorMessage
					})
				}
				return null
			}
		}),
		sort: 'name',
		paginate: true,
		pageSize: 10
	}
}
