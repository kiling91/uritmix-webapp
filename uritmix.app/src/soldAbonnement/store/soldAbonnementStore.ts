import { Api, dto } from 'uritmix.api'
import BaseStore from '../../base/baseStore'

class SoldAbonnementStore extends BaseStore<dto.SoldAbonnement> {
	public async sale(sale: dto.SaleAbonnement) {
		return await this.makeRequest(async () => {
			const res = await Api.abonnementApi.apiV1AbonnementSoldPost(sale)
			this.checkErrors(res)
			this.setValue(res.data.result)
			return res.data.ok || false
		})
	}
}

export default SoldAbonnementStore
