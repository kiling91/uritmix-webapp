import CustomStore from 'devextreme/data/custom_store'
import { catchHttp, checkErrors } from '../../base/catchError'
import { Api, dto } from 'uritmix.api'
import { Paginator } from '../../base/paginator'

export class AbonnementsLookupStore {
	private abonnements: dto.Abonnement[] = []
	private store: any | null = null
	private createStore() {
		return {
			store: new CustomStore({
				key: 'id',
				load: async options => {
					if (options.searchOperation === 'contains') {
						try {
							const skip = options.skip ?? 0
							const take = options.take ?? 10

							const response = await Api.abonnementApi.apiV1AbonnementGet(
								Paginator.paginatorPageSize(skip, take),
								Paginator.paginatorPageNumber(skip, take)
							)

							checkErrors(response)
							this.abonnements = response.data.result?.results!
							return this.abonnements
						} catch (error) {
							catchHttp(error, (errorMessage: string) => {
								throw errorMessage
							})
						}
					}

					return []
				},
				byKey: (key: number) => {
					return this.byKey(key)
				}
			}),
			sort: 'name',
			paginate: true,
			pageSize: 10
		}
	}

	public async byKey(key: number): Promise<dto.Abonnement> {
		const find = this.abonnements.find(m => m.id == key)
		if (find) return find

		try {
			const response = await Api.abonnementApi.apiV1AbonnementAbonnementIdGet(
				key
			)
			checkErrors(response)
			this.abonnements.push(response.data.result)
			return response.data.result
		} catch (error) {
			catchHttp(error, (errorMessage: string) => {
				throw errorMessage
			})
		}
		return null
	}

	public getStore() {
		if (this.store == null) {
			this.store = this.createStore()
		}
		return this.store
	}
}
