import apiConfig from '../../../../../config/api'
import { apiRequestorHelper } from '../../../../../helpers'

export default {
	deleteLogo: (id) => {
		return apiRequestorHelper({
			url: apiConfig.url + '/deleteLogo/' + id,
			method: 'post'
		})
	}
}
