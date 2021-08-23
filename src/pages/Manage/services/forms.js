import apiConfig from '../../../config/api'
import { apiRequestorHelper } from '../../../helpers'

export default {
	getFormByClienteId: () => {
		return apiRequestorHelper({
			url: apiConfig.url + '/getFormReceivedByClienteId',
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
	},
	getB64Form: (id) => {
		return apiRequestorHelper({
			url: apiConfig.url + '/b64Form/' + id,
			method: 'post'
		})
	}
}