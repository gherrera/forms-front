import apiConfig from '../../../../../config/api'
import { apiRequestorHelper } from '../../../../../helpers'

export default {
	getFormById: (id) => {
		return apiRequestorHelper({
			url: apiConfig.url + '/getFormById/' + id,
			method: 'post'
		})
	},
	saveForm: (form) => {
		return apiRequestorHelper({
			url: apiConfig.url + '/saveForm',
			method: 'post',
			body: form
		})
	}
}
