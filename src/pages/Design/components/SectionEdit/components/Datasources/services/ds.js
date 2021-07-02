import apiConfig from '../../../../../../../config/api'
import { apiRequestorHelper } from '../../../../../../../helpers'

export default {
	save: (formId, origin, datasource) => {
		return apiRequestorHelper({
			url: apiConfig.url + '/saveDatasource/'+origin+'/'+(formId ? formId : '-1'),
			method: 'post',
			body: datasource
		})
	}
}
