import apiConfig from '../../../../../config/api'
import { apiRequestorHelper } from '../../../../../helpers'

export default {
	getFormById: (id) => {
		return apiRequestorHelper({
			url: apiConfig.url + '/getFormById/' + id,
			method: 'post'
		})
	}
}
