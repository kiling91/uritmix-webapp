import CustomStore from 'devextreme/data/custom_store'
import { catchHttp, checkErrors } from '../../base/catchError'
import { Api, dto } from 'uritmix.api'
import { Paginator } from '../../base/paginator'

export const createLessonsLookupStore = () => {
	let lessons: dto.Lesson[] = []
	return {
		store: new CustomStore({
			key: 'id',
			load: async options => {
				if (options.searchOperation === 'contains') {
					try {
						const skip = options.skip ?? 0
						const take = options.take ?? 10

						const response = await Api.lessonApi.apiV1LessonGet(
							Paginator.paginatorPageSize(skip, take),
							Paginator.paginatorPageNumber(skip, take)
						)

						checkErrors(response)
						lessons = response.data.result?.results!
						return lessons
					} catch (error) {
						catchHttp(error, (errorMessage: string) => {
							throw errorMessage
						})
					}
				}

				return []
			},
			byKey: async (key: number) => {
				const find = lessons.find(m => m.id == key)
				if (find) return find

				try {
					const response = await Api.lessonApi.apiV1LessonLessonIdGet(key)
					checkErrors(response)
					lessons.push(response.data.result)
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
