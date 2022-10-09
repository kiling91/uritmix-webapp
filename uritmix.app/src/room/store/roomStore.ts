import { Api, dto } from 'uritmix.api'
import BaseStore from '../../base/baseStore'

class RoomStore extends BaseStore<dto.Room> {
	public async create(create: dto.Room) {
		return await this.makeRequest(async () => {
			const res = await Api.roomApi.apiV1RoomPost(create)
			this.checkErrors(res)
			this.setValue(res.data.result)
			return res.data.ok || false
		})
	}

	public async edit(roomId: number, edit: dto.EditRoom) {
		return await this.makeRequest(async () => {
			const res = await Api.roomApi.apiV1RoomRoomIdPut(roomId, edit)
			this.checkErrors(res)
			this.setValue(res.data.result)
			return res.data.ok || false
		})
	}
}

export default RoomStore
