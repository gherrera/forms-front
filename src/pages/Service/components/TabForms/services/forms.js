import apiConfig from '../../../../../config/api'
import { apiRequestorHelper } from '../../../../../helpers'

export default {
	getFormByClienteId: () => {
		return apiRequestorHelper({
			url: apiConfig.url + '/getFormByClienteId',
			method: 'post'
		})
	}
}
