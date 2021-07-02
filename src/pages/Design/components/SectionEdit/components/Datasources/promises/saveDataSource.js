import { dsService } from '../services'

export default (formId, origin, datasource) => {
 	return new Promise(resolve => {
		dsService.save(formId, origin, datasource)
 			.then(response => resolve(response.data))
 	})
}
