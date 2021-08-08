import apiConfig from '../config/api'
import { apiRequestorHelper } from '../helpers'

export default {
	getFormHash: (hash) => {
		return apiRequestorHelper({
			url: apiConfig.url + '/getFormIdHash/' + hash,
			method: 'post'
		})
	}
}
