import apiConfig from '../../../../../config/api'
import { apiRequestorHelper } from '../../../../../helpers'

export default {
	getFormByClienteId: () => {
		return apiRequestorHelper({
			url: apiConfig.url + '/getFormByClienteId',
			method: 'post'
		})
	},
	getFormById: (id) => {
		return apiRequestorHelper({
			url: apiConfig.url + '/getFormById/' + id,
			method: 'post'
		})
	},
	updateForm: (form) => {
		return apiRequestorHelper({
			url: apiConfig.url + '/updateForm',
			method: 'post',
			body: form
		})
	}
}
