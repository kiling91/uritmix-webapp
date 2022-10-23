import { Api, dto } from 'uritmix.api'
import BaseStore from '../../base/baseStore'

class EventStore extends BaseStore<dto.Event> {
	public async create(create: dto.CreateEvent) {
		return await this.makeRequest(async () => {
			const res = await Api.eventApi.apiV1EventPost(create)
			this.checkErrors(res)
			this.setValue(res.data.result)
			return res.data.ok || false
		})
	}

	public async edit(eventId: number, edit: dto.EditEvent) {
		return await this.makeRequest(async () => {
			const res = await Api.eventApi.apiV1EventEventIdPut(eventId, edit)
			this.checkErrors(res)
			this.setValue(res.data.result)
			return res.data.ok || false
		})
	}
}

export default EventStore
