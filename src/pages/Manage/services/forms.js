import apiConfig from '../../../config/api'
import { apiRequestorHelper } from '../../../helpers'

export default {
	getFormByClienteId: (from, size) => {
		return apiRequestorHelper({
			url: apiConfig.url + '/getFormReceivedByClienteId',
			method: 'post',
			body: {
				from,
				size
			}
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
	},
	addComment: (id, comments) => {
		return apiRequestorHelper({
			url: apiConfig.url + '/addComment',
			method: 'post',
			body: {
				id,
				comments
			}
		})
	}
}
