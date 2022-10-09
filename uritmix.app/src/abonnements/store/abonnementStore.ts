import { Api, dto } from 'uritmix.api'
import BaseStore from '../../base/baseStore'

class AbonnementStore extends BaseStore<dto.AbonnementView> {
	public async create(create: dto.CreateAbonnement) {
		return await this.makeRequest(async () => {
			const res = await Api.abonnementApi.apiV1AbonnementPost(create)
			this.checkErrors(res)
			this.setValue(res.data.result)
			return res.data.ok || false
		})
	}
}

export default AbonnementStore
