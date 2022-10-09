import { Api, dto } from 'uritmix.api'
import BaseStore from '../../base/baseStore'

class LessonStore extends BaseStore<dto.Lesson> {
	public async create(create: dto.CreateLesson) {
		return await this.makeRequest(async () => {
			const res = await Api.lessonApi.apiV1LessonPost(create)
			this.checkErrors(res)
			this.setValue(res.data.result)
			return res.data.ok || false
		})
	}

	public async edit(lessonId: number, edit: dto.EditLesson) {
		return await this.makeRequest(async () => {
			const res = await Api.lessonApi.apiV1LessonLessonIdPut(lessonId, edit)
			this.checkErrors(res)
			this.setValue(res.data.result)
			return res.data.ok || false
		})
	}
}

export default LessonStore
