import CustomStore from 'devextreme/data/custom_store'
import { catchHttp, checkErrors } from '../../base/catchError'
import { Api, dto } from 'uritmix.api'
import { Paginator } from '../../base/paginator'

export const createPersonsLookupStore = () => {
	let persons: dto.Person[] = []
	return {
		store: new CustomStore({
			key: 'id',
			load: async options => {
				if (options.searchOperation === 'contains') {
					try {
						const skip = options.skip ?? 0
						const take = options.take ?? 10
						/*let filter = ''
						if (options.searchExpr && options.searchValue)
							filter = Store.filterParams([
								options.searchExpr,
								'contains',
								options.searchValue
							])*/

						const response = await Api.personApi.apiV1PersonGet(
							Paginator.paginatorPageSize(skip, take),
							Paginator.paginatorPageNumber(skip, take),
							dto.PersonTypeView.Trainer
							/*-1,
							Paginator.showArchived(false),
							'Article',
							Paginator.orderByAsc(),
							filter*/
						)

						checkErrors(response)
						persons = response.data.result?.results!
						return persons
					} catch (error) {
						catchHttp(error, (errorMessage: string) => {
							throw errorMessage
						})
					}
				}

				return []
			},
			byKey: async (key: number) => {
				const find = persons.find(m => m.id == key)
				if (find) return find
				try {
					const response = await Api.personApi.apiV1PersonPersonIdGet(key)
					checkErrors(response)
					return response.data.result
				} catch (error) {
					catchHttp(error, (errorMessage: string) => {
						throw errorMessage
					})
				}
				return null
			}
		}),
		sort: 'lastname',
		paginate: true,
		pageSize: 10
	}
}
